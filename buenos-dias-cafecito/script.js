/* =====================================================================
   Buenos Días Cafecito — site behaviour
   Reads data.js and fills the page: both languages, the menu, hours and
   open/closed status, the catering form, and the search-engine menu data.
   Nothing here needs editing day to day — that all lives in data.js.
   ===================================================================== */
(function () {
  "use strict";

  const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const LANG_KEY = "bdc-lang";
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  /* ---------- Language ---------- */
  let lang = pickLanguage();

  function pickLanguage() {
    try {
      const fromUrl = new URLSearchParams(location.search).get("lang");
      if (fromUrl === "es" || fromUrl === "en") return fromUrl;
      const saved = localStorage.getItem(LANG_KEY);
      if (saved === "es" || saved === "en") return saved;
    } catch (e) { /* private mode etc. */ }
    const nav = (navigator.language || "").toLowerCase();
    return nav.startsWith("es") ? "es" : "en";
  }

  function t(key, vars) {
    const table = I18N[lang] || I18N.en;
    let s = table[key] != null ? table[key] : (I18N.en[key] != null ? I18N.en[key] : key);
    if (vars) Object.keys(vars).forEach(k => { s = s.split("{" + k + "}").join(vars[k]); });
    return s;
  }
  const L = obj => (obj && typeof obj === "object") ? (obj[lang] != null ? obj[lang] : obj.en) : obj;

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  const money = p => (p == null ? t("price.ask") : "$" + Number(p).toFixed(2));

  function fmtTime(hhmm) {
    const [h, m] = hhmm.split(":").map(Number);
    const ampm = h >= 12 ? "PM" : "AM";
    const h12 = ((h + 11) % 12) + 1;
    return h12 + ":" + String(m).padStart(2, "0") + " " + ampm;
  }

  /* ---------- Hours & open/closed ---------- */
  function hoursFor(day) {
    if (Object.prototype.hasOwnProperty.call(SITE.exceptions, day)) return SITE.exceptions[day]; // null = closed
    return SITE.hours;
  }
  function nowPacific() {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Los_Angeles", weekday: "short", hour: "numeric", minute: "numeric", hour12: false,
    }).formatToParts(new Date());
    const get = type => (parts.find(p => p.type === type) || {}).value;
    return { day: get("weekday"), minutes: (parseInt(get("hour"), 10) % 24) * 60 + parseInt(get("minute"), 10) };
  }
  const toMin = hhmm => { const [h, m] = hhmm.split(":").map(Number); return h * 60 + m; };

  function updateStatus() {
    const el = $("#status"); if (!el) return;
    const now = nowPacific();
    const idx = DAYS.indexOf(now.day);
    const today = hoursFor(now.day);
    let text, state;
    if (today && now.minutes >= toMin(today.open) && now.minutes < toMin(today.close)) {
      text = t("status.openNow", { close: fmtTime(today.close) }); state = "open";
    } else if (today && now.minutes < toMin(today.open)) {
      text = t("status.opensToday", { open: fmtTime(today.open) }); state = "closed";
    } else {
      // find the next day that's open
      let n = 1, next = null;
      while (n <= 7) { const d = DAYS[(idx + n) % 7]; const h = hoursFor(d); if (h) { next = { d, h }; break; } n++; }
      if (!next) { text = t("visit.closed"); state = "closed"; }
      else if (n === 1) { text = t("status.opensTomorrow", { open: fmtTime(next.h.open) }); state = "closed"; }
      else { text = t("status.closedToday", { day: t("visit.days." + next.d), open: fmtTime(next.h.open) }); state = "closed"; }
    }
    el.classList.toggle("is-open", state === "open");
    el.classList.toggle("is-closed", state !== "open");
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
    const f = $("#footerHours");
    if (f) f.textContent = t("status.hoursDaily", { open: fmtTime(SITE.hours.open), close: fmtTime(SITE.hours.close) });
  }

  /* ---------- Static strings & links ---------- */
  function applyStatic() {
    document.documentElement.lang = lang;
    document.title = t("meta.title");
    $$("[data-i18n]").forEach(el => { el.textContent = t(el.getAttribute("data-i18n")); });
    const toggle = $("#langToggle");
    if (toggle) toggle.setAttribute("aria-label", t("lang.switchLabel"));
    const map = $("#map"); if (map) map.title = t("visit.mapTitle");
    const rights = $("#footerRights"); if (rights) rights.textContent = t("footer.rights", { year: new Date().getFullYear() });
    const upd = $("#menuUpdated"); if (upd) upd.textContent = t("menu.updated", { date: L(SITE.menuUpdated) });
    const notice = $("#notice");
    if (notice) { const n = L(SITE.notice); notice.hidden = !n; notice.textContent = n || ""; }
  }
  function applyLinks() {
    $$("[data-link]").forEach(a => { const href = SITE.links[a.getAttribute("data-link")]; if (href) a.href = href; });
    $$('a[href^="tel:"]').forEach(a => { a.href = "tel:" + SITE.phoneHref; });
  }

  /* ---------- Photos ---------- */
  function applyPhotos() {
    $$("[data-photo]").forEach(fig => {
      const key = fig.getAttribute("data-photo");
      const src = SITE.photos[key];
      const old = $("img", fig); if (old) old.remove();
      fig.classList.toggle("has-photo", !!src);
      if (!src) return;
      const img = document.createElement("img");
      img.src = src; img.loading = key === "hero" ? "eager" : "lazy"; img.decoding = "async";
      const alt = SITE.photoAlt && SITE.photoAlt[key];
      img.alt = alt ? L(alt) : SITE.displayName;
      fig.appendChild(img);
    });
  }

  /* ---------- Ratings, reviews, events, story ---------- */
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
    ul.innerHTML = REVIEWS.map(r =>
      '<li class="review"><div class="review__stars" aria-hidden="true">★★★★★</div><p class="review__quote">' + esc(L(r.quote)) + '</p><div class="review__source">' + esc(r.source) + "</div></li>"
    ).join("");
  }
  function renderEvents() {
    const ul = $("#events"); if (!ul) return;
    ul.innerHTML = EVENTS.map(e =>
      '<li class="event"><p class="event__when">' + esc(L(e.when)) + '</p><h3 class="event__name">' + esc(L(e.name)) + '</h3><p class="event__desc">' + esc(L(e.desc)) + "</p></li>"
    ).join("");
  }
  function renderStory() {
    const ps = $("#storyParagraphs"); if (ps) ps.innerHTML = STORY.paragraphs.map(p => "<p>" + esc(L(p)) + "</p>").join("");
    const ow = $("#owners"); if (ow) ow.innerHTML = STORY.owners.map(o => '<div class="owner"><div class="owner__name">' + esc(o.name) + '</div><div class="owner__role">' + esc(L(o.role)) + "</div></div>").join("");
    const qs = $("#storyQuotes"); if (qs) qs.innerHTML = STORY.quotes.map(q => '<blockquote class="quote"><p>' + esc(L(q.text)) + "</p><cite>— " + esc(q.who) + "</cite></blockquote>").join("");
  }

  /* ---------- Signature dishes ---------- */
  function renderSignatures() {
    const grid = $("#signatures"); if (!grid) return;
    grid.innerHTML = SIGNATURES.map(s => {
      const badge = s.badge ? '<span class="badge sig__badge">' + esc(L(s.badge)) + "</span>" : "";
      return '<article class="sig">' +
        '<figure class="photo" data-photo="' + esc(s.photo) + '">' + badge + '<svg class="photo__art" aria-hidden="true"><use href="#art-' + esc(s.art) + '"/></svg></figure>' +
        '<div class="sig__body"><div class="sig__top"><h3 class="sig__name">' + esc(L(s.name)) + '</h3><span class="sig__price">' + esc(money(s.price)) + "</span></div>" +
        '<p class="sig__blurb">' + esc(L(s.blurb)) + "</p></div></article>";
    }).join("");
  }

  /* ---------- Menu ---------- */
  function renderMenu() {
    const chips = $("#menuChips"), wrap = $("#menuSections"); if (!wrap) return;
    if (chips) chips.innerHTML = MENU.map(c => '<a href="#menu-' + esc(c.id) + '">' + esc(L(c.name)) + "</a>").join("");
    wrap.innerHTML = MENU.map(c => {
      const cls = "menu-cat" + (c.compact ? " menu-cat--compact" : "") + ((c.wide || c.compact) ? " menu-cat--wide" : "");
      const note = c.note && L(c.note) ? '<p class="menu-cat__note">' + esc(L(c.note)) + "</p>" : "";
      const items = c.items.map(it => {
        const desc = it.desc && L(it.desc) ? '<p class="menu-item__desc">' + esc(L(it.desc)) + "</p>" : "";
        const tags = (it.tags || []).length ? '<div class="menu-item__tags">' + it.tags.map(tag => '<span class="tag tag--' + esc(tag) + '">' + esc(t("tag." + tag)) + "</span>").join("") + "</div>" : "";
        const row = '<div class="menu-item__row"><span class="menu-item__name">' + esc(L(it.name)) + '</span><span class="menu-item__leader" aria-hidden="true"></span><span class="menu-item__price">' + esc(money(it.price)) + "</span></div>";
        if (it.photo) {
          return '<li class="menu-item menu-item--photo"><div class="menu-item__text">' + row + desc + tags + '</div><img class="menu-item__photo" src="' + esc(it.photo) + '" alt="' + esc(L(it.name)) + '" loading="lazy" decoding="async" width="84" height="84" /></li>';
        }
        return '<li class="menu-item">' + row + desc + tags + "</li>";
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
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        links.forEach(a => a.classList.toggle("is-active", a.getAttribute("href") === "#" + en.target.id));
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    $$(".menu-cat").forEach(s => chipObserver.observe(s));
  }

  /* ---------- Search-engine menu data (built from data.js) ---------- */
  function injectMenuSchema() {
    const old = $("#menuSchema"); if (old) old.remove();
    const data = {
      "@context": "https://schema.org", "@type": "Menu", "@id": SITE.url + "#menu",
      "name": SITE.name + " Menu", "inLanguage": "en",
      "hasMenuSection": MENU.map(c => ({
        "@type": "MenuSection", "name": c.name.en,
        "hasMenuItem": c.items.map(it => {
          const o = { "@type": "MenuItem", "name": it.name.en };
          if (it.desc && it.desc.en) o.description = it.desc.en;
          if (it.price != null) o.offers = { "@type": "Offer", "price": Number(it.price).toFixed(2), "priceCurrency": "USD" };
          return o;
        }),
      })),
    };
    const s = document.createElement("script"); s.type = "application/ld+json"; s.id = "menuSchema";
    s.textContent = JSON.stringify(data); document.head.appendChild(s);
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
      const d = Object.fromEntries(new FormData(form).entries());
      const msg = buildMessage(d);
      out.hidden = false; out.className = "form__result";
      if (SITE.cateringEndpoint) {
        try {
          const res = await fetch(SITE.cateringEndpoint, {
            method: "POST", headers: { "Accept": "application/json", "Content-Type": "application/json" },
            body: JSON.stringify(Object.assign({}, d, { message: msg, _subject: "Catering request — " + SITE.name + " website" })),
          });
          if (!res.ok) throw new Error("HTTP " + res.status);
          out.classList.add("is-ok"); out.textContent = t("form.thanks"); form.reset();
        } catch (err) {
          out.classList.add("is-error"); out.textContent = t("form.error");
        }
        out.scrollIntoView({ block: "nearest", behavior: "smooth" });
        return;
      }
      // No endpoint yet: hand the customer a ready-to-send text message.
      const sms = "sms:" + SITE.phoneHref + "?&body=" + encodeURIComponent(msg);
      out.innerHTML = "<h4>" + esc(t("form.fallbackTitle")) + "</h4><p>" + esc(t("form.fallbackBody")) + '</p><pre class="form__preview">' + esc(msg) + "</pre>" +
        '<a class="btn btn--primary btn--sm" href="' + esc(sms) + '">' + esc(t("form.text")) + "</a>" +
        '<a class="btn btn--ghost btn--sm" href="tel:' + esc(SITE.phoneHref) + '">' + esc(t("nav.call")) + " " + esc(SITE.phone) + "</a>" +
        '<button class="btn btn--ghost btn--sm" type="button" id="copyMsg">' + esc(t("form.copy")) + "</button>";
      const copy = $("#copyMsg", out);
      copy.addEventListener("click", async () => {
        try { await navigator.clipboard.writeText(msg); copy.textContent = t("form.copied"); } catch (e) { /* older browsers */ }
      });
      out.scrollIntoView({ block: "nearest", behavior: "smooth" });
    });
  }

  /* ---------- Nav ---------- */
  function setupNav() {
    const toggle = $("#navToggle"), links = $("#navLinks"); if (!toggle || !links) return;
    const close = () => { links.classList.remove("is-open"); toggle.setAttribute("aria-expanded", "false"); };
    toggle.addEventListener("click", () => {
      const open = !links.classList.contains("is-open");
      links.classList.toggle("is-open", open); toggle.setAttribute("aria-expanded", String(open));
    });
    links.addEventListener("click", e => { if (e.target.closest("a")) close(); });
    document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
    if ("IntersectionObserver" in window) {
      const navA = $$("a", links);
      const io = new IntersectionObserver(entries => {
        entries.forEach(en => { if (en.isIntersecting) navA.forEach(a => a.classList.toggle("is-active", a.getAttribute("href") === "#" + en.target.id)); });
      }, { rootMargin: "-35% 0px -60% 0px" });
      navA.forEach(a => { const s = $(a.getAttribute("href")); if (s) io.observe(s); });
    }
    const print = $("#printMenu"); if (print) print.addEventListener("click", () => window.print());
    const langBtn = $("#langToggle");
    if (langBtn) langBtn.addEventListener("click", () => {
      lang = lang === "es" ? "en" : "es";
      try { localStorage.setItem(LANG_KEY, lang); } catch (e) { /* ignore */ }
      renderAll();
    });
  }

  /* ---------- Go ---------- */
  function renderAll() {
    applyStatic(); applyLinks();
    renderRatings(); renderSignatures(); renderMenu(); renderHours(); renderEvents(); renderStory(); renderReviews();
    applyPhotos(); updateStatus();
  }
  renderAll();
  injectMenuSchema();
  setupForm();
  setupNav();
  setInterval(updateStatus, 60 * 1000);
})();
