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

   >>> GOING LIVE WITH STRIPE — READ THIS <<<

   Everything is wired for Stripe already. The ONE thing missing is your
   Payment Links, which only you can create because they live in your Stripe
   account. Here's the whole job:

     1. Stripe Dashboard -> Product catalogue -> + Add product
     2. Name it and set the price (match the prices below).
     3. On the product, click "Create payment link".
     4. Copy the link — it looks like https://buy.stripe.com/aEU00i2Ck9Xy4qkcMM
     5. Paste it into that product's `buyUrl` field further down this file.
     6. Come back up here and change mode from "demo" to "stripe".

   That last step is deliberately last. Until the links exist, "stripe" mode
   gives shoppers a checkout that can't complete, which is worse than an honest
   demo banner. Flip it once the buyUrl fields are filled in.

   ONE LINK PER PRODUCT, NOT PER SIZE. A Payment Link can't tell which size was
   picked, so when the shopper hits Pay the site appends their size and colour
   to the URL as Stripe's `client_reference_id` — it shows up on the payment in
   your dashboard, so you know what to ship. Belt and braces: in the Payment
   Link settings also switch on a required custom field called "Size". Then the
   buyer states it too, and the two should agree.

   mode: "demo"    — cart works, checkout says no payment is taken.
   mode: "stripe"  — each product pays through its own Payment Link (`buyUrl`).
   mode: "shopify" — cart hands off to a Shopify cart permalink. See README. */
