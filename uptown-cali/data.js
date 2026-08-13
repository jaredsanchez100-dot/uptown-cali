/* ============================================================
   data.js — THE ONLY FILE YOU NEED TO EDIT DAY TO DAY.
   Add products, change prices, swap photos, update the story.
   script.js reads all of this and builds the site. Don't edit
   script.js unless you're changing how the site *behaves*.
   ============================================================ */

/* ---------- 1. YOUR BRAND ---------- */
const BRAND = {
  name: "Uptown Cali",
  // Shown above the hero headline. Keep it under ~10 words.
  tagline: "Northern Cali Style ★ Est. MMXIV",
  // The big hero headline. Short and loud reads best.
  // The \n forces a line break.
  heroHeadline: "BUILT\nDIFFERENT",
  heroSub:
    "Heavyweight tees out of Northern California. Bay Area born, Uptown raised. Discipline. Pressure. Results.",
  heroCta: "Shop the Drop",

  // About section
  storyHeading: "The Uptown Mentality",
  story: [
    "Uptown Cali represents the grind, the culture, and the legacy of Northern California — rooted in the streets and built different.",
    "Discipline. Pressure. Results. We don't follow trends, we set them. Every piece is cut heavy, printed clean, and made to outlive the season it dropped in.",
    // TODO — replace this with your real origin story: where it started,
    // who started it, why. Customers read this part.
    "Tell your story here — where the brand started, and what it means to rep your city.",
  ],
  // Optional little stat row under the story. Delete the array to hide it.
  stats: [
    { num: "MMXIV", label: "Established" },
    { num: "280", label: "GSM Heavyweight" },
    { num: "NOR CAL", label: "Designed in" },
  ],

  // TODO — swap in your real email and social links.
  email: "hello@uptowncali.com",
  socials: [
    { label: "Instagram", url: "#" },
    { label: "TikTok", url: "#" },
  ],

  // Shown in the footer. Free shipping threshold, returns, etc.
  shippingNote: "Free shipping on orders over $100. Rep your city.",
};

/* ---------- 2. CHECKOUT ----------
   mode: "demo"    — cart works, checkout shows a friendly placeholder.
                     Use this before you're ready to take money.
   mode: "stripe"  — each variant carries a Stripe Payment Link (`buyUrl`).
   mode: "shopify" — each variant carries a Shopify `variantId`; the cart
                     hands off to a Shopify cart permalink with everything in it.
   See README.md for how to switch this on. */
const CHECKOUT = {
  mode: "demo",
  shopifyDomain: "", // e.g. "uptown-cali.myshopify.com" — only for shopify mode
  currency: "$",
};

/* ---------- 3. PRODUCTS ----------
   Each product needs: id, name, price, and at least one size.

   The six tees below are the concepts from your lookbook, with the real
   photos wired in. `image` is what shows on the card; `gallery` adds the
   extra angles as thumbnails on the product page.

   SIZES — for one-size items (hats, stickers, patches) use: sizes: ["One Size"]
   and the size picker hides itself automatically.

   PRICES — the tees follow the $45–48 band we agreed. Check them against what
   you're actually charging before you go live. */
