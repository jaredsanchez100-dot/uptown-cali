/* ============================================================
   script.js — the engine. Reads data.js and builds the store.
   You normally don't need to edit this file; edit data.js.
   ============================================================ */
(function () {
  "use strict";

  var $ = function (sel) { return document.querySelector(sel); };
  var money = function (n) { return CHECKOUT.currency + n.toFixed(2).replace(/\.00$/, ""); };
  /* Sets and swim capsules price as "From $X" — the number is the entry
     price, not the only price. Display-only; the cart still uses p.price. */
  var priceLabel = function (p) { return (p.priceFrom ? "From " : "") + money(p.price); };

  /* Data from data.js is author-controlled, but escaping keeps a stray
     apostrophe or "&" in a product name from breaking the markup. */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* A product tile shows a real photo when there is one, and a styled
     placeholder when there isn't — so the site never looks half-built
     while you're still waiting on the photoshoot. */
  function media(item, alt) {
    // A product can carry its own descriptive alt text; the caller's value
    // (usually the product name) is the fallback.
    if (item && item.alt) alt = item.alt;
    if (item && item.image) {
      // fit:"contain" shows the whole image on a dark ground instead of
      // cropping — used for the NorCal Lights concept boards, whose edge
      // labels and flat views would otherwise be cut off.
      var cls = item.fit === "contain" ? ' class="img--contain"' : "";
      return '<img' + cls + ' src="' + esc(item.image) + '" alt="' + esc(alt || "") + '" loading="lazy">';
    }
    var ph = (item && item.placeholder) || {};
    var tint = ph.tint || item && item.tint || "linear-gradient(135deg,var(--accent),var(--bg-alt))";
    return '<div class="ph" style="background:' + esc(tint) + '" role="img" aria-label="' +
      esc(alt || "Product image coming soon") + '">' + esc(ph.emoji || "") + "</div>";
  }

  function byId(id) {
    for (var i = 0; i < PRODUCTS.length; i++) if (PRODUCTS[i].id === id) return PRODUCTS[i];
    return null;
  }

  /* ---------- Toast ---------- */
  var toastTimer;
  function toast(msg) {
    var el = $("#toast");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove("show"); }, 2200);
  }

  /* ============================================================
     CART — persisted so a refresh (or coming back tomorrow)
     doesn't wipe what someone picked out.
     ============================================================ */
  var STORE_KEY = "cart:" + (BRAND.name || "store").toLowerCase().replace(/\s+/g, "-");
  var cart = [];

  function loadCart() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      cart = raw ? JSON.parse(raw) : [];
      // Drop lines whose product no longer exists in data.js — and any
      // concept piece that isn't purchasable, however it got in here.
      cart = cart.filter(function (l) {
        var p = byId(l.id);
        return p && !p.comingSoon;
      });
    } catch (e) { cart = []; }
  }
  function saveCart() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(cart)); } catch (e) {}
  }

  function lineKey(id, size, color) { return id + "|" + (size || "") + "|" + (color || ""); }

  /* A Stripe Payment Link doesn't know which size the shopper picked on the
     site, which is how you end up shipping the wrong thing. Stripe accepts a
     `client_reference_id` on the URL and shows it on the payment, so the
     variant travels with the order. Stripe restricts that value to letters,
     numbers, dashes and underscores, hence the scrub. */
  function stripeUrl(product, line) {
    if (!product || !product.buyUrl) return "";
    var ref = [product.id, line && line.size, line && line.color]
      .filter(Boolean).join("-").replace(/[^A-Za-z0-9_-]+/g, "-").slice(0, 190);
    return product.buyUrl + (product.buyUrl.indexOf("?") === -1 ? "?" : "&") +
      "client_reference_id=" + encodeURIComponent(ref);
  }

  function addToCart(id, size, color) {
    // Concept pieces can't be bought. The button is disabled too — this is
    // the backstop in case any path reaches here anyway.
    var product = byId(id);
    if (product && product.comingSoon) {
      toast("This piece is a concept — coming soon.");
      return;
    }
    var key = lineKey(id, size, color);
    var found = null;
    for (var i = 0; i < cart.length; i++) if (cart[i].key === key) found = cart[i];
    if (found) found.qty += 1;
    else cart.push({ key: key, id: id, size: size, color: color, qty: 1 });
    saveCart();
    renderCart();
  }

  function setQty(key, delta) {
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].key === key) {
        cart[i].qty += delta;
        if (cart[i].qty < 1) cart.splice(i, 1);
        break;
      }
    }
    saveCart();
    renderCart();
  }

  function removeLine(key) {
    cart = cart.filter(function (l) { return l.key !== key; });
    saveCart();
    renderCart();
  }

  function cartTotal() {
    return cart.reduce(function (sum, l) {
      var p = byId(l.id);
      return sum + (p ? p.price * l.qty : 0);
    }, 0);
  }

  function variantLabel(line) {
    return [line.size, line.color].filter(function (v) { return v && v !== "One Size"; }).join(" / ");
  }

  function renderCart() {
    var count = cart.reduce(function (n, l) { return n + l.qty; }, 0);
    $("#cartCount").textContent = count;
    $("#cartTotal").textContent = money(cartTotal());

    var body = $("#cartItems");
    if (!cart.length) {
      body.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
    } else {
      body.innerHTML = cart.map(function (l) {
        var p = byId(l.id);
        var variant = variantLabel(l);
        // In Stripe mode each line pays through its own Payment Link,
        // so the line carries its own pay button.
        var pay = CHECKOUT.mode === "stripe" && p.buyUrl
          ? '<a class="line__pay btn--ghost btn" href="' + esc(stripeUrl(p, l)) + '" target="_blank" rel="noopener" style="padding:5px 12px;font-size:12px">Pay</a>'
          : "";
        return '' +
          '<div class="line">' +
            '<div class="line__media">' + media(p, p.name) + "</div>" +
            '<div class="line__info">' +
              '<div class="line__name">' + esc(p.name) + "</div>" +
              (variant ? '<div class="line__variant">' + esc(variant) + "</div>" : "") +
              '<div class="line__ctl">' +
                '<span class="qty">' +
                  '<button data-dec="' + esc(l.key) + '" aria-label="Decrease quantity">&minus;</button>' +
                  "<span>" + l.qty + "</span>" +
                  '<button data-inc="' + esc(l.key) + '" aria-label="Increase quantity">+</button>' +
                "</span>" +
                '<button class="line__rm" data-rm="' + esc(l.key) + '">Remove</button>' +
                pay +
              "</div>" +
            "</div>" +
            '<div class="line__price">' + money(p.price * l.qty) + "</div>" +
          "</div>";
      }).join("");
    }

    var note = $("#cartNote");
    var btn = $("#checkoutBtn");
    btn.disabled = !cart.length;
    if (CHECKOUT.mode === "demo") note.textContent = "Demo store — no payment is taken.";
    else if (CHECKOUT.mode === "stripe") note.textContent = "Secure checkout by Stripe.";
    else if (CHECKOUT.mode === "shopify") note.textContent = "Secure checkout by Shopify.";
    else note.textContent = "";
  }

  /* ---------- Checkout ---------- */
  function checkout() {
    if (!cart.length) return;

    if (CHECKOUT.mode === "shopify" && CHECKOUT.shopifyDomain) {
      /* Shopify cart permalinks let a plain static site hand off a whole
         multi-item cart without any SDK or backend:
         https://shop.myshopify.com/cart/VARIANT:QTY,VARIANT:QTY */
      var parts = [];
      var missing = false;
      cart.forEach(function (l) {
        var p = byId(l.id);
        var key = [l.size, l.color].filter(Boolean).join(" / ");
        var vid = p.variantIds && (p.variantIds[key] || p.variantIds[l.size] || p.variantIds["default"]);
        if (vid) parts.push(vid + ":" + l.qty);
        else missing = true;
      });
      if (parts.length) {
        if (missing) toast("Some items aren't linked yet — checking out the rest.");
        window.location.href = "https://" + CHECKOUT.shopifyDomain + "/cart/" + parts.join(",");
        return;
      }
      toast("Checkout isn't connected yet.");
      return;
    }

    if (CHECKOUT.mode === "stripe") {
      var withLinks = cart.filter(function (l) { var p = byId(l.id); return p && p.buyUrl; });
      if (withLinks.length === 1 && cart.length === 1) {
        window.open(stripeUrl(byId(cart[0].id), cart[0]), "_blank", "noopener");
        return;
      }
      if (withLinks.length) {
        toast("Use the Pay button on each item to check out.");
        return;
      }
      toast("Checkout isn't connected yet.");
      return;
    }

    toast("This is a demo store — no payment is processed.");
  }

  /* ============================================================
     STOREFRONT RENDERING
     ============================================================ */
  function renderBrand() {
    document.querySelectorAll("[data-brand-name]").forEach(function (el) { el.textContent = BRAND.name; });
    var set = function (sel, val) { var el = $(sel); if (el) el.textContent = val || ""; };
    set("[data-tagline]", BRAND.tagline);
    set("[data-hero-headline]", BRAND.heroHeadline);
    set("[data-hero-sub]", BRAND.heroSub);
    set("[data-hero-cta]", BRAND.heroCta || "Shop");
    set("[data-shipping-note]", BRAND.shippingNote);
    set("[data-story-heading]", BRAND.storyHeading || "Our Story");

    var story = $("[data-story]");
    if (story) story.innerHTML = (BRAND.story || []).map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");

    var stats = $("#stats");
    if (stats) {
      stats.innerHTML = (BRAND.stats || []).map(function (s) {
        return '<div class="stat"><span class="stat__num">' + esc(s.num) +
          '</span><span class="stat__label">' + esc(s.label) + "</span></div>";
      }).join("");
    }

    var socials = $("#socials");
    if (socials) {
      socials.innerHTML = (BRAND.socials || []).map(function (s) {
        return '<a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.label) + "</a>";
      }).join("");
    }

    $("#year").textContent = new Date().getFullYear();
    $("#footerNote").textContent = CHECKOUT.mode === "demo"
      ? "Demo store — orders are not processed."
      : (BRAND.email || "");

    document.title = BRAND.name + " — Official Store";
  }

  /* Nested filtering: three main departments (Men's / Women's /
     Accessories), and the subcategory row appears only once a department
     is picked — showing just that department's garment types. */
  var DEPTS = [
    { key: "All", label: "All" },
    { key: "Men", label: "Men's" },
    { key: "Women", label: "Women's" },
    { key: "Accessories", label: "Accessories" },
  ];
  var activeDept = "All";
  var activeType = "All"; // subcategory within the active department

  function deptMatch(p, dept) {
    return dept === "All" || p.department === dept;
  }

  function typeMatch(p, type) {
    return type === "All" || p.category === type || (p.tags || []).indexOf(type) !== -1;
  }

  function renderFilters() {
    var box = $("#filters");
    var have = {};
    PRODUCTS.forEach(function (p) { if (p.department) have[p.department] = true; });
    var mains = DEPTS.filter(function (d) { return d.key === "All" || have[d.key]; });

    var chip = function (c, attr, active, label) {
      return '<button class="filter" ' + attr + '="' + esc(c) + '" aria-pressed="' +
        active + '">' + esc(label || c) + "</button>";
    };

    var rows = "";
    if (mains.length > 2) {
      rows += '<div class="filters__row" role="group" aria-label="Shop by department">' +
        mains.map(function (d) { return chip(d.key, "data-dept", d.key === activeDept, d.label); }).join("") + "</div>";
    }

    // Subcategories nest inside the chosen department.
    if (activeDept !== "All") {
      var subs = ["All"];
      PRODUCTS.forEach(function (p) {
        if (p.department !== activeDept) return;
        if (p.category && subs.indexOf(p.category) === -1) subs.push(p.category);
        (p.tags || []).forEach(function (t) { if (subs.indexOf(t) === -1) subs.push(t); });
      });
      if (subs.length > 2) {
        rows += '<div class="filters__row filters__row--sub" role="group" aria-label="Filter ' +
          esc(activeDept) + ' by type">' +
          subs.map(function (c) { return chip(c, "data-cat", c === activeType); }).join("") + "</div>";
      }
    }

    if (!rows) { box.hidden = true; return; }
    box.hidden = false;
    box.innerHTML = rows;
  }

  function cardHTML(p) {
    return '' +
      '<article class="card">' +
        '<a class="card__media" href="#/product/' + esc(p.id) + '">' +
          media(p, p.name) +
          (p.badge ? '<span class="card__badge">' + esc(p.badge) + "</span>" : "") +
        "</a>" +
        '<div class="card__body">' +
          (p.category ? '<span class="card__cat">' + esc(p.category) + "</span>" : "") +
          '<span class="card__name">' + esc(p.name) + "</span>" +
          '<div class="card__row">' +
            '<span class="card__price">' + priceLabel(p) + "</span>" +
            '<a class="card__link" href="#/product/' + esc(p.id) + '">View</a>' +
          "</div>" +
        "</div>" +
      "</article>";
  }

  function renderGrid() {
    var list = PRODUCTS.filter(function (p) {
      return deptMatch(p, activeDept) && typeMatch(p, activeType);
    });
    $("#productGrid").innerHTML = list.length
      ? list.map(cardHTML).join("")
      : '<p class="grid-empty">Nothing matches that combination — try clearing one of the filters.</p>';
  }

  function renderLookbook() {
    var grid = $("#lookbookGrid");
    var section = $("#lookbook");
    if (typeof LOOKBOOK === "undefined" || !LOOKBOOK.length) {
      if (section) section.hidden = true;
      var link = $("[data-lookbook-link]");
      if (link) link.hidden = true;
      return;
    }
    // Group entries under labeled headings (men / women / swim), keeping
    // the order groups first appear in. Ungrouped entries join the first
    // group, so an older data.js still renders as one plain grid.
    var groups = [];
    var byGroup = {};
    LOOKBOOK.forEach(function (l, i) {
      var g = l.group || (groups.length ? groups[0] : "");
      if (!byGroup[g]) { byGroup[g] = []; groups.push(g); }
      byGroup[g].push(i);
    });

    grid.innerHTML = groups.map(function (g) {
      var tiles = byGroup[g].map(function (i) {
        var l = LOOKBOOK[i];
        return '<button class="look" data-look="' + i + '">' + media(l, l.caption) +
          (l.caption ? '<span class="look__cap">' + esc(l.caption) + "</span>" : "") + "</button>";
      }).join("");
      var head = g ? '<h3 class="lookbook__group">' + esc(g) + "</h3>" : "";
      return head + '<div class="lookbook__grid">' + tiles + "</div>";
    }).join("");
  }

  /* ============================================================
     PRODUCT DETAIL — hash routed (#/product/<id>) so every product
     has a real shareable link without needing a build step.
     ============================================================ */
  var sel = { size: null, color: null, shot: 0 };

  function renderProduct(p) {
    /* A gallery entry is either a plain path or { image, alt } — the object
       form lets a specific shot carry its own description (e.g. "back view")
       instead of inheriting the product name. */
    var shots = [p].concat((p.gallery || []).map(function (g) {
      var src = typeof g === "string" ? g : g.image;
      return { image: src, alt: (typeof g === "object" && g.alt) || null,
               placeholder: p.placeholder, fit: p.fit };
    }));
    var needsSize = p.sizes && p.sizes.length && !(p.sizes.length === 1 && p.sizes[0] === "One Size");

    /* A concept piece shows its planned sizes as information, not as a
       choice — nothing here is selectable because nothing is buyable. */
    var sizeBlock = "";
    if (p.comingSoon && p.sizes && p.sizes.length) {
      sizeBlock = '' +
        '<div class="opt">' +
          '<span class="opt__label">Planned sizes</span>' +
          '<div class="opt__row">' + p.sizes.map(function (s) {
            return '<span class="chip chip--static">' + esc(s) + "</span>";
          }).join("") + "</div>" +
          (p.sizeNote ? '<p class="opt__note">' + esc(p.sizeNote) + "</p>" : "") +
        "</div>";
    } else if (needsSize) {
      sizeBlock = '' +
        '<div class="opt">' +
          '<span class="opt__label">Size</span>' +
          '<div class="opt__row">' + p.sizes.map(function (s) {
            return '<button class="chip" data-size="' + esc(s) + '" aria-pressed="' + (sel.size === s) + '">' + esc(s) + "</button>";
          }).join("") + "</div>" +
        "</div>";
    }

    var colorBlock = (!p.comingSoon && p.colors && p.colors.length > 1) ? '' +
      '<div class="opt">' +
        '<span class="opt__label">Color</span>' +
        '<div class="opt__row">' + p.colors.map(function (c) {
          return '<button class="chip" data-color="' + esc(c) + '" aria-pressed="' + (sel.color === c) + '">' + esc(c) + "</button>";
        }).join("") + "</div>" +
      "</div>" : "";

    var thumbs = shots.length > 1 ? '<div class="pdp__thumbs">' + shots.map(function (s, i) {
      return '<button class="pdp__thumb" data-shot="' + i + '" aria-pressed="' + (sel.shot === i) +
        '" aria-label="View image ' + (i + 1) + '">' + media(s, p.name) + "</button>";
    }).join("") + "</div>" : "";

    var buyControl = p.comingSoon
      ? '<button class="btn btn--primary btn--block" disabled aria-disabled="true">Coming Soon</button>' +
        '<p class="hint">Concept piece — not yet in production. Join the list below the shop for first access.</p>'
      : '<button class="btn btn--primary btn--block" id="addBtn">Add to Cart</button>' +
        '<p class="hint" id="pdpHint"></p>';

    var backLink = p.collection === "NorCal Lights"
      ? '<a class="pdp__back" href="#/collections/norcal-lights">&larr; NorCal Lights</a> ' +
        '<a class="pdp__back" href="#shop">Shop</a>'
      : '<a class="pdp__back" href="#shop">&larr; Back to shop</a>';

    $("#productView").innerHTML = '' +
      '<div class="pdp">' +
        backLink +
        '<div class="pdp__grid">' +
          '<div class="pdp__media">' +
            '<div class="pdp__main">' + media(shots[sel.shot] || p, p.name) + "</div>" +
            thumbs +
          "</div>" +
          "<div>" +
            (p.category ? '<div class="pdp__cat">' + esc(p.category) +
              (p.collection ? " · " + esc(p.collection) : "") + "</div>" : "") +
            '<h1 class="pdp__title">' + esc(p.name) + "</h1>" +
            '<div class="pdp__price">' + priceLabel(p) + "</div>" +
            (p.description ? '<p class="pdp__desc">' + esc(p.description) + "</p>" : "") +
            sizeBlock + colorBlock +
            buyControl +
            ((p.details && p.details.length) ? '<div class="pdp__details"><h3>Details</h3><ul>' +
              p.details.map(function (d) { return "<li>" + esc(d) + "</li>"; }).join("") + "</ul></div>" : "") +
          "</div>" +
        "</div>" +
      "</div>";
  }

  function openProduct(id) {
    var p = byId(id);
    if (!p) { window.location.hash = "#/"; return; }
    // Preselect the only option when there's no real choice to make.
    sel = {
      size: (p.sizes && p.sizes.length === 1) ? p.sizes[0] : null,
      color: (p.colors && p.colors.length === 1) ? p.colors[0] : null,
      shot: 0,
    };
    $("#storeView").hidden = true;
    $("#productView").hidden = false;
    renderProduct(p);
    window.scrollTo(0, 0);
    document.title = p.name + " — " + BRAND.name;
  }

  function closeProduct() {
    $("#productView").hidden = true;
    $("#storeView").hidden = false;
    document.title = BRAND.name + " — Official Store";
  }

  /* ============================================================
     NORCAL LIGHTS — the women's collection page, hash-routed like
     everything else (#/collections/norcal-lights).
     ============================================================ */
  function collectionProducts() {
    return PRODUCTS.filter(function (p) { return p.collection === "NorCal Lights"; });
  }

  function renderCollection() {
    var all = collectionProducts();
    var apparel = all.filter(function (p) { return p.category !== "Swim"; });
    var swim = all.filter(function (p) { return p.category === "Swim"; });

    $("#productView").innerHTML = '' +
      '<div class="coll">' +

        // Hero: editorial split — copy left, two boards right.
        '<section class="coll__hero">' +
          '<div class="coll__hero-copy">' +
            '<p class="coll__eyebrow">Uptown Cali Women</p>' +
            '<h1 class="coll__title">NorCal Lights</h1>' +
            '<p class="coll__sub">Northern California heritage, recut for her. Women’s streetwear and swim built for the coast, the city and everything after dark.</p>' +
            '<div class="coll__ctas">' +
              '<a class="btn btn--primary" href="#nl-apparel">Explore the Collection</a>' +
              '<a class="btn btn--ghost" href="#/shop/swim">Shop Swim</a>' +
            "</div>" +
          "</div>" +
          '<div class="coll__hero-media" aria-hidden="false">' +
            '<img src="images/norcal-lights/01-norcal-lights-womens-baby-tee.jpg" alt="Adult woman wearing a fitted black Uptown Cali baby tee beside front and back product views." loading="eager">' +
            '<img src="images/norcal-lights/08-midnight-chrome-bandeau-swim-set.jpg" alt="Product board showing front and back views of a red-and-black Uptown Cali bandeau swim set and hardware details." loading="lazy">' +
          "</div>" +
        "</section>" +

        // Collection statement.
        '<section class="coll__statement">' +
          '<h2>Built Different. Cut for Her.</h2>' +
          '<p>Women-specific fits, heavyweight construction and the same Northern California identity that defines Uptown Cali.</p>' +
        "</section>" +

        // Apparel grid (concepts 1-6).
        '<section class="coll__section" id="nl-apparel">' +
          '<h2 class="section__title">The Capsule</h2>' +
          '<p class="coll__note">Concept previews — every piece is shown from its design board and marked Coming Soon until production is confirmed.</p>' +
          '<div class="grid">' + apparel.map(cardHTML).join("") + "</div>" +
        "</section>" +

        // Swim feature (concepts 7-10).
        '<section class="coll__section coll__section--alt" id="nl-swim">' +
          '<h2 class="section__title">Coast to After Dark</h2>' +
          '<p class="coll__note">Swim tops and bottoms are planned to be sized separately, so mixing sizes for the right fit is the intent — final options are confirmed at launch.</p>' +
          '<div class="grid">' + swim.map(cardHTML).join("") + "</div>" +
        "</section>" +

        // One restrained editorial band; the full set lives in the lookbook.
        '<section class="coll__editorial">' +
          '<img class="img--contain" src="images/norcal-lights/04-norcal-lights-velour-track-set.jpg" alt="Front and back views of an adult woman wearing a black Uptown Cali velour track set with red piping." loading="lazy">' +
          '<div class="coll__editorial-copy">' +
            '<h2>Nor Cal Nights, Her Way</h2>' +
            '<p>The full set of concept boards — apparel and swim — lives in the lookbook alongside the men’s line.</p>' +
            '<a class="btn btn--ghost" href="#lookbook" id="collLookbookLink">See the Lookbook</a>' +
          "</div>" +
        "</section>" +

        // Early access — same signup logic as the storefront form.
        '<section class="coll__signup">' +
          '<h2>Be First When the Lights Come On.</h2>' +
          '<p>Drop your email for first access when the women’s capsule releases.</p>' +
          '<form class="newsletter" id="collSignupForm">' +
            '<label class="sr-only" for="collEmail">Email address</label>' +
            '<input type="email" id="collEmail" placeholder="you@email.com" required />' +
            '<button type="submit" class="btn btn--primary">Sign Up</button>' +
          "</form>" +
          '<p class="form-msg" id="collFormMsg" role="status"></p>' +
        "</section>" +

      "</div>";

    bindSignup("#collSignupForm", "#collFormMsg");
  }

  function openCollection() {
    $("#storeView").hidden = true;
    $("#productView").hidden = false;
    renderCollection();
    window.scrollTo(0, 0);
    document.title = "NorCal Lights — Uptown Cali Women";
    setMetaDescription("Explore NorCal Lights by Uptown Cali: Northern California women's streetwear, swim concepts and cover-ups in the brand's signature black, red and cream.");
  }

  var defaultMetaDescription = null;
  function setMetaDescription(text) {
    var el = document.querySelector('meta[name="description"]');
    if (!el) return;
    if (defaultMetaDescription === null) defaultMetaDescription = el.getAttribute("content");
    el.setAttribute("content", text || defaultMetaDescription);
  }

  /* Deep links (#/shop/women, #/shop/swim) pre-apply filters so the nav
     can point straight at a filtered shop. Swim nests under Women's. */
  function openShopFiltered(dept, sub) {
    activeDept = dept;
    activeType = sub || "All";
    closeProduct();
    renderFilters();
    renderGrid();
    var shop = $("#shop");
    if (shop) shop.scrollIntoView({ behavior: "auto", block: "start" });
  }

  function route() {
    var m = window.location.hash.match(/^#\/product\/(.+)$/);
    if (m) { setMetaDescription(null); openProduct(decodeURIComponent(m[1])); return; }
    if (/^#\/collections\/norcal-lights\/?$/.test(window.location.hash)) { openCollection(); return; }
    setMetaDescription(null);
    if (/^#\/shop\/women\/?$/.test(window.location.hash)) { openShopFiltered("Women"); return; }
    if (/^#\/shop\/swim\/?$/.test(window.location.hash)) { openShopFiltered("Women", "Swim"); return; }
    if (/^#\/shop\/men\/?$/.test(window.location.hash)) { openShopFiltered("Men"); return; }
    if (/^#\/shop\/accessories\/?$/.test(window.location.hash)) { openShopFiltered("Accessories"); return; }
    closeProduct();
    // Plain #section anchors (e.g. #lookbook from the collection page) need
    // a manual scroll: the section may have been hidden when the browser
    // tried to jump to it.
    var anchor = window.location.hash.match(/^#([a-z]+)$/);
    if (anchor) {
      var el = document.getElementById(anchor[1]);
      if (el) el.scrollIntoView({ behavior: "auto", block: "start" });
    }
  }

  /* ============================================================
     EVENTS — delegated, so re-rendered markup keeps working.
     ============================================================ */
  document.addEventListener("click", function (e) {
    var t = e.target.closest("button, a");
    if (!t) return;

    // Filters: picking a department resets its nested subcategory.
    if (t.dataset.dept) {
      activeDept = t.dataset.dept;
      activeType = "All";
      renderFilters();
      renderGrid();
      return;
    }
    if (t.dataset.cat) {
      activeType = t.dataset.cat;
      renderFilters();
      renderGrid();
      return;
    }

    // Product options
    var p = byId((window.location.hash.match(/^#\/product\/(.+)$/) || [])[1] || "");
    if (t.dataset.size && p) { sel.size = t.dataset.size; renderProduct(p); return; }
    if (t.dataset.color && p) { sel.color = t.dataset.color; renderProduct(p); return; }
    if (t.dataset.shot && p) { sel.shot = Number(t.dataset.shot); renderProduct(p); return; }

    if (t.id === "addBtn" && p) {
      var needsSize = p.sizes && p.sizes.length && !(p.sizes.length === 1 && p.sizes[0] === "One Size");
      if (needsSize && !sel.size) {
        var hint = $("#pdpHint");
        hint.textContent = "Pick a size first.";
        hint.className = "hint hint--warn";
        return;
      }
      if (p.colors && p.colors.length > 1 && !sel.color) {
        var h2 = $("#pdpHint");
        h2.textContent = "Pick a color first.";
        h2.className = "hint hint--warn";
        return;
      }
      addToCart(p.id, sel.size, sel.color);
      toast("Added to cart");
      openDrawer();
      return;
    }

    // Cart controls
    if (t.dataset.inc) { setQty(t.dataset.inc, 1); return; }
    if (t.dataset.dec) { setQty(t.dataset.dec, -1); return; }
    if (t.dataset.rm) { removeLine(t.dataset.rm); return; }

    // Lookbook
    if (t.dataset.look) { openLightbox(LOOKBOOK[Number(t.dataset.look)]); return; }

    if (t.id === "cartBtn") { openDrawer(); return; }
    if (t.id === "cartClose" || t.id === "cartScrim") { closeDrawer(); return; }
    if (t.id === "checkoutBtn") { checkout(); return; }
    if (t.id === "lightboxClose") { closeLightbox(); return; }
  });

  function openDrawer() { $("#cartDrawer").hidden = false; document.body.style.overflow = "hidden"; }
  function closeDrawer() { $("#cartDrawer").hidden = true; document.body.style.overflow = ""; }

  function openLightbox(item) {
    $("#lightboxInner").innerHTML = media(item, item.caption);
    $("#lightbox").hidden = false;
  }
  function closeLightbox() { $("#lightbox").hidden = true; }

  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if (!$("#lightbox").hidden) closeLightbox();
    else if (!$("#cartDrawer").hidden) closeDrawer();
  });

  /* One signup behavior, bound wherever a signup form renders (the
     storefront section and the NorCal Lights early-access section).
     No backend here — this just confirms to the visitor. To actually
     collect addresses, point the form at Mailchimp/Formspree/Buttondown
     (see references/deploy.md in the skill). */
  function bindSignup(formSel, msgSel) {
    var form = $(formSel);
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      $(msgSel).textContent = "Thanks — you're on the list.";
      e.target.reset();
    });
  }
  bindSignup("#newsletterForm", "#formMsg");

  /* The product-page magnifier zooms toward the cursor: the point under
     the pointer stays under the pointer, so hovering the chest print
     inspects the chest print, not the middle of the image. */
  document.addEventListener("mousemove", function (e) {
    var main = e.target.closest(".pdp__main");
    if (!main) return;
    var img = main.querySelector("img");
    if (!img) return;
    var r = main.getBoundingClientRect();
    img.style.transformOrigin =
      Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100)) + "% " +
      Math.max(0, Math.min(100, ((e.clientY - r.top) / r.height) * 100)) + "%";
  });

  window.addEventListener("hashchange", route);

  /* ---------- Boot ---------- */
  loadCart();
  renderBrand();
  renderFilters();
  renderGrid();
  renderLookbook();
  renderCart();
  route();
})();
