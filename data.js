/* ============================================================
   data.js — THE ONLY FILE YOU NEED TO EDIT DAY TO DAY.
   Add products, change prices, swap photos, update the story.
   script.js reads all of this and builds the site. Don't edit
   script.js unless you're changing how the site *behaves*.
   ============================================================ */

/* ---------- 1. YOUR BRAND ---------- */
const BRAND = {
  name: "Uptown Cali",
  tagline: "Northern California / Hollister, CA",
  heroHeadline: "BUILT\nDIFFERENT",
  heroSub: "Signature script. Everyday black. Northern California streetwear with a point of view.",
  heroCta: "Explore the Collection",
  storyHeading: "Northern Cali Style.",
  story: [
    "Uptown Cali brings Northern California identity into graphic tees, fleece and headwear. Black, deep red and cream. Signature script and the UTC crest.",
    "Represented in Hollister. Built Different. Repped Forever.",
  ],
  stats: [],
  // Add only a verified, monitored public inbox and real social profiles.
  email: "",
  socials: [],
  shippingNote: "",
};

/* Store presentation. The original catalog and prices are retained.
   No inventory, textile specifications or measurements are assumed. */
const STOREFRONT = {
  featured: ["tee-heritage-script", "hoodie-utc-heavyweight", "cap-utc-crest"],
  previewNotice: "Collection preview · Ordering opens soon",
  imageNotice: "Design preview. Final fit, materials and finish will be confirmed before release.",
  shipping: "Shipping options and delivery estimates will be confirmed before ordering opens.",
  returns: "Return and exchange details will be available before ordering opens.",
};

/* Optional email integration. Leave blank until an owned endpoint is ready.
   POST JSON: {email, interest, consent:true}. Only {subscribed:true} after a
   successful save is treated as success. No visitor email is stored locally. */
const NEWSLETTER = { endpoint: "" };

/* ---------- 2. CHECKOUT ----------
   Keep demo mode until products, fulfillment and a payment provider are ready.
   Existing adapters are retained but have not been verified against live
   provider accounts. Read README-DEVELOPER.md before configuring them.

   mode: "demo"    — preview cart only; no payment or reservation.
   mode: "stripe"  — one Payment Link per product, quantity one per payment;
                     multiple lines require separate payments. The variant is
                     passed as client_reference_id, not enforced as inventory.
   mode: "shopify" — whole-cart handoff using mapped Shopify variant IDs.

   Provider prices, quantities and variants must be tested independently.
   Changing mode alone does not make this store ready to accept orders. */
const CHECKOUT = {
  mode: "demo", // Keep until the release checks in README-DEVELOPER.md are complete.
  shopifyDomain: "", // e.g. "uptown-cali.myshopify.com" — only for shopify mode
  currency: "$",
};

/* ---------- 3. PRODUCTS ----------
   Each product needs: id, name, price, and at least one size.

   The six tees below use artwork and visualizations from the lookbook. `image` is what shows on the card; `gallery` adds the
   extra angles as thumbnails on the product page.

   SIZES — for one-size items (hats, stickers, patches) use: sizes: ["One Size"]
   and the size picker hides itself automatically.

   PRICES — retained from the supplied export, not newly approved retail prices.
   Confirm all prices and product specifications before taking orders. */
