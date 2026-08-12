/* ============================================================
   data.js — THE ONLY FILE YOU NEED TO EDIT DAY TO DAY.
   Add products, change prices, swap photos, update the story.
   script.js reads all of this and builds the site. Don't edit
   script.js unless you're changing how the site *behaves*.
   ============================================================ */

/* ---------- 1. YOUR BRAND ---------- */
const BRAND = {
  name: "BRAND NAME",
  // Shown under the logo in the hero. Keep it under ~10 words.
  tagline: "Your one-line promise",
  // The big hero headline. Short and loud reads best.
  heroHeadline: "HEADLINE\nGOES HERE",
  heroSub: "One or two sentences on what you make and who it's for.",
  heroCta: "Shop the Drop",

  // About section
  storyHeading: "Our Story",
  story: [
    "First paragraph — where the brand came from.",
    "Second paragraph — what it stands for now.",
  ],
  // Optional little stat row under the story. Delete the array to hide it.
  stats: [
    { num: "2024", label: "Founded" },
    { num: "100%", label: "Cotton" },
    { num: "LA", label: "Designed in" },
  ],

  email: "hello@yourbrand.com",
  socials: [
    { label: "Instagram", url: "#" },
    { label: "TikTok", url: "#" },
  ],

  // Shown in the footer. Free shipping threshold, returns, etc.
  shippingNote: "Free shipping on orders over $75.",
};

/* ---------- 2. CHECKOUT ----------
   mode: "demo"    — cart works, checkout shows a friendly placeholder.
                     Use this before you're ready to take money.
   mode: "stripe"  — each variant carries a Stripe Payment Link (`buyUrl`).
   mode: "shopify" — each variant carries a Shopify `variantId`; the cart
                     hands off to a Shopify cart permalink with everything in it.
   See references/checkout.md in the skill for how to get these values. */
const CHECKOUT = {
  mode: "demo",
  shopifyDomain: "", // e.g. "your-shop.myshopify.com" — only for shopify mode
  currency: "$",
};

/* ---------- 3. PRODUCTS ----------
   Each product needs: id, name, price, and at least one size.

   PHOTOS — leave `image` empty ("") and a clean styled placeholder is drawn
   automatically, so the site looks finished before your shoot is done.
   When photos are ready, drop the files in images/ and set:
       image: "images/hoodie-front.jpg"
   Add more angles with `gallery: ["images/a.jpg", "images/b.jpg"]`.

   SIZES — for one-size items (hats, stickers, prints) use: sizes: ["One Size"]
   and the size picker hides itself automatically. */
const PRODUCTS = [
  {
    id: "tee-classic",
    name: "Classic Logo Tee",
    category: "T-Shirts",
    price: 34,
    image: "",
    gallery: [],
    // Placeholder look, ignored once you add a real image.
    placeholder: { emoji: "👕", tint: "linear-gradient(135deg,#c96a3a,#5a2a12)" },
    sizes: ["S", "M", "L", "XL", "2XL"],
    colors: ["Black", "Bone"],
    description:
      "Midweight 100% cotton tee with a soft-hand screenprint. Boxy fit — size down for a slimmer look.",
    details: ["6.0 oz 100% cotton", "Screenprinted front", "Pre-shrunk"],
    badge: "", // e.g. "New" or "Last Chance" — shows a small tag on the card
    buyUrl: "", // stripe mode
    variantIds: {}, // shopify mode, e.g. { "M / Black": "4321567890" }
  },
  {
    id: "hoodie-heavy",
    name: "Heavyweight Hoodie",
    category: "Fleece",
    price: 78,
    image: "",
    gallery: [],
    placeholder: { emoji: "🧥", tint: "linear-gradient(135deg,#3f6b52,#16301f)" },
    sizes: ["S", "M", "L", "XL", "2XL"],
    colors: ["Forest", "Heather Grey"],
    description:
      "400gsm brushed fleece with a double-lined hood and ribbed cuffs. Built to outlive the season.",
    details: ["400gsm cotton blend", "Embroidered chest mark", "Unisex fit"],
    badge: "Best Seller",
    buyUrl: "",
    variantIds: {},
  },
  {
    id: "cap-6panel",
    name: "6-Panel Cap",
    category: "Headwear",
    price: 32,
    image: "",
    gallery: [],
    placeholder: { emoji: "🧢", tint: "linear-gradient(135deg,#8a6f3a,#3a2c12)" },
    sizes: ["One Size"],
    colors: ["Tan", "Black"],
    description: "Structured 6-panel with a curved brim and adjustable strap back.",
    details: ["Cotton twill", "Embroidered logo", "Adjustable"],
    badge: "",
    buyUrl: "",
    variantIds: {},
  },
];

/* ---------- 4. LOOKBOOK ----------
   The vibe shots. Leave `image` empty for a styled placeholder tile.
   Delete the whole array to remove the lookbook section from the site. */
const LOOKBOOK = [
  { image: "", caption: "Spring Set", tint: "linear-gradient(135deg,#c96a3a,#2a1408)" },
  { image: "", caption: "On the Block", tint: "linear-gradient(135deg,#3f6b52,#0f1f14)" },
  { image: "", caption: "Everyday Fit", tint: "linear-gradient(135deg,#8a6f3a,#241a08)" },
  { image: "", caption: "Night Run", tint: "linear-gradient(135deg,#4a4a6b,#14141f)" },
];
