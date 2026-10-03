/* =====================================================================
   Buenos Días Cafecito — site behaviour
   Reads data.js and fills the page: both languages, the phone number
   everywhere, the ordering options, the numbered menu, the text-your-order
   builder, hours and open/closed status, the catering form, and the
   search-engine data. Nothing here needs editing day to day.
   ===================================================================== */
(function () {
  "use strict";

  const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const LANG_KEY = "bdc-lang", ORDER_KEY = "bdc-order";
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  const ORD = SITE.ordering || { phone: true };

  /* ---------- Language ---------- */
  let lang = pickLanguage();
  function pickLanguage() {
    try {
      const fromUrl = new URLSearchParams(location.search).get("lang");
      if (fromUrl === "es" || fromUrl === "en") return fromUrl;
      const saved = localStorage.getItem(LANG_KEY);
      if (saved === "es" || saved === "en") return saved;
    } catch (e) { /* private mode etc. */ }
    return (navigator.language || "").toLowerCase().startsWith("es") ? "es" : "en";
  }
  function t(key, vars) {
    const table = I18N[lang] || I18N.en;
    let s = table[key] != null ? table[key] : (I18N.en[key] != null ? I18N.en[key] : key);
    if (vars) Object.keys(vars).forEach(k => { s = s.split("{" + k + "}").join(vars[k]); });
    return s;
  }
  const L = obj => (obj && typeof obj === "object") ? (obj[lang] != null ? obj[lang] : obj.en) : obj;
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const money = p => (p == null ? t("price.ask") : "$" + Number(p).toFixed(2));
  function fmtTime(hhmm) {
    const [h, m] = hhmm.split(":").map(Number);
    return (((h + 11) % 12) + 1) + ":" + String(m).padStart(2, "0") + " " + (h >= 12 ? "PM" : "AM");
  }

  /* ---------- Hours & open/closed ---------- */
  const hoursFor = day => Object.prototype.hasOwnProperty.call(SITE.exceptions, day) ? SITE.exceptions[day] : SITE.hours;
  function nowPacific() {
    const parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/Los_Angeles", weekday: "short", hour: "numeric", minute: "numeric", hour12: false }).formatToParts(new Date());
    const get = type => (parts.find(p => p.type === type) || {}).value;
    return { day: get("weekday"), minutes: (parseInt(get("hour"), 10) % 24) * 60 + parseInt(get("minute"), 10) };
  }
  const toMin = hhmm => { const [h, m] = hhmm.split(":").map(Number); return h * 60 + m; };
  function updateStatus() {
    const el = $("#status"); if (!el) return;
    const now = nowPacific(), idx = DAYS.indexOf(now.day), today = hoursFor(now.day);
    let text, open = false;
    if (today && now.minutes >= toMin(today.open) && now.minutes < toMin(today.close)) { text = t("status.openNow", { close: fmtTime(today.close) }); open = true; }
    else if (today && now.minutes < toMin(today.open)) text = t("status.opensToday", { open: fmtTime(today.open) });
    else {
      let n = 1, next = null;
      while (n <= 7) { const d = DAYS[(idx + n) % 7], h = hoursFor(d); if (h) { next = { d, h }; break; } n++; }
      if (!next) text = t("visit.closed");
      else if (n === 1) text = t("status.opensTomorrow", { open: fmtTime(next.h.open) });
      else text = t("status.closedToday", { day: t("visit.days." + next.d), open: fmtTime(next.h.open) });
    }
    el.classList.toggle("is-open", open); el.classList.toggle("is-closed", !open);
    $(".status__text", el).textContent = text;
  }
  function renderHours() {
    const table = $("#hoursTable"); if (!table) return;
    const today = nowPacific().day;
    table.innerHTML = DAYS.map(d => {
      const h = hoursFor(d);
      const cell = h ? esc(fmtTime(h.open) + " – " + fmtTime(h.close)) : '<span class="is-closed">' + esc(t("visit.closed")) + "</span>";
      return '<tr class="' + (d === today ? "is-today" : "") + '"><td data-today="' + esc(t("visit.today")) + '">' + esc(t("visit.days." + d)) + "</td><td>" + cell + "</td></tr>";
    }).join("");
    const f = $("#footerHours"); if (f) f.textContent = t("status.hoursDaily", { open: fmtTime(SITE.hours.open), close: fmtTime(SITE.hours.close) });
  }

  /* ---------- Static strings, links, phone ---------- */
  function applyStatic() {
    document.documentElement.lang = lang;
    document.title = t("meta.title");
    $$("[data-i18n]").forEach(el => { el.textContent = t(el.getAttribute("data-i18n")); });
    $$("[data-i18n-placeholder]").forEach(el => { el.placeholder = t(el.getAttribute("data-i18n-placeholder")); });
    const toggle = $("#langToggle"); if (toggle) toggle.setAttribute("aria-label", t("lang.switchLabel"));
    const map = $("#map"); if (map) map.title = t("visit.mapTitle");
    const rights = $("#footerRights"); if (rights) rights.textContent = t("footer.rights", { year: new Date().getFullYear() });
    const upd = $("#menuUpdated"); if (upd) upd.textContent = t("menu.updated", { date: L(SITE.menuUpdated) });
    const notice = $("#notice");
    if (notice) {
      const custom = L(SITE.notice);
      const n = custom || (SITE.oldPhone ? t("notice.newNumber", { phone: SITE.phone, old: SITE.oldPhone }) : "");
      notice.hidden = !n; notice.textContent = n || "";
    }
  }
  function applyLinks() {
    $$("[data-link]").forEach(a => { const href = SITE.links[a.getAttribute("data-link")]; if (href) a.href = href; });
  }
  function applyPhone() {
    $$('a[href^="tel:"]').forEach(a => { a.href = "tel:" + SITE.phoneHref; });
    $$("[data-phone]").forEach(el => { el.textContent = SITE.phone; });
    const v = $("#vcardLink");
    if (v) {
      const card = ["BEGIN:VCARD", "VERSION:3.0", "N:;" + SITE.name + ";;;", "FN:" + SITE.name, "ORG:" + SITE.legalName,
        "TEL;TYPE=WORK,VOICE:" + SITE.phoneHref, "ADR;TYPE=WORK:;;" + SITE.address.street + ";" + SITE.address.city + ";" + SITE.address.state + ";" + SITE.address.zip + ";USA",
        "URL:" + SITE.url, "NOTE:" + L(SITE.tagline) + " " + t("status.hoursDaily", { open: fmtTime(SITE.hours.open), close: fmtTime(SITE.hours.close) }), "END:VCARD"].join("\r\n");
      v.href = "data:text/vcard;charset=utf-8," + encodeURIComponent(card);
    }
  }
  function applyOrdering() {
    const show = (sel, on) => $$(sel).forEach(el => { el.hidden = !on; });
    show('[data-way="phone"]', ORD.phone !== false);
    show('[data-way="text"]', !!ORD.text);
    show('[data-way="online"]', !!ORD.online);
    show('[data-way="delivery"]', !!ORD.delivery);
    $$("[data-order-online]").forEach(a => { a.hidden = !ORD.online; if (ORD.online) a.href = ORD.online; });
    $$("[data-delivery]").forEach(a => { if (ORD.delivery) a.href = ORD.delivery; });
    const composer = $("#textOrder"); if (composer) composer.hidden = !ORD.text;
    const sec = $("#mobileSecondary");
    if (sec) {
      if (ORD.text) { sec.href = "#textOrder"; sec.setAttribute("data-text-start", ""); $("span", sec).setAttribute("data-i18n", "mobile.text"); }
      else { sec.href = "#menu"; sec.removeAttribute("data-text-start"); $("span", sec).setAttribute("data-i18n", "mobile.menu"); }
      $("span", sec).textContent = t($("span", sec).getAttribute("data-i18n"));
    }
  }

  /* ---------- Photos ---------- */
  function applyPhotos() {
    $$("[data-photo]").forEach(fig => {
      const key = fig.getAttribute("data-photo"), src = SITE.photos[key];
      const old = $("img", fig); if (old) old.remove();
      fig.classList.toggle("has-photo", !!src);
      if (!src) return;
      const img = document.createElement("img");
      img.src = src; img.loading = key === "hero" ? "eager" : "lazy"; img.decoding = "async";
      const alt = SITE.photoAlt && SITE.photoAlt[key]; img.alt = alt ? L(alt) : SITE.displayName;
      fig.appendChild(img);
    });
  }

  /* ---------- Ratings, reviews, events, story, signatures ---------- */
  function renderRatings() {
    const ul = $("#ratings"); if (!ul) return;
    ul.innerHTML = RATINGS.map(r => {
      const inner = '<span class="proof__score">' + esc(r.score) + '</span><span class="proof__platform">' + esc(r.platform) + '</span><span class="proof__detail">' + esc(L(r.detail)) + "</span>";
      const href = r.href && SITE.links[r.href];
      return '<li class="proof__item">' + (href ? '<a href="' + esc(href) + '" target="_blank" rel="noopener">' + inner + "</a>" : inner) + "</li>";
    }).join("");
  }
  function renderReviews() {
    const ul = $("#reviewsList"); if (!ul) return;
    ul.innerHTML = REVIEWS.map(r => '<li class="review"><div class="review__stars" aria-hidden="true">★★★★★</div><p class="review__quote">' + esc(L(r.quote)) + '</p><div class="review__source">' + esc(r.source) + "</div></li>").join("");
  }
  function renderEvents() {
    const ul = $("#events"); if (!ul) return;
    ul.innerHTML = EVENTS.map(e => '<li class="event"><p class="event__when">' + esc(L(e.when)) + '</p><h3 class="event__name">' + esc(L(e.name)) + '</h3><p class="event__desc">' + esc(L(e.desc)) + "</p></li>").join("");
  }
  function renderStory() {
    const ps = $("#storyParagraphs"); if (ps) ps.innerHTML = STORY.paragraphs.map(p => "<p>" + esc(L(p)) + "</p>").join("");
    const ow = $("#owners"); if (ow) ow.innerHTML = STORY.owners.map(o => '<div class="owner"><div class="owner__name">' + esc(o.name) + '</div><div class="owner__role">' + esc(L(o.role)) + "</div></div>").join("");
    const qs = $("#storyQuotes"); if (qs) qs.innerHTML = STORY.quotes.map(q => '<blockquote class="quote"><p>' + esc(L(q.text)) + "</p><cite>— " + esc(q.who) + "</cite></blockquote>").join("");
  }
  function renderSignatures() {
    const grid = $("#signatures"); if (!grid) return;
    grid.innerHTML = SIGNATURES.map(s => {
      const badge = s.badge ? '<span class="badge sig__badge">' + esc(L(s.badge)) + "</span>" : "";
      return '<article class="sig"><figure class="photo" data-photo="' + esc(s.photo) + '">' + badge + '<svg class="photo__art" aria-hidden="true"><use href="#art-' + esc(s.art) + '"/></svg></figure>' +
        '<div class="sig__body"><div class="sig__top"><h3 class="sig__name">' + esc(L(s.name)) + '</h3><span class="sig__price">' + esc(money(s.price)) + "</span></div>" +
        '<p class="sig__blurb">' + esc(L(s.blurb)) + "</p></div></article>";
    }).join("");
  }

  /* ---------- Menu (numbered, with Add buttons for text orders) ---------- */
  const ITEMS = {};     // "catId:index" -> { item, cat, num }
  (function index() {
    let n = 0;
    MENU.forEach(c => c.items.forEach((it, i) => {
      const num = (SITE.menuNumbers && !c.compact) ? ++n : null;
      ITEMS[c.id + ":" + i] = { item: it, cat: c, num };
    }));
  })();
  const itemLabel = (entry, withNum) => (withNum && entry.num ? "#" + entry.num + " " : "") + L(entry.item.name);

  function renderMenu() {
    const chips = $("#menuChips"), wrap = $("#menuSections"); if (!wrap) return;
    if (chips) chips.innerHTML = MENU.map(c => '<a href="#menu-' + esc(c.id) + '">' + esc(L(c.name)) + "</a>").join("");
    wrap.innerHTML = MENU.map(c => {
      const cls = "menu-cat" + (c.compact ? " menu-cat--compact" : "") + ((c.wide || c.compact) ? " menu-cat--wide" : "");
      const note = c.note && L(c.note) ? '<p class="menu-cat__note">' + esc(L(c.note)) + "</p>" : "";
      const items = c.items.map((it, i) => {
        const key = c.id + ":" + i, entry = ITEMS[key];
        const desc = it.desc && L(it.desc) ? '<p class="menu-item__desc">' + esc(L(it.desc)) + "</p>" : "";
        const tags = (it.tags || []).length ? '<div class="menu-item__tags">' + it.tags.map(tag => '<span class="tag tag--' + esc(tag) + '">' + esc(t("tag." + tag)) + "</span>").join("") + "</div>" : "";
        const num = entry.num ? '<span class="menu-item__num">' + entry.num + "</span>" : "";
        const row = '<div class="menu-item__row"><span class="menu-item__name">' + num + esc(L(it.name)) + '</span><span class="menu-item__leader" aria-hidden="true"></span><span class="menu-item__price">' + esc(money(it.price)) + "</span></div>";
        const add = (ORD.text && it.price != null) ? '<button type="button" class="menu-item__add" data-add="' + esc(key) + '">+ ' + esc(t("menu.add")) + "</button>" : "";
        if (it.photo) {
          return '<li class="menu-item menu-item--photo"><div class="menu-item__text">' + row + desc + tags + add + '</div><img class="menu-item__photo" src="' + esc(it.photo) + '" alt="' + esc(L(it.name)) + '" loading="lazy" decoding="async" width="84" height="84" /></li>';
        }
        return '<li class="menu-item">' + row + desc + tags + add + "</li>";
      }).join("");
      return '<section class="' + cls + '" id="menu-' + esc(c.id) + '"><h3 class="menu-cat__title">' + esc(L(c.name)) + "</h3>" + note + '<ul class="menu-items">' + items + "</ul></section>";
    }).join("");
    watchChips();
  }
  let chipObserver = null;
  function watchChips() {
    if (chipObserver) chipObserver.disconnect();
    if (!("IntersectionObserver" in window)) return;
    const links = $$("#menuChips a");
    chipObserver = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) links.forEach(a => a.classList.toggle("is-active", a.getAttribute("href") === "#" + en.target.id)); });
    }, { rootMargin: "-40% 0px -55% 0px" });
    $$(".menu-cat").forEach(s => chipObserver.observe(s));
  }

  /* ---------- Text your order ---------- */
  let order = loadOrder();
  function loadOrder() {
    try { const o = JSON.parse(localStorage.getItem(ORDER_KEY) || "null"); if (o && o.lines) return o; } catch (e) { /* ignore */ }
    return { lines: {}, name: "", time: "", notes: "" };
  }
  function saveOrder() { try { localStorage.setItem(ORDER_KEY, JSON.stringify(order)); } catch (e) { /* ignore */ } }
  const orderKeys = () => Object.keys(order.lines).filter(k => ITEMS[k] && order.lines[k] > 0);
  const orderCount = () => orderKeys().reduce((n, k) => n + order.lines[k], 0);
  const orderTotal = () => orderKeys().reduce((s, k) => s + order.lines[k] * (ITEMS[k].item.price || 0), 0);

  function orderMessage() {
    const who = order.name.trim(), when = order.time.trim();
    const head = [t("text.msgIntro"), who ? t("text.msgFor") + " " + who : "", when ? t("text.msgAt") + " " + when : ""].filter(Boolean).join(" ");
    const lines = orderKeys().map(k => order.lines[k] + "× " + itemLabel(ITEMS[k], true));
    const out = [head].concat(lines);
    if (order.notes.trim()) out.push(t("text.msgNotes") + ": " + order.notes.trim());
    if (lines.length) out.push(t("text.msgTotal") + ": " + money(orderTotal()));
    return out.join("\n");
  }
  function renderOrder() {
    const box = $("#orderLines"); if (!box) return;
    const keys = orderKeys();
    box.innerHTML = keys.length ? keys.map(k => {
      const e = ITEMS[k], q = order.lines[k];
      return '<div class="oline"><span class="oline__name">' + esc(itemLabel(e, true)) + '</span><span class="oline__qty"><button type="button" data-dec="' + esc(k) + '" aria-label="−">−</button>' + q + '<button type="button" data-inc="' + esc(k) + '" aria-label="+">+</button></span><span class="oline__price">' + esc(money(q * (e.item.price || 0))) + "</span></div>";
    }).join("") : '<p class="text-order__empty">' + esc(t("text.empty")) + "</p>";
    const total = $("#orderTotal"); if (total) total.textContent = money(orderTotal());
    const name = $("#orderName"), time = $("#orderTime"), notes = $("#orderNotes");
    if (name && name.value !== order.name) name.value = order.name;
    if (time && time.value !== order.time) time.value = order.time;
    if (notes && notes.value !== order.notes) notes.value = order.notes;
    const send = $("#orderSend");
    if (send) { send.href = "sms:" + SITE.phoneHref + "?&body=" + encodeURIComponent(orderMessage()); send.textContent = t("text.send", { phone: SITE.phone }); }
    const pill = $("#orderPill"), n = orderCount();
    if (pill) {
      pill.hidden = !(ORD.text && n > 0);
      $("#orderPillCount").textContent = n === 1 ? t("pill.item") : t("pill.items", { n });
      $("#orderPillLabel").textContent = t("pill.review") + " · " + money(orderTotal());
    }
    $$(".menu-item__add").forEach(b => { b.classList.toggle("is-added", (order.lines[b.getAttribute("data-add")] || 0) > 0); });
  }
  function setupOrder() {
    document.addEventListener("click", e => {
      const add = e.target.closest("[data-add]");
      if (add) { const k = add.getAttribute("data-add"); order.lines[k] = (order.lines[k] || 0) + 1; saveOrder(); renderOrder(); add.textContent = "✓ " + t("menu.added"); setTimeout(() => { add.textContent = "+ " + t("menu.add"); }, 1200); return; }
      const inc = e.target.closest("[data-inc]"); if (inc) { const k = inc.getAttribute("data-inc"); order.lines[k] = (order.lines[k] || 0) + 1; saveOrder(); renderOrder(); return; }
      const dec = e.target.closest("[data-dec]"); if (dec) { const k = dec.getAttribute("data-dec"); order.lines[k] = Math.max(0, (order.lines[k] || 0) - 1); if (!order.lines[k]) delete order.lines[k]; saveOrder(); renderOrder(); return; }
      if (e.target.closest("[data-text-start]")) { const c = $("#textOrder"); if (c) { e.preventDefault(); c.hidden = false; c.scrollIntoView({ behavior: "smooth", block: "start" }); } }
    });
    ["orderName", "orderTime", "orderNotes"].forEach(id => {
      const el = $("#" + id); if (!el) return;
      el.addEventListener("input", () => { order[id === "orderName" ? "name" : id === "orderTime" ? "time" : "notes"] = el.value; saveOrder(); renderOrder(); });
    });
    const copy = $("#orderCopy");
    if (copy) copy.addEventListener("click", async () => {
      try { await navigator.clipboard.writeText(orderMessage()); $("span", copy).textContent = t("text.copied"); setTimeout(() => { $("span", copy).textContent = t("text.copy"); }, 1500); } catch (e) { /* older browsers */ }
    });
    const clear = $("#orderClear");
    if (clear) clear.addEventListener("click", () => { order = { lines: {}, name: "", time: "", notes: "" }; saveOrder(); renderOrder(); });
    // Hide the floating pill while the builder itself is on screen.
    const composer = $("#textOrder"), pill = $("#orderPill");
    if (composer && pill && "IntersectionObserver" in window) {
      new IntersectionObserver(entries => { pill.classList.toggle("is-near", entries[0].isIntersecting); }, { threshold: 0.05 }).observe(composer);
    }
  }

  /* ---------- Search-engine data (built from data.js) ---------- */
  function injectSchema() {
    $$("script[data-schema]").forEach(s => s.remove());
    const addr = SITE.address;
    const restaurant = {
      "@context": "https://schema.org", "@type": "Restaurant", "@id": SITE.url + "#restaurant",
      "name": SITE.name, "alternateName": SITE.displayName, "url": SITE.url, "image": SITE.url + "images/og-image.jpg",
      "description": "Modern Mexican breakfast and lunch in downtown Hollister, California. Chilaquiles, huevos rancheros, marinated arrachera and eggs, pancakes and café de olla, served " + fmtTime(SITE.hours.open) + " to " + fmtTime(SITE.hours.close) + " every day. Call ahead for pickup.",
      "telephone": SITE.phoneHref, "servesCuisine": ["Mexican", "Breakfast", "Brunch", "American"], "priceRange": "$$",
      "paymentAccepted": "Cash, Credit Card, Apple Pay",
      "address": { "@type": "PostalAddress", "streetAddress": addr.street, "addressLocality": addr.city, "addressRegion": addr.state, "postalCode": addr.zip, "addressCountry": "US" },
      "geo": { "@type": "GeoCoordinates", "latitude": SITE.geo.lat, "longitude": SITE.geo.lng },
      "hasMap": SITE.links.googleMaps,
      "openingHoursSpecification": DAYS.filter(d => hoursFor(d)).map(d => ({ "@type": "OpeningHoursSpecification", "dayOfWeek": t("visit.days." + d), "opens": hoursFor(d).open, "closes": hoursFor(d).close })),
      "hasMenu": SITE.url + "#menu",
      "amenityFeature": ["Outdoor seating", "Wheelchair accessible", "Takeout", "Catering", "Dogs allowed outside"].map(n => ({ "@type": "LocationFeatureSpecification", "name": n, "value": true })),
      "sameAs": ["instagram", "facebook", "yelp", "tripadvisor", "chamber"].map(k => SITE.links[k]).filter(Boolean),
    };
    if (ORD.online) restaurant.potentialAction = { "@type": "OrderAction", "target": { "@type": "EntryPoint", "urlTemplate": ORD.online, "actionPlatform": ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"] }, "deliveryMethod": ["http://purl.org/goodrelations/v1#DeliveryModePickUp"] };
    const menu = {
      "@context": "https://schema.org", "@type": "Menu", "@id": SITE.url + "#menu", "name": SITE.name + " Menu", "inLanguage": "en",
      "hasMenuSection": MENU.map(c => ({ "@type": "MenuSection", "name": c.name.en, "hasMenuItem": c.items.map(it => {
        const o = { "@type": "MenuItem", "name": it.name.en };
        if (it.desc && it.desc.en) o.description = it.desc.en;
        if (it.price != null) o.offers = { "@type": "Offer", "price": Number(it.price).toFixed(2), "priceCurrency": "USD" };
        return o;
      }) })),
    };
    [restaurant, menu].forEach(data => { const s = document.createElement("script"); s.type = "application/ld+json"; s.setAttribute("data-schema", ""); s.textContent = JSON.stringify(data); document.head.appendChild(s); });
  }

  /* ---------- Catering form ---------- */
  function buildMessage(d) {
    const lines = [t("form.msgIntro"), t("form.name") + ": " + d.name, t("form.phone") + ": " + d.phone];
    if (d.date) lines.push(t("form.date") + ": " + d.date);
    if (d.headcount) lines.push(t("form.headcount") + ": " + d.headcount);
    if (d.notes) lines.push(t("form.notes").split("?")[0] + "?: " + d.notes);
    return lines.join("\n");
  }
  function setupForm() {
    const form = $("#cateringForm"), out = $("#formResult"); if (!form || !out) return;
    form.addEventListener("submit", async e => {
      e.preventDefault();
      if (!form.reportValidity()) return;
      const d = Object.fromEntries(new FormData(form).entries()), msg = buildMessage(d);
      out.hidden = false; out.className = "form__result";
      if (SITE.cateringEndpoint) {
        try {
          const res = await fetch(SITE.cateringEndpoint, { method: "POST", headers: { "Accept": "application/json", "Content-Type": "application/json" }, body: JSON.stringify(Object.assign({}, d, { message: msg, _subject: "Catering request — " + SITE.name + " website" })) });
          if (!res.ok) throw new Error("HTTP " + res.status);
          out.classList.add("is-ok"); out.textContent = t("form.thanks"); form.reset();
        } catch (err) { out.classList.add("is-error"); out.textContent = t("form.error"); }
        out.scrollIntoView({ block: "nearest", behavior: "smooth" }); return;
      }
      const sms = "sms:" + SITE.phoneHref + "?&body=" + encodeURIComponent(msg);
      out.innerHTML = "<h4>" + esc(t("form.fallbackTitle")) + "</h4><p>" + esc(t("form.fallbackBody")) + '</p><pre class="form__preview">' + esc(msg) + "</pre>" +
        '<a class="btn btn--primary btn--sm" href="' + esc(sms) + '">' + esc(t("form.text")) + "</a>" +
        '<a class="btn btn--ghost btn--sm" href="tel:' + esc(SITE.phoneHref) + '">' + esc(t("nav.call")) + " " + esc(SITE.phone) + "</a>" +
        '<button class="btn btn--ghost btn--sm" type="button" id="copyMsg">' + esc(t("form.copy")) + "</button>";
      $("#copyMsg", out).addEventListener("click", async function () { try { await navigator.clipboard.writeText(msg); this.textContent = t("form.copied"); } catch (e) { /* ignore */ } });
      out.scrollIntoView({ block: "nearest", behavior: "smooth" });
    });
  }

  /* ---------- Nav ---------- */
  function setupNav() {
    const toggle = $("#navToggle"), links = $("#navLinks"); if (!toggle || !links) return;
    const close = () => { links.classList.remove("is-open"); toggle.setAttribute("aria-expanded", "false"); };
    toggle.addEventListener("click", () => { const open = !links.classList.contains("is-open"); links.classList.toggle("is-open", open); toggle.setAttribute("aria-expanded", String(open)); });
    links.addEventListener("click", e => { if (e.target.closest("a")) close(); });
    document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
    if ("IntersectionObserver" in window) {
      const navA = $$("a", links);
      const io = new IntersectionObserver(entries => { entries.forEach(en => { if (en.isIntersecting) navA.forEach(a => a.classList.toggle("is-active", a.getAttribute("href") === "#" + en.target.id)); }); }, { rootMargin: "-35% 0px -60% 0px" });
      navA.forEach(a => { const s = $(a.getAttribute("href")); if (s) io.observe(s); });
    }
    const print = $("#printMenu"); if (print) print.addEventListener("click", () => window.print());
    const langBtn = $("#langToggle");
    if (langBtn) langBtn.addEventListener("click", () => { lang = lang === "es" ? "en" : "es"; try { localStorage.setItem(LANG_KEY, lang); } catch (e) { /* ignore */ } renderAll(); });
  }

  /* ---------- Go ---------- */
  function renderAll() {
    applyStatic(); applyLinks(); applyPhone(); applyOrdering();
    renderRatings(); renderSignatures(); renderMenu(); renderHours(); renderEvents(); renderStory(); renderReviews();
    applyPhotos(); updateStatus(); renderOrder(); injectSchema();
  }
  renderAll();
  setupForm(); setupNav(); setupOrder();
  setInterval(updateStatus, 60 * 1000);
})();