const CHECKOUT = {
  mode: "demo", // <-- change to "stripe" once the buyUrl fields below are filled
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
    image: "images/tee-heritage-script-card.jpg",
    gallery: [
      "images/tee-heritage-script-model-front.jpg",
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
    buyUrl: "", // <-- paste this product's Stripe Payment Link here
    variantIds: {}, // shopify mode, e.g. { "M / Black": "4321567890" }
  },
  {
    id: "tee-utc-core",
    name: "UTC Core Tee",
    category: "T-Shirts",
    price: 45,
    image: "images/tee-utc-core-card.jpg",
    // Your lookbook's "model back" shot for this concept was a duplicate of the
    // Nor Cal Standard one, so it's left out. Add a real back-on-body shot here
    // when you have one: "images/tee-utc-core-model-back.jpg".
    gallery: [
      "images/tee-utc-core-model-front.jpg",
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
    buyUrl: "", // <-- paste this product's Stripe Payment Link here
    variantIds: {},
  },
  {
    id: "tee-norcal-standard",
    name: "Nor Cal Standard Tee",
    category: "T-Shirts",
    price: 45,
    image: "images/tee-norcal-standard-card.jpg",
    gallery: [
      "images/tee-norcal-standard-model-front.jpg",
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
    buyUrl: "", // <-- paste this product's Stripe Payment Link here
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
    buyUrl: "", // <-- paste this product's Stripe Payment Link here
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
    buyUrl: "", // <-- paste this product's Stripe Payment Link here
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
    buyUrl: "", // <-- paste this product's Stripe Payment Link here
    variantIds: {},
  },

  {
    id: "hoodie-utc-heavyweight",
    name: "UTC Heavyweight Hoodie",
    category: "Fleece",
    price: 85,
    image: "images/utc-heavyweight-hoodie.webp",
    alt: "Male model wearing a black Uptown Cali UTC heavyweight hoodie in front of a dark storefront with red neon lighting.",
    gallery: [],
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
    buyUrl: "", // <-- paste this product's Stripe Payment Link here
    variantIds: {},
  },
  {
    id: "crew-monogram",
    name: "Monogram Crewneck",
    category: "Fleece",
    price: 70,
    image: "images/monogram-crewneck.webp",
    alt: "Male model wearing a black Uptown Cali monogram crewneck with tonal UTC pattern and red chest crest outside a moody storefront.",
    gallery: [],
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
    buyUrl: "", // <-- paste this product's Stripe Payment Link here
    variantIds: {},
  },
  {
    id: "cap-utc-crest",
    name: "UTC Crest Snapback",
    category: "Headwear",
    price: 38,
    image: "images/utc-crest-snapback.webp",
    alt: "Close-up of a black Uptown Cali snapback with a raised red UTC crest, worn with matching black hoodie in a red neon storefront setting.",
    gallery: [],
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
    buyUrl: "", // <-- paste this product's Stripe Payment Link here
    variantIds: {},
  },
  {
    id: "sticker-heritage-pack",
    name: "Heritage Sticker Pack",
    category: "Accessories",
    price: 8,
    image: "images/heritage-sticker-pack.webp",
    alt: "Flat lay of Uptown Cali heritage sticker pack with UTC monogram, Cali outline, bear icon, red stars, and branded black packaging.",
    gallery: [],
    sizes: ["One Size"],
    colors: ["Pack of 5"],
    description:
      "Five weatherproof die-cut stickers — UTC crest, Cali bear, heritage star, flag stripes and the Built Different script. For the laptop, the whip, the toolbox.",
    details: ["5 die-cut vinyl stickers", "Weatherproof, UV resistant", "2–4 in across"],
    badge: "",
    buyUrl: "", // <-- paste this product's Stripe Payment Link here
    variantIds: {},
  },
  {
    id: "patch-cali-bear",
    name: "Cali Bear Patch",
    category: "Accessories",
    price: 12,
    image: "images/cali-bear-patch.webp",
    alt: "Close-up of a premium embroidered Cali bear patch shaped like California with black, red, and white Uptown Cali branding.",
    gallery: [],
    sizes: ["One Size"],
    colors: ["Red / Black"],
    description:
      "Woven Cali bear patch with a merrowed border and iron-on backing. Put it on the denim jacket, the tote, the hat — wherever it needs to go.",
    details: ["Woven patch, merrowed border", "Iron-on backing", "3 in wide"],
    badge: "",
    buyUrl: "", // <-- paste this product's Stripe Payment Link here
    variantIds: {},
  },

  /* ============================================================
     UPTOWN CALI WOMEN — NORCAL LIGHTS (concept capsule)

     These ten pieces are the women's collection, presented from the
     approved concept boards. They are NOT purchasable yet:
     `comingSoon: true` disables Add to Cart and labels the card, and
     the engine refuses to cart them even if something slips through.
     When manufacturing and checkout are confirmed, flip comingSoon to
     false, add real product photos, and fill in buyUrl like the rest.

     Extra fields this capsule introduces (all optional elsewhere):
       department  — "Women"; powers the Women filter and nav link
       collection  — "NorCal Lights"; powers the collection page/filter
       tags        — extra type matches beyond `category` (e.g. a denim
                     set that should also surface under Sets)
       comingSoon  — concept status; blocks purchase, shows the badge
       priceFrom   — display "From $X" (sets with multiple pieces)
       fit         — "contain": show the full concept board uncropped
                     on cards and the product page
       sizeNote    — swim guidance shown on the product page
     ============================================================ */
  {
    id: "women-norcal-lights-baby-tee",
    name: "NorCal Lights Women's Baby Tee",
    category: "T-Shirts",
    department: "Women",
    collection: "NorCal Lights",
    comingSoon: true,
    fit: "contain",
    price: 42,
    image: "images/norcal-lights/01-norcal-lights-womens-baby-tee.jpg",
    alt: "Adult woman wearing a fitted black Uptown Cali baby tee beside front and back product views.",
    gallery: [],
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    colors: ["Black"],
    description:
      "Fitted black rib-cotton baby tee carrying the Uptown Cali collegiate wordmark and the Northern Cali Style signature. Same heavyweight attitude as the men's line, cut for her.",
    details: [
      "Women-specific fitted crop",
      "Rib-cotton construction direction",
      "Red-and-cream front graphic",
      "Premium-weight fabric planned",
    ],
    badge: "Concept — Coming Soon",
    buyUrl: "",
    variantIds: {},
  },
  {
    id: "women-structured-utc-corset-tank",
    name: "Structured UTC Corset Tank",
    category: "Tops",
    department: "Women",
    collection: "NorCal Lights",
    comingSoon: true,
    fit: "contain",
    price: 52,
    image: "images/norcal-lights/02-structured-utc-corset-tank.jpg",
    alt: "Adult woman wearing a structured black Uptown Cali corset-inspired tank beside front and back product views.",
    gallery: [],
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    colors: ["Black"],
    description:
      "Square-neck black rib-knit tank shaped with clean corset-inspired seams and a small embroidered UTC crest. Structure without costume.",
    details: [
      "Structured women's fit",
      "Wide straps, square neck",
      "Curved seam construction",
      "Embroidered UTC chest crest",
    ],
    badge: "Concept — Coming Soon",
    buyUrl: "",
    variantIds: {},
  },
  {
    id: "women-norcal-lights-cropped-zip-hoodie",
    name: "NorCal Lights Cropped Two-Way Zip Hoodie",
    category: "Fleece",
    department: "Women",
    collection: "NorCal Lights",
    comingSoon: true,
    fit: "contain",
    price: 88,
    image: "images/norcal-lights/03-norcal-lights-cropped-zip-hoodie.jpg",
    alt: "Adult woman wearing a washed-black Uptown Cali cropped zip hoodie beside front and back product views.",
    gallery: [],
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    colors: ["Washed Black"],
    description:
      "Washed-black heavyweight hoodie with a women-specific cropped body, two-way zipper and the large collegiate Uptown Cali back treatment.",
    details: [
      "Heavyweight cotton-fleece direction",
      "Two-way metal zipper",
      "Left-chest UTC embroidery",
      "Collegiate back graphic",
    ],
    badge: "Concept — Coming Soon",
    buyUrl: "",
    variantIds: {},
  },
  {
    id: "women-norcal-lights-velour-track-set",
    name: "NorCal Lights Velour Track Set",
    category: "Sets",
    tags: ["Fleece"],
    department: "Women",
    collection: "NorCal Lights",
    comingSoon: true,
    fit: "contain",
    price: 148,
    image: "images/norcal-lights/04-norcal-lights-velour-track-set.jpg",
    alt: "Front and back views of an adult woman wearing a black Uptown Cali velour track set with red piping.",
    gallery: [],
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    colors: ["Black / Red"],
    description:
      "Coordinated black velour set — cropped zip jacket and mid-rise flared pant — finished with red piping and embroidered UTC branding front and back.",
    details: [
      "Cropped zip jacket",
      "Mid-rise flared pants",
      "Red piping throughout",
      "UTC chest and hip embroidery",
      "Uptown Cali back embroidery",
    ],
    badge: "Concept — Coming Soon",
    buyUrl: "",
    variantIds: {},
  },
  {
    id: "women-uptown-14-mesh-jersey-dress",
    name: "Uptown No. 14 Mesh Jersey Dress",
    category: "Dresses",
    department: "Women",
    collection: "NorCal Lights",
    comingSoon: true,
    fit: "contain",
    price: 74,
    image: "images/norcal-lights/05-uptown-14-mesh-jersey-dress.jpg",
    alt: "Front and back views of an adult woman wearing a black Uptown Cali mesh jersey dress marked Cali 14.",
    gallery: [],
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    colors: ["Black"],
    description:
      "Black athletic mesh jersey dress with red-and-cream rib trim — UPTOWN across the front, CALI 14 on the back. Game-day energy, after-dark length.",
    details: [
      "Athletic mesh exterior",
      "Opaque lining planned",
      "Mid-thigh silhouette",
      "Varsity appliqué direction",
    ],
    badge: "Concept — Coming Soon",
    buyUrl: "",
    variantIds: {},
  },
  {
    id: "women-norcal-lights-washed-black-denim-set",
    name: "NorCal Lights Washed-Black Denim Set",
    category: "Denim",
    tags: ["Sets"],
    department: "Women",
    collection: "NorCal Lights",
    comingSoon: true,
    fit: "contain",
    price: 95,
    priceFrom: true,
    image: "images/norcal-lights/06-norcal-lights-washed-black-denim-set.jpg",
    alt: "Adult woman wearing an Uptown Cali washed-black denim jacket and wide-leg jeans beside product views and details.",
    gallery: [],
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    colors: ["Washed Black"],
    description:
      "Cropped washed-black denim jacket with coordinating relaxed wide-leg jeans and tonal UTC monogram detailing. The jacket and jeans may ultimately be sold separately.",
    details: [
      "Washed-black denim",
      "Tonal monogram panels",
      "UTC embroidery",
      "Gunmetal hardware",
      "Pieces may be sold separately",
    ],
    badge: "Concept — Coming Soon",
    buyUrl: "",
    variantIds: {},
  },
  {
    id: "women-golden-hour-triangle-swim-set",
    name: "Golden Hour Triangle Swim Set",
    category: "Swim",
    department: "Women",
    collection: "NorCal Lights",
    comingSoon: true,
    fit: "contain",
    price: 42,
    priceFrom: true,
    image: "images/norcal-lights/07-golden-hour-triangle-swim-set.jpg",
    alt: "Product board showing front and back views of a black Uptown Cali triangle swim top and two coordinating bottom styles.",
    gallery: [],
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    colors: ["Black"],
    sizeNote:
      "Swim tops and bottoms are planned to be sized separately, so you can mix sizes for the right fit.",
    description:
      "Black adjustable triangle swim set with red-and-cream piping, a UTC silicone crest and two planned bottom silhouettes — side-tie and classic mid-rise.",
    details: [
      "Adjustable triangle top",
      "Removable-cup direction",
      "Side-tie and mid-rise bottom concepts",
      "UTC silicone crest",
    ],
    badge: "Concept — Coming Soon",
    buyUrl: "",
    variantIds: {},
  },
  {
    id: "women-midnight-chrome-bandeau-swim-set",
    name: "Midnight Chrome Bandeau Swim Set",
    category: "Swim",
    department: "Women",
    collection: "NorCal Lights",
    comingSoon: true,
    fit: "contain",
    price: 46,
    priceFrom: true,
    image: "images/norcal-lights/08-midnight-chrome-bandeau-swim-set.jpg",
    alt: "Product board showing front and back views of a red-and-black Uptown Cali bandeau swim set and hardware details.",
    gallery: [],
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    colors: ["Deep Red / Black"],
    sizeNote:
      "Swim tops and bottoms are planned to be sized separately, so you can mix sizes for the right fit.",
    description:
      "Deep-red and black bandeau set with restrained gunmetal hardware and Uptown Cali jacquard branding. Chrome, not chintz.",
    details: [
      "Removable halter-strap concept",
      "Internal-support direction",
      "Gunmetal center hardware",
      "UTC hip crest",
    ],
    badge: "Concept — Coming Soon",
    buyUrl: "",
    variantIds: {},
  },
  {
    id: "women-cali-sport-scoop-swim-set",
    name: "Cali Sport Scoop Swim Set",
    category: "Swim",
    department: "Women",
    collection: "NorCal Lights",
    comingSoon: true,
    fit: "contain",
    price: 48,
    priceFrom: true,
    image: "images/norcal-lights/09-cali-sport-scoop-swim-set.jpg",
    alt: "Product board showing front, side and back views of an athletic black Uptown Cali scoop swim set.",
    gallery: [],
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    colors: ["Black"],
    sizeNote:
      "Swim tops and bottoms are planned to be sized separately, so you can mix sizes for the right fit.",
    description:
      "Supportive athletic scoop swim top with wide straps, collegiate piping and a branded underband, with two planned bottom silhouettes.",
    details: [
      "Wide supportive straps",
      "Racer-inspired back",
      "Branded underband",
      "High-rise and mid-rise bottom concepts",
    ],
    badge: "Concept — Coming Soon",
    buyUrl: "",
    variantIds: {},
  },
  {
    id: "women-coast-after-dark-one-piece-cover-up-set",
    name: "Coast After Dark One-Piece & Cover-Up Set",
    category: "Swim",
    tags: ["Cover-Ups"],
    department: "Women",
    collection: "NorCal Lights",
    comingSoon: true,
    fit: "contain",
    price: 42,
    priceFrom: true,
    image: "images/norcal-lights/10-coast-after-dark-one-piece-cover-up-set.jpg",
    alt: "Product board showing an Uptown Cali black one-piece swim design, mesh cover-up and matching sarong.",
    gallery: [],
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    colors: ["Black / Red"],
    sizeNote:
      "Swim tops and bottoms are planned to be sized separately, so you can mix sizes for the right fit.",
    description:
      "Black square-neck one-piece with red contour panels and a UTC chest crest, paired with a fine black mesh long-sleeve cover-up and an optional matching sarong.",
    details: [
      "Square-neck one-piece direction",
      "UTC chest crest",
      "Fine mesh cover-up with upper-back graphic",
      "Optional mesh sarong",
    ],
    badge: "Concept — Coming Soon",
    buyUrl: "",
    variantIds: {},
  },
];

/* ---------- 4. LOOKBOOK ----------
   The vibe shots. Clicking one opens it full size. Entries with the same
   `group` render together under that label; entries without a group land
   in the first (men's) section. Delete the whole array to remove the
   lookbook section from the site. */
const LOOKBOOK = [
  { group: "Uptown Cali Men", image: "images/look-rep-your-city.jpg", caption: "Rep Your City" },
  { group: "Uptown Cali Men", image: "images/look-bay-area.jpg", caption: "Bay Area Born" },
  { group: "Uptown Cali Men", image: "images/look-norcal-brand.jpg", caption: "Nor Cal Brand" },
  { group: "Uptown Cali Men", image: "images/look-uptown-raised.jpg", caption: "Uptown Raised" },
  { group: "Uptown Cali Men", image: "images/look-norcal-nights.jpg", caption: "Nor Cal Nights" },
  { group: "Uptown Cali Men", image: "images/look-built-different.jpg", caption: "Built Different" },

  /* NorCal Lights — women's capsule concept boards. */
  { group: "NorCal Lights — Women", image: "images/norcal-lights/01-norcal-lights-womens-baby-tee.jpg", caption: "Baby Tee", fit: "contain",
    alt: "Adult woman wearing a fitted black Uptown Cali baby tee beside front and back product views." },
  { group: "NorCal Lights — Women", image: "images/norcal-lights/02-structured-utc-corset-tank.jpg", caption: "Structured UTC Corset Tank", fit: "contain",
    alt: "Adult woman wearing a structured black Uptown Cali corset-inspired tank beside front and back product views." },
  { group: "NorCal Lights — Women", image: "images/norcal-lights/03-norcal-lights-cropped-zip-hoodie.jpg", caption: "Cropped Two-Way Zip Hoodie", fit: "contain",
    alt: "Adult woman wearing a washed-black Uptown Cali cropped zip hoodie beside front and back product views." },
  { group: "NorCal Lights — Women", image: "images/norcal-lights/04-norcal-lights-velour-track-set.jpg", caption: "Velour Track Set", fit: "contain",
    alt: "Front and back views of an adult woman wearing a black Uptown Cali velour track set with red piping." },
  { group: "NorCal Lights — Women", image: "images/norcal-lights/05-uptown-14-mesh-jersey-dress.jpg", caption: "Uptown No. 14 Mesh Jersey Dress", fit: "contain",
    alt: "Front and back views of an adult woman wearing a black Uptown Cali mesh jersey dress marked Cali 14." },
  { group: "NorCal Lights — Women", image: "images/norcal-lights/06-norcal-lights-washed-black-denim-set.jpg", caption: "Washed-Black Denim Set", fit: "contain",
    alt: "Adult woman wearing an Uptown Cali washed-black denim jacket and wide-leg jeans beside product views and details." },

  /* Swim — product-only boards. */
  { group: "NorCal Lights — Swim", image: "images/norcal-lights/07-golden-hour-triangle-swim-set.jpg", caption: "Golden Hour Triangle Set", fit: "contain",
    alt: "Product board showing front and back views of a black Uptown Cali triangle swim top and two coordinating bottom styles." },
  { group: "NorCal Lights — Swim", image: "images/norcal-lights/08-midnight-chrome-bandeau-swim-set.jpg", caption: "Midnight Chrome Bandeau Set", fit: "contain",
    alt: "Product board showing front and back views of a red-and-black Uptown Cali bandeau swim set and hardware details." },
  { group: "NorCal Lights — Swim", image: "images/norcal-lights/09-cali-sport-scoop-swim-set.jpg", caption: "Cali Sport Scoop Set", fit: "contain",
    alt: "Product board showing front, side and back views of an athletic black Uptown Cali scoop swim set." },
  { group: "NorCal Lights — Swim", image: "images/norcal-lights/10-coast-after-dark-one-piece-cover-up-set.jpg", caption: "Coast After Dark One-Piece & Cover-Up", fit: "contain",
    alt: "Product board showing an Uptown Cali black one-piece swim design, mesh cover-up and matching sarong." },
];