const PRODUCTS = [
  {
    id: "tee-heritage-script",
    name: "Heritage Script Tee",
    category: "T-Shirts",
    price: 45,
    image: "images/tee-heritage-script-model-front.jpg",
    gallery: [
      "images/tee-heritage-script-front.jpg",
      "images/tee-heritage-script-back.jpg",
      "images/tee-heritage-script-model-back.jpg",
    ],
    sizes: ["S", "M", "L", "XL", "2XL"],
    colors: ["Black"],
    description:
      "The signature red Uptown Cali script across the chest, with Northern Cali Style and the Est. MMXIV mark underneath. Clean script hit on the back over Discipline. Pressure. Results.",
    details: [
      "280 GSM premium heavyweight cotton",
      "Ribbed collar, twin needle stitching",
      "Screen printed front and back",
      "Relaxed fit — size down for a regular fit",
    ],
    badge: "Flagship",
    buyUrl: "", // stripe mode
    variantIds: {}, // shopify mode, e.g. { "M / Black": "4321567890" }
  },
  {
    id: "tee-utc-core",
    name: "UTC Core Tee",
    category: "T-Shirts",
    price: 45,
    image: "images/tee-utc-core-model-front.jpg",
    // Your lookbook's "model back" shot for this concept was a duplicate of the
    // Nor Cal Standard one, so it's left out. Add a real back-on-body shot here
    // when you have one: "images/tee-utc-core-model-back.jpg".
    gallery: [
      "images/tee-utc-core-front.jpg",
      "images/tee-utc-core-back.jpg",
    ],
    sizes: ["S", "M", "L", "XL", "2XL"],
    colors: ["Black"],
    description:
      "The UTC block mark front and centre, split by the red bars, over Uptown Cali and Northern Cali Brand. The core piece — the one that says it without saying much.",
    details: [
      "280 GSM premium heavyweight cotton",
      "Ribbed collar, twin needle stitching",
      "Screen printed front and back",
      "Relaxed fit — size down for a regular fit",
    ],
    badge: "",
    buyUrl: "",
    variantIds: {},
  },
  {
    id: "tee-norcal-standard",
    name: "Nor Cal Standard Tee",
    category: "T-Shirts",
    price: 45,
    image: "images/tee-norcal-standard-model-front.jpg",
    gallery: [
      "images/tee-norcal-standard-front.jpg",
      "images/tee-norcal-standard-back.jpg",
      "images/tee-norcal-standard-model-back.jpg",
    ],
    sizes: ["S", "M", "L", "XL", "2XL"],
    colors: ["Black"],
    description:
      "Small Nor Cal chest hit up front, full Nor Cal Standard block across the back with the red rule and Discipline. Pressure. Results. Quiet from the front, loud from behind.",
    details: [
      "280 GSM premium heavyweight cotton",
      "Ribbed collar, twin needle stitching",
      "Small chest hit, large back print",
      "Relaxed fit — size down for a regular fit",
    ],
    badge: "",
    buyUrl: "",
    variantIds: {},
  },
  {
    id: "tee-bay-area-luxury",
    name: "Bay Area Luxury Tee",
    category: "T-Shirts",
    price: 48,
    image: "images/tee-bay-area-luxury-model-front.jpg",
    gallery: [
      "images/tee-bay-area-luxury-front.jpg",
      "images/tee-bay-area-luxury-back.jpg",
      "images/tee-bay-area-luxury-model-back.jpg",
    ],
    sizes: ["S", "M", "L", "XL", "2XL"],
    colors: ["Black"],
    description:
      "Collegiate Nor Cal Standard arch front and back, finished with Northern California and the Bay Area Luxury bar. The heaviest graphic in the drop.",
    details: [
      "280 GSM premium heavyweight cotton",
      "Ribbed collar, twin needle stitching",
      "Full-width collegiate back print",
      "Relaxed fit — size down for a regular fit",
    ],
    badge: "New",
    buyUrl: "",
    variantIds: {},
  },
  {
    id: "tee-heritage-varsity",
    name: "Heritage Script Varsity Tee",
    category: "T-Shirts",
    price: 48,
    image: "images/tee-heritage-varsity-model-front.jpg",
    gallery: [
      "images/tee-heritage-varsity-front.jpg",
      "images/tee-heritage-varsity-back.jpg",
      "images/tee-heritage-varsity-model-back.jpg",
    ],
    sizes: ["S", "M", "L", "XL", "2XL"],
    colors: ["Black"],
    description:
      "The Uptown script with the red underline sweep, Northern Cali Style beneath. Back carries the full Northern Cali / Uptown Cali Style lockup over Nor Cal Brand.",
    details: [
      "280 GSM premium heavyweight cotton",
      "Ribbed collar, twin needle stitching",
      "Two-colour script print, front and back",
      "Relaxed fit — size down for a regular fit",
    ],
    badge: "",
    buyUrl: "",
    variantIds: {},
  },
  {
    id: "tee-collegiate-norcal",
    name: "Collegiate Nor Cal Tee",
    category: "T-Shirts",
    price: 48,
    image: "images/tee-collegiate-norcal-model-front.jpg",
    gallery: [
      "images/tee-collegiate-norcal-front.jpg",
      "images/tee-collegiate-norcal-back.jpg",
      "images/tee-collegiate-norcal-model-back.jpg",
    ],
    sizes: ["S", "M", "L", "XL", "2XL"],
    colors: ["Black"],
    description:
      "UPTOWN over the UTC monogram over CALI, stacked collegiate. The back runs Nor Cal Brand with the Bay Area Born & Raised bar and the crest underneath.",
    details: [
      "280 GSM premium heavyweight cotton",
      "Ribbed collar, twin needle stitching",
      "Stacked collegiate front, full back print",
      "Relaxed fit — size down for a regular fit",
    ],
    badge: "",
    buyUrl: "",
    variantIds: {},
  },

  /* ---- Everything below is still waiting on photos. Each one draws a styled
     placeholder tile until you set `image`, same as the tees did before. ---- */
  {
    id: "hoodie-utc-heavyweight",
    name: "UTC Heavyweight Hoodie",
    category: "Fleece",
    price: 85,
    image: "",
    gallery: [],
    // Placeholder look, ignored once you add a real image.
    placeholder: { emoji: "★", tint: "linear-gradient(150deg,#1b3d34,#0b0b0b 68%)" },
    sizes: ["S", "M", "L", "XL", "2XL"],
    colors: ["Black", "Forest"],
    description:
      "Brushed heavyweight fleece with a double-lined hood, embroidered UTC crest on the chest and the arched Uptown Cali back hit. Cut roomy on purpose.",
    details: [
      "400 GSM brushed cotton fleece",
      "Double-lined hood, ribbed cuffs and hem",
      "Embroidered chest crest",
      "Unisex, relaxed fit",
    ],
    badge: "",
    buyUrl: "",
    variantIds: {},
  },
  {
    id: "crew-monogram",
    name: "Monogram Crewneck",
    category: "Fleece",
    price: 70,
    image: "",
    gallery: [],
    placeholder: { emoji: "UTC", tint: "linear-gradient(150deg,#241010,#0b0b0b 70%)" },
    sizes: ["S", "M", "L", "XL", "2XL"],
    colors: ["Black", "Heather Grey"],
    description:
      "Classic fleece crewneck with the tonal UTC monogram print and heritage flag stripes on the sleeve. The one you reach for when it drops below sixty.",
    details: [
      "380 GSM cotton blend fleece",
      "Tonal monogram print",
      "Flag stripe sleeve detail",
      "Ribbed collar, cuffs and hem",
    ],
    badge: "",
    buyUrl: "",
    variantIds: {},
  },
  {
    id: "cap-utc-crest",
    name: "UTC Crest Snapback",
    category: "Headwear",
    price: 38,
    image: "",
    gallery: [],
    placeholder: { emoji: "★", tint: "linear-gradient(150deg,#1a1a1a,#0b0b0b 70%)" },
    sizes: ["One Size"],
    colors: ["Black", "Black / Red"],
    description:
      "Structured 6-panel snapback with the embroidered UTC crest on the front and a heritage star on the side. Flat brim, adjustable snap back.",
    details: [
      "Structured cotton twill, flat brim",
      "3D embroidered UTC crest",
      "Adjustable snapback closure",
    ],
    badge: "",
    buyUrl: "",
    variantIds: {},
  },
  {
    id: "sticker-heritage-pack",
    name: "Heritage Sticker Pack",
    category: "Accessories",
    price: 8,
    image: "",
    gallery: [],
    placeholder: { emoji: "✦", tint: "linear-gradient(150deg,#2a0d0d,#141414 72%)" },
    sizes: ["One Size"],
    colors: ["Pack of 5"],
    description:
      "Five weatherproof die-cut stickers — UTC crest, Cali bear, heritage star, flag stripes and the Built Different script. For the laptop, the whip, the toolbox.",
    details: ["5 die-cut vinyl stickers", "Weatherproof, UV resistant", "2–4 in across"],
    badge: "",
    buyUrl: "",
    variantIds: {},
  },
  {
    id: "patch-cali-bear",
    name: "Cali Bear Patch",
    category: "Accessories",
    price: 12,
    image: "",
    gallery: [],
    placeholder: { emoji: "✷", tint: "linear-gradient(150deg,#0f2a22,#141414 72%)" },
    sizes: ["One Size"],
    colors: ["Red / Black"],
    description:
      "Woven Cali bear patch with a merrowed border and iron-on backing. Put it on the denim jacket, the tote, the hat — wherever it needs to go.",
    details: ["Woven patch, merrowed border", "Iron-on backing", "3 in wide"],
    badge: "",
    buyUrl: "",
    variantIds: {},
  },
];

/* ---------- 4. LOOKBOOK ----------
   The vibe shots, pulled from your lookbook. Clicking one opens it full size.
   Delete the whole array to remove the lookbook section from the site. */
const LOOKBOOK = [
  { image: "images/look-rep-your-city.jpg", caption: "Rep Your City" },
  { image: "images/look-bay-area.jpg", caption: "Bay Area Born" },
  { image: "images/look-norcal-brand.jpg", caption: "Nor Cal Brand" },
  { image: "images/look-uptown-raised.jpg", caption: "Uptown Raised" },
  { image: "images/look-norcal-nights.jpg", caption: "Nor Cal Nights" },
  { image: "images/look-built-different.jpg", caption: "Built Different" },
];
