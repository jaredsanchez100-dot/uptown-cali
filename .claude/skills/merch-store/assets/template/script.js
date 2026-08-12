/* ============================================================
   script.js — the engine. Reads data.js and builds the store.
   You normally don't need to edit this file; edit data.js.
   ============================================================ */
(function () {
  "use strict";

  var $ = function (sel) { return document.querySelector(sel); };
  var money = function (n) { return CHECKOUT.currency + n.toFixed(2).replace(/\.00$/, ""); };

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
    if (item && item.image) {
      return '<img src="' + esc(item.image) + '" alt="' + esc(alt || "") + '" loading="lazy">';
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
      // Drop lines whose product no longer exists in data.js.
      cart = cart.filter(function (l) { return byId(l.id); });
    } catch (e) { cart = []; }
  }
  function saveCart() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(cart)); } catch (e) {}
  }

  function lineKey(id, size, color) { return id + "|" + (size || "") + "|" + (color || ""); }

  function addToCart(id, size, color) {
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
          ? '<a class="line__pay btn--ghost btn" href="' + esc(p.buyUrl) + '" target="_blank" rel="noopener" style="padding:5px 12px;font-size:12px">Pay</a>'
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
        window.open(byId(cart[0].id).buyUrl, "_blank", "noopener");
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

  var activeFilter = "All";

  function renderFilters() {
    var cats = ["All"];
    PRODUCTS.forEach(function (p) { if (p.category && cats.indexOf(p.category) === -1) cats.push(p.category); });
    var box = $("#filters");
    // One category isn't a choice — hide the row rather than show a lone button.
    if (cats.length <= 2) { box.hidden = true; return; }
    box.innerHTML = cats.map(function (c) {
      return '<button class="filter" data-cat="' + esc(c) + '" aria-pressed="' +
        (c === activeFilter) + '">' + esc(c) + "</button>";
    }).join("");
  }

  function renderGrid() {
    var list = PRODUCTS.filter(function (p) { return activeFilter === "All" || p.category === activeFilter; });
    $("#productGrid").innerHTML = list.map(function (p) {
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
              '<span class="card__price">' + money(p.price) + "</span>" +
              '<a class="card__link" href="#/product/' + esc(p.id) + '">View</a>' +
            "</div>" +
          "</div>" +
        "</article>";
    }).join("");
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
    grid.innerHTML = LOOKBOOK.map(function (l, i) {
      return '<button class="look" data-look="' + i + '">' + media(l, l.caption) +
        (l.caption ? '<span class="look__cap">' + esc(l.caption) + "</span>" : "") + "</button>";
    }).join("");
  }

  /* ============================================================
     PRODUCT DETAIL — hash routed (#/product/<id>) so every product
     has a real shareable link without needing a build step.
     ============================================================ */
  var sel = { size: null, color: null, shot: 0 };

  function renderProduct(p) {
    var shots = [p].concat((p.gallery || []).map(function (src) {
      return { image: src, placeholder: p.placeholder };
    }));
    var needsSize = p.sizes && p.sizes.length && !(p.sizes.length === 1 && p.sizes[0] === "One Size");

    var sizeBlock = needsSize ? '' +
      '<div class="opt">' +
        '<span class="opt__label">Size</span>' +
        '<div class="opt__row">' + p.sizes.map(function (s) {
          return '<button class="chip" data-size="' + esc(s) + '" aria-pressed="' + (sel.size === s) + '">' + esc(s) + "</button>";
        }).join("") + "</div>" +
      "</div>" : "";

    var colorBlock = (p.colors && p.colors.length > 1) ? '' +
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

    $("#productView").innerHTML = '' +
      '<div class="pdp">' +
        '<a class="pdp__back" href="#shop">&larr; Back to shop</a>' +
        '<div class="pdp__grid">' +
          '<div class="pdp__media">' +
            '<div class="pdp__main">' + media(shots[sel.shot] || p, p.name) + "</div>" +
            thumbs +
          "</div>" +
          "<div>" +
            (p.category ? '<div class="pdp__cat">' + esc(p.category) + "</div>" : "") +
            '<h1 class="pdp__title">' + esc(p.name) + "</h1>" +
            '<div class="pdp__price">' + money(p.price) + "</div>" +
            (p.description ? '<p class="pdp__desc">' + esc(p.description) + "</p>" : "") +
            sizeBlock + colorBlock +
            '<button class="btn btn--primary btn--block" id="addBtn">Add to Cart</button>' +
            '<p class="hint" id="pdpHint"></p>' +
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

  function route() {
    var m = window.location.hash.match(/^#\/product\/(.+)$/);
    if (m) openProduct(decodeURIComponent(m[1]));
    else closeProduct();
  }

  /* ============================================================
     EVENTS — delegated, so re-rendered markup keeps working.
     ============================================================ */
  document.addEventListener("click", function (e) {
    var t = e.target.closest("button, a");
    if (!t) return;

    // Category filter
    if (t.dataset.cat) {
      activeFilter = t.dataset.cat;
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

  $("#newsletterForm").addEventListener("submit", function (e) {
    e.preventDefault();
    /* No backend here — this just confirms to the visitor. To actually
       collect addresses, point the form at Mailchimp/Formspree/Buttondown
       (see references/deploy.md in the skill). */
    $("#formMsg").textContent = "Thanks — you're on the list.";
    e.target.reset();
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