const PRODUCTS = [
  {
    id: "tee-heritage-script",
    department: "Men",
    name: "Heritage Script Tee",
    category: "T-Shirts",
    price: 45,
    // Dark storefront model shots, matching the Bay Area Luxury treatment.
    // The former light-concrete versions are kept in images/ but unreferenced.
    image: "images/tee-heritage-script-model-front-dark.jpg",
    alt: "Model wearing the Uptown Cali Heritage Script Tee — front view",
    gallery: [
      "images/tee-heritage-script-front.jpg",
      "images/tee-heritage-script-back.jpg",
      { image: "images/tee-heritage-script-model-back-dark.jpg",
        alt: "Model wearing the Uptown Cali Heritage Script Tee — back view" },
    ],
    sizes: ["S", "M", "L", "XL", "2XL"],
    colors: ["Black"],
    description:
      "The signature red Uptown Cali script across the chest, with Northern Cali Style and the Est. MMXIV mark underneath. Clean script hit on the back over Discipline. Pressure. Results.",
    details: [
    ],
    badge: "Flagship",
    // Short print-detail clip shown under the gallery. To add one to another
    // product, drop the file in video/ and copy this block.
    video: {
      src: "video/heritage-script-print-detail.mp4",
      webm: "video/heritage-script-print-detail.webm",
      poster: "images/heritage-script-print-detail-poster.jpg",
      alt: "Close-up video of the red and cream Uptown Cali script print on the black Heritage Script Tee, lit by red storefront neon",
      caption: "Design detail preview — Heritage Script.",
    },
    buyUrl: "", // <-- paste this product's Stripe Payment Link here
    variantIds: {}, // shopify mode, e.g. { "M / Black": "4321567890" }
  },
  {
    id: "tee-utc-core",
    department: "Men",
    name: "UTC Core Tee",
    category: "T-Shirts",
    price: 45,
    image: "images/tee-utc-core-model-front-dark.jpg",
    alt: "Model wearing the Uptown Cali UTC Core Tee — front view",
    // Still no back-on-body shot for this one — the replacement package
    // supplied a front only, matching the gap noted earlier.
    gallery: [
      "images/tee-utc-core-front.jpg",
      "images/tee-utc-core-back.jpg",
    ],
    sizes: ["S", "M", "L", "XL", "2XL"],
    colors: ["Black"],
    description:
      "The UTC block mark front and centre, split by the red bars, over Uptown Cali and Northern Cali Brand. The core piece — the one that says it without saying much.",
    details: [
    ],
    badge: "",
    buyUrl: "", // <-- paste this product's Stripe Payment Link here
    variantIds: {},
  },
  {
    id: "tee-norcal-standard",
    department: "Men",
    name: "Nor Cal Standard Tee",
    category: "T-Shirts",
    price: 45,
    image: "images/tee-norcal-standard-model-front-dark.jpg",
    alt: "Model wearing the Uptown Cali Nor Cal Standard Tee — front view",
    gallery: [
      "images/tee-norcal-standard-front.jpg",
      "images/tee-norcal-standard-back.jpg",
      { image: "images/tee-norcal-standard-model-back-dark.jpg",
        alt: "Model wearing the Uptown Cali Nor Cal Standard Tee — back view" },
    ],
    sizes: ["S", "M", "L", "XL", "2XL"],
    colors: ["Black"],
    description:
      "Small Nor Cal chest hit up front, full Nor Cal Standard block across the back with the red rule and Discipline. Pressure. Results. Quiet from the front, loud from behind.",
    details: [
      "Small chest hit, large back print",
    ],
    badge: "",
    buyUrl: "", // <-- paste this product's Stripe Payment Link here
    variantIds: {},
  },
  {
    id: "tee-bay-area-luxury",
    department: "Men",
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
      "Full-width collegiate back print",
    ],
    badge: "New",
    buyUrl: "", // <-- paste this product's Stripe Payment Link here
    variantIds: {},
  },
  {
    id: "tee-heritage-varsity",
    department: "Men",
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
      "Two-colour script print, front and back",
    ],
    badge: "",
    buyUrl: "", // <-- paste this product's Stripe Payment Link here
    variantIds: {},
  },
  {
    id: "tee-collegiate-norcal",
    department: "Men",
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
      "Stacked collegiate front, full back print",
    ],
    badge: "",
    buyUrl: "", // <-- paste this product's Stripe Payment Link here
    variantIds: {},
  },

  {
    id: "hoodie-utc-heavyweight",
    department: "Men",
    name: "UTC Crest Hoodie",
    category: "Fleece",
    price: 85,
    image: "images/utc-heavyweight-hoodie.webp",
    alt: "Male model wearing a black Uptown Cali UTC heavyweight hoodie in front of a dark storefront with red neon lighting.",
    gallery: [],
    sizes: ["S", "M", "L", "XL", "2XL"],
    colors: ["Black", "Forest"],
    description:
      "The UTC crest at the chest and an Uptown Cali back graphic. A black pullover hoodie design in the signature palette.",
    details: [
    ],
    badge: "",
    buyUrl: "", // <-- paste this product's Stripe Payment Link here
    variantIds: {},
  },
  {
    id: "crew-monogram",
    department: "Men",
    name: "Monogram Crewneck",
    category: "Fleece",
    price: 70,
    image: "images/monogram-crewneck.webp",
    alt: "Male model wearing a black Uptown Cali monogram crewneck with tonal UTC pattern and red chest crest outside a moody storefront.",
    gallery: [],
    sizes: ["S", "M", "L", "XL", "2XL"],
    colors: ["Black", "Heather Grey"],
    description:
      "A crewneck design with tonal UTC monogram artwork and heritage flag stripes on the sleeve.",
    details: [
      "Tonal monogram print",
      "Flag stripe sleeve detail",
    ],
    badge: "",
    buyUrl: "", // <-- paste this product's Stripe Payment Link here
    variantIds: {},
  },
  {
    id: "cap-utc-crest",
    department: "Men",
    name: "UTC Crest Snapback",
    category: "Headwear",
    price: 38,
    image: "images/utc-crest-snapback.webp",
    alt: "Close-up of a black Uptown Cali snapback with a raised red UTC crest, worn with matching black hoodie in a red neon storefront setting.",
    gallery: [],
    sizes: ["One Size"],
    colors: ["Black", "Black / Red"],
    description:
      "A flat-brim snapback design with the UTC crest at the front and a heritage star at the side.",
    details: [
    ],
    badge: "",
    buyUrl: "", // <-- paste this product's Stripe Payment Link here
    variantIds: {},
  },
  {
    id: "sticker-heritage-pack",
    department: "Accessories",
    name: "Heritage Sticker Pack",
    category: "Stickers",
    price: 8,
    image: "images/heritage-sticker-pack.webp",
    alt: "Flat lay of Uptown Cali heritage sticker pack with UTC monogram, Cali outline, bear icon, red stars, and branded black packaging.",
    gallery: [],
    sizes: ["One Size"],
    colors: ["Pack of 5"],
    description:
      "A five-design sticker concept featuring the UTC crest, Cali bear, heritage star, flag stripes and Built Different script.",
    details: ["Five graphic designs", "Material and dimensions to be confirmed"],
    badge: "",
    buyUrl: "", // <-- paste this product's Stripe Payment Link here
    variantIds: {},
  },
  {
    id: "patch-cali-bear",
    department: "Accessories",
    name: "Cali Bear Patch",
    category: "Patches",
    price: 12,
    image: "images/cali-bear-patch.webp",
    alt: "Close-up of a premium embroidered Cali bear patch shaped like California with black, red, and white Uptown Cali branding.",
    gallery: [],
    sizes: ["One Size"],
    colors: ["Red / Black"],
    description:
      "A Cali bear patch design in red and black. Final dimensions and attachment method will be confirmed before release.",
    details: ["Cali bear artwork", "Red and black color direction"],
    badge: "",
    buyUrl: "", // <-- paste this product's Stripe Payment Link here
    variantIds: {},
  },

  /* ============================================================
     UPTOWN CALI WOMEN — NORCAL LIGHTS (concept capsule)

     These nine pieces are the women's collection, presented from the
     approved concept previews. They are NOT purchasable yet:
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
    image: "images/norcal-lights/07-golden-hour-triangle-night-model-front.webp",
    alt: "AI-generated concept model standing poolside at night in a black Uptown Cali triangle swim set with red-and-cream piping and UTC crests.",
    gallery: [
      { image: "images/norcal-lights/07-golden-hour-triangle-swim-set.webp", alt: "Standalone Golden Hour Triangle swimwear concept board with front and back views, two bottom styles and trim details." },
      { image: "images/norcal-lights/07-golden-hour-triangle-night-model-seated.webp", alt: "AI-generated concept model seated poolside at night in a black Uptown Cali triangle swim set with red-and-cream piping and UTC crests." },
    ],
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
    image: "images/norcal-lights/08-midnight-chrome-bandeau-night-model-front.webp",
    alt: "AI-generated concept model standing poolside at night in a red-and-black Uptown Cali bandeau swim set with a metal center clasp and branded underband.",
    gallery: [
      { image: "images/norcal-lights/08-midnight-chrome-bandeau-swim-set.webp", alt: "Standalone Midnight Chrome Bandeau swimwear concept board with front and back views and metal hardware details." },
      { image: "images/norcal-lights/08-midnight-chrome-bandeau-night-model-seated.webp", alt: "AI-generated concept model seated poolside at night in a red-and-black Uptown Cali bandeau swim set with a metal center clasp and branded underband." },
      { image: "images/norcal-lights/08-midnight-chrome-bandeau-night-model-side.webp", alt: "Side view of an AI-generated concept model wearing a red-and-black Uptown Cali bandeau swim set with a metal center clasp and branded underband beside a pool at night." },
    ],
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
    image: "images/norcal-lights/09-cali-sport-scoop-night-model-front.webp",
    alt: "AI-generated concept model standing poolside at night in a black Uptown Cali scoop swim set with red-and-cream trim and a branded underband.",
    gallery: [
      { image: "images/norcal-lights/09-cali-sport-scoop-swim-set.webp", alt: "Standalone Cali Sport Scoop swimwear concept board with front and back views, two bottom styles and trim details." },
      { image: "images/norcal-lights/09-cali-sport-scoop-night-model-seated.webp", alt: "AI-generated concept model seated poolside at night in a black Uptown Cali scoop swim set with red-and-cream trim and a branded underband." },
    ],
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

  /* Swim — owner-supplied AI model concept previews. */
  { group: "NorCal Lights — Swim", image: "images/norcal-lights/07-golden-hour-triangle-night-model-front.webp", caption: "Golden Hour Triangle Set", fit: "contain",
    alt: "AI-generated concept model standing poolside at night in a black Uptown Cali triangle swim set with red-and-cream piping and UTC crests." },
  { group: "NorCal Lights — Swim", image: "images/norcal-lights/08-midnight-chrome-bandeau-night-model-front.webp", caption: "Midnight Chrome Bandeau Set", fit: "contain",
    alt: "AI-generated concept model standing poolside at night in a red-and-black Uptown Cali bandeau swim set with a metal center clasp and branded underband." },
  { group: "NorCal Lights — Swim", image: "images/norcal-lights/09-cali-sport-scoop-night-model-front.webp", caption: "Cali Sport Scoop Set", fit: "contain",
    alt: "AI-generated concept model standing poolside at night in a black Uptown Cali scoop swim set with red-and-cream trim and a branded underband." },
];
