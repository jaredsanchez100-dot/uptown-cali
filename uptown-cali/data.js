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
  tagline: "Northern Cali Style ★ Est. 1.4.2014",
  // The big hero headline. Short and loud reads best.
  // The \n forces a line break.
  heroHeadline: "BUILT\nDIFFERENT",
  heroSub:
    "Heavyweight tees, fleece and headwear out of Northern California. Bay Area born, Uptown raised.",
  heroCta: "Shop the Drop",

  // About section
  storyHeading: "The Uptown Mentality",
  story: [
    "Uptown Cali represents the grind, the culture, and the legacy of Northern California — rooted in the streets and built different.",
    "We don't follow trends, we set them. Every piece is cut heavy, printed clean, and made to outlive the season it dropped in.",
    // TODO — replace this with your real origin story: where it started,
    // who started it, why. Customers read this part.
    "Tell your story here — where the brand started, and what it means to rep your city.",
  ],
  // Optional little stat row under the story. Delete the array to hide it.
  stats: [
    { num: "2014", label: "Est. 1.4" },
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

   PHOTOS — leave `image` empty ("") and a clean styled placeholder is drawn
   automatically, so the site looks finished before your shoot is done.
   When photos are ready, drop the files in images/ and set:
       image: "images/built-different-tee-front.jpg"
   Add more angles with `gallery: ["images/a.jpg", "images/b.jpg"]`.

   SIZES — for one-size items (hats, stickers, patches) use: sizes: ["One Size"]
   and the size picker hides itself automatically. */
const PRODUCTS = [
  {
    id: "tee-built-different",
    name: "Built Different Tee",
    category: "T-Shirts",
    price: 45,
    image: "",
    gallery: [],
    // Placeholder look, ignored once you add a real image.
    placeholder: { emoji: "★", tint: "linear-gradient(150deg,#2a0d0d,#0b0b0b 62%)" },
    sizes: ["S", "M", "L", "XL", "2XL"],
    colors: ["Vintage Black"],
    description:
      "Oversized heavyweight tee with the arched Uptown Cali front hit and the full Built Different back graphic. Vintage wash finish — it arrives already broken in.",
    details: [
      "Premium heavyweight cotton, vintage wash",
      "Oversized fit — size down for a regular fit",
      "Screen printed front, back and sleeve stripes",
      "Woven hem label & UTC sleeve patch",
    ],
    badge: "Flagship",
    buyUrl: "", // stripe mode
    variantIds: {}, // shopify mode, e.g. { "M / Vintage Black": "4321567890" }
  },
  {
    id: "tee-new-drip",
    name: "The New Drip Monogram Tee",
    category: "T-Shirts",
    price: 48,
    image: "",
    gallery: [],
    placeholder: { emoji: "UTC", tint: "linear-gradient(150deg,#161616,#0b0b0b 70%)" },
    sizes: ["S", "M", "L", "XL", "2XL"],
    colors: ["Black / Red", "Black / Tonal"],
    description:
      "Tonal UTC monogram, stars and Cali bears fading up from the hem, with the embroidered New Drip script on the chest and the UTC crest across the back.",
    details: [
      "280 GSM 100% premium cotton",
      "Embroidered chest script, ribbed collar",
      "Tonal monogram fade print from hem",
      "Twin needle stitching throughout",
    ],
    badge: "New",
    buyUrl: "",
    variantIds: {},
  },
  {
    id: "tee-script-luxe",
    name: "Script Luxe Tee",
    category: "T-Shirts",
    price: 48,
    image: "",
    gallery: [],
    placeholder: { emoji: "✶", tint: "linear-gradient(150deg,#0f2a22,#0b0b0b 66%)" },
    sizes: ["S", "M", "L", "XL", "2XL"],
    colors: ["Black"],
    description:
      "Raised embroidered Uptown Cali script across the chest with a red Cali bear, over a tonal monogram body. Stacked UTC crest on the back. Built Different. Repped Forever.",
    details: [
      "270 GSM heavyweight cotton",
      "Raised embroidered script front",
      "Tonal UTC monogram body print",
      "Woven crest hem patch",
    ],
    badge: "",
    buyUrl: "",
    variantIds: {},
  },
  {
    id: "hoodie-utc-heavyweight",
    name: "UTC Heavyweight Hoodie",
    category: "Fleece",
    price: 85,
    image: "",
    gallery: [],
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
    badge: "Best Seller",
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
   The vibe shots. Leave `image` empty for a styled placeholder tile.
   Delete the whole array to remove the lookbook section from the site. */
const LOOKBOOK = [
  { image: "", caption: "Bay Area Born", tint: "linear-gradient(150deg,#2a0d0d,#0b0b0b 70%)" },
  { image: "", caption: "Uptown Raised", tint: "linear-gradient(150deg,#1b3d34,#0b0b0b 70%)" },
  { image: "", caption: "The New Drip", tint: "linear-gradient(150deg,#1a1a1a,#0b0b0b 70%)" },
  { image: "", caption: "Rep Your City", tint: "linear-gradient(150deg,#241010,#111 72%)" },
  { image: "", caption: "Nor Cal Nights", tint: "linear-gradient(150deg,#12261f,#0b0b0b 70%)" },
  { image: "", caption: "Built Different", tint: "linear-gradient(150deg,#3a1414,#0b0b0b 70%)" },
];
