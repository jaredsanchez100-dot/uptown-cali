/* =====================================================================
   Buenos Días Cafecito — site data

   This is the one file to edit day to day: hours, phone, links, the
   menu and prices, the photos, and the words in both languages.
   Everything here is plain JavaScript objects with English comments.
   Change a value, save, refresh the page — that's the whole workflow.
   ===================================================================== */

const SITE = {
  name: "Buenos Dias Cafecito",
  displayName: "Buenos Días Cafecito",
  legalName: "Buenos Dias Cafecito LLC",

  // Where the site will live once the domain is pointed at it. Used for
  // the canonical URL, link previews and the search-engine data.
  url: "https://buenosdiascafecito.com/",

  // THE PHONE NUMBER. Every tel: link, every printed number, the print menu,
  // the contact card and the search-engine data read these two lines.
  phone: "(831) 313-0810",      // how it should read on the page
  phoneHref: "+18313130810",    // digits only, with +1, for the tap-to-call links
  // The number the cafe stopped using. Leave empty if there isn't one. When
  // set, a "new number" bar shows at the top so regulars update their contacts.
  oldPhone: "",

  // HOW PEOPLE ORDER. Phone first: no platform fee, no commission, pay at
  // the counter. `text` turns on the "text your order" builder (the number
  // above must be able to receive texts). `online` is an optional online
  // ordering link (DoorDash's own ordering, Toast, ChowNow); leave it empty
  // and no "order online" buttons appear. `delivery` is the DoorDash
  // marketplace page, shown as a secondary option with the markup explained.
  ordering: {
    phone: true,
    text: true,
    online: "",
    delivery: "https://www.doordash.com/store/buenos-dias-cafecito-san-benito-st-hollister-35978755/",
  },
  // Show item numbers on the menu (and the printed menu). Phone orders go
  // faster and come out right when people can say "a number 4".
  menuNumbers: true,

  address: {
    street: "512 San Benito St",
    city: "Hollister",
    state: "CA",
    zip: "95023",
  },
  // From OpenStreetMap for 512 San Benito Street. Feeds the map link and
  // the search-engine data so "breakfast near me" can find the door.
  geo: { lat: 36.85127, lng: -121.40225 },

  // 24-hour clock. Same hours every day right now. If a day ever changes,
  // add it to `exceptions`, e.g.  { Sun: { open: "08:00", close: "13:00" } }
  // or  { Mon: null }  to mark a day closed.
  hours: { open: "07:00", close: "14:00" },
  exceptions: {},

  // Shows as a banner at the top when it's not empty. Good for holidays:
  // { en: "Closed Thursday, Nov 26 for Thanksgiving.", es: "Cerrado el jueves 26 de noviembre por Acción de Gracias." }
  notice: { en: "", es: "" },

  links: {
    instagram: "https://www.instagram.com/buenosdiascafecito/",
    facebook: "https://www.facebook.com/BuenosDiasCafecito/",
    yelp: "https://www.yelp.com/biz/buenos-dias-cafecito-hollister",
    tripadvisor: "https://www.tripadvisor.com/Restaurant_Review-g32498-d26326536-Reviews-Buenos_Dias_Cafeito-Hollister_California.html",
    googleMaps: "https://www.google.com/maps/search/?api=1&query=Buenos+Dias+Cafecito+512+San+Benito+St+Hollister+CA+95023",
    googleDirections: "https://www.google.com/maps/dir/?api=1&destination=512+San+Benito+St%2C+Hollister%2C+CA+95023",
    appleMaps: "https://maps.apple.com/place?place-id=IF4263FA52F06225F",
    chamber: "https://business.sanbenitocountychamber.com/list/member/buenos-dias-cafecito-4557",
    story: "https://benitolink.com/eat-drink-savor-homestyle-breakfast-at-buenos-dias-cafecito/",
  },

  // Catering form. Leave empty and the form hands the customer a ready-made
  // text message to the cafe's phone. Paste a Formspree / Basin / Netlify
  // Forms endpoint here and the same form emails the cafe instead.
  cateringEndpoint: "",

  // Photos. Empty string = the designed placeholder shows. Put a file in
  // images/ and write its path here, e.g. "images/chilaquiles.jpg".
  // Shot list and sizes are in images/README.md.
  photos: {
    hero: "images/hero.jpg",                 // the patio table: skillet, café de olla, arrachera
    chilaquiles: "images/chilaquiles.jpg",   // square
    arrachera: "images/arrachera.jpg",       // square
    pancakes: "images/pancakes.jpg",         // square
    cafeDeOlla: "images/cafe-de-olla.jpg",   // square
    table: "images/table.jpg",               // 4:3 — a full table, used in the catering section
    team: "",                                // 4:3 — David, Ricardo and Trino (still needed)
  },
  // Alt text for the photos above, for screen readers and image search.
  photoAlt: {
    hero: { en: "Breakfast on the patio at Buenos Días Cafecito: a skillet with eggs and toast, a clay mug of café de olla, and arrachera with potatoes", es: "Desayuno en el patio de Buenos Días Cafecito: un skillet con huevos y pan tostado, un jarro de café de olla y arrachera con papas" },
    chilaquiles: { en: "Chilaquiles rojos with a fried egg, avocado, pickled red onions, beans and potatoes on a clay plate", es: "Chilaquiles rojos con huevo estrellado, aguacate, cebolla morada encurtida, frijoles y papas en plato de barro" },
    arrachera: { en: "Marinated arrachera over chilaquiles with queso fresco, crema and pickled onions", es: "Arrachera marinada sobre chilaquiles con queso fresco, crema y cebolla encurtida" },
    pancakes: { en: "A stack of pancakes dusted with powdered sugar", es: "Una torre de hot cakes con azúcar glass" },
    cafeDeOlla: { en: "Café de olla in a hand-painted clay mug on the patio table", es: "Café de olla en un jarro de barro pintado a mano sobre la mesa del patio" },
    table: { en: "A table on the patio with pancakes, chilaquiles and café de olla", es: "Una mesa en el patio con hot cakes, chilaquiles y café de olla" },
    team: { en: "The Buenos Días Cafecito team", es: "El equipo de Buenos Días Cafecito" },
  },

  menuUpdated: { en: "September 2026", es: "septiembre de 2026" },
};

/* ---------------------------------------------------------------------
   THE MENU
   Prices are the in-house / ChowNow prices. Delivery apps mark these up.
   `tags` can include: "popular", "sellsOut", "veg", "weekend", "kids".
   --------------------------------------------------------------------- */
const MENU = [
  {
    id: "specialties",
    wide: true,
    name: { en: "House Specialties", es: "Especialidades de la Casa" },
    items: [
      {
        name: { en: "Chilaquiles", es: "Chilaquiles" },
        photo: "images/menu-chilaquiles.jpg",
        price: 18.99,
        tags: ["popular"],
        desc: {
          en: "Crispy tortilla in salsa roja or verde (or half and half), Jack cheese, eggs any style, pickled red onions, queso fresco, sour cream, avocado and a drizzle of green salsa.",
          es: "Totopos crujientes en salsa roja o verde (o mitad y mitad), queso Jack, huevos al gusto, cebolla morada encurtida, queso fresco, crema, aguacate y un toque de salsa verde.",
        },
      },
      {
        name: { en: "Marinated Arrachera & Eggs", es: "Arrachera Marinada con Huevos" },
        photo: "images/menu-arrachera.jpg",
        price: 26.99,
        tags: ["sellsOut"],
        desc: {
          en: "Hand-cut Mexican skirt steak, marinated in-house, topped with pico de gallo and green onions. Served with potatoes and toast.",
          es: "Arrachera cortada a mano y marinada en casa, con pico de gallo y cebollín. Con papas y pan tostado.",
        },
      },
      {
        name: { en: "Huevos Rancheros", es: "Huevos Rancheros" },
        price: 18.99,
        tags: [],
        desc: {
          en: "Fried tortillas, refried beans, eggs any style, salsa roja, queso fresco, avocado, pico de gallo and sour cream.",
          es: "Tortillas fritas, frijoles refritos, huevos al gusto, salsa roja, queso fresco, aguacate, pico de gallo y crema.",
        },
      },
      {
        name: { en: "Skillet", es: "Skillet" },
        photo: "images/menu-skillet.jpg",
        price: 18.99,
        tags: ["popular"],
        desc: {
          en: "Three eggs over house potatoes with cheese and green onions, toast on the side. The carnitas skillet has a following.",
          es: "Tres huevos sobre papas de la casa con queso y cebollín, pan tostado al lado. El skillet de carnitas tiene sus fans.",
        },
      },
      {
        name: { en: "Huevos a la Mexicana", es: "Huevos a la Mexicana" },
        price: 16.99,
        tags: [],
        desc: {
          en: "Scrambled with tomato, onion and jalapeño. Served with beans, potatoes and toast.",
          es: "Revueltos con tomate, cebolla y jalapeño. Con frijoles, papas y pan tostado.",
        },
      },
    ],
  },
  {
    id: "classics",
    name: { en: "Classic Breakfasts", es: "Desayunos Clásicos" },
    note: { en: "Two eggs, house potatoes and your choice of toast.", es: "Dos huevos, papas de la casa y pan tostado a elegir." },
    items: [
      { name: { en: "Bacon & Eggs", es: "Tocino con Huevos" }, price: 17.99, tags: [], desc: { en: "", es: "" } },
      { name: { en: "Sausage & Eggs", es: "Salchicha con Huevos" }, price: 16.99, tags: [], desc: { en: "", es: "" } },
      { name: { en: "Ham Steak & Eggs", es: "Jamón con Huevos" }, price: 17.99, tags: [], desc: { en: "", es: "" } },
      {
        name: { en: "Buenos Dias Chicken Fried Steak & Eggs", es: "Bistec Empanizado Buenos Dias con Huevos" },
        photo: "images/menu-chicken-fried-steak.jpg",
        price: 18.99,
        tags: ["popular"],
        desc: { en: "Hand-breaded steak smothered in gravy.", es: "Bistec empanizado a mano, bañado en gravy." },
      },
    ],
  },
  {
    id: "omelets",
    name: { en: "Omelets", es: "Omelettes" },
    note: { en: "Three eggs with Cheddar, house potatoes and your choice of toast.", es: "Tres huevos con queso Cheddar, papas de la casa y pan tostado a elegir." },
    items: [
      { name: { en: "Ham & Cheese", es: "Jamón y Queso" }, price: 15.99, tags: [], desc: { en: "", es: "" } },
      { name: { en: "Denver", es: "Denver" }, price: 16.99, tags: [], desc: { en: "Ham, bell peppers and onions.", es: "Jamón, pimientos y cebolla." } },
      { name: { en: "California", es: "California" }, price: 17.99, tags: [], desc: { en: "Bacon, Jack cheese and avocado.", es: "Tocino, queso Jack y aguacate." } },
      { name: { en: "Vegetarian", es: "Vegetariano" }, price: 15.99, tags: ["veg"], desc: { en: "Bell peppers, onions and tomato.", es: "Pimientos, cebolla y tomate." } },
      { name: { en: "Chorizo Scramble", es: "Revuelto de Chorizo" }, price: 17.99, tags: [], desc: { en: "", es: "" } },
    ],
  },
  {
    id: "griddle",
    name: { en: "From the Griddle", es: "De la Plancha" },
    note: { en: "Dusted with powdered sugar and cinnamon.", es: "Con azúcar glass y canela." },
    items: [
      {
        name: { en: "French Toast", es: "Pan Francés" },
        price: 11.99,
        tags: ["popular"],
        desc: { en: "Three thick slices of cinnamon-swirl bread.", es: "Tres rebanadas gruesas de pan con remolino de canela." },
      },
      { name: { en: "Pancakes (3)", es: "Hot Cakes (3)" }, price: 10.99, tags: [], desc: { en: "", es: "" }, photo: "images/menu-pancakes.jpg" },
      { name: { en: "Blueberry Pancakes", es: "Hot Cakes de Mora Azul" }, price: 12.99, tags: [], desc: { en: "", es: "" } },
      { name: { en: "Chocolate Chip Blueberry Pancakes", es: "Hot Cakes de Mora Azul con Chispas de Chocolate" }, price: 12.99, tags: [], desc: { en: "", es: "" } },
      { name: { en: "Pancakes & Eggs", es: "Hot Cakes con Huevos" }, price: 19.99, tags: [], desc: { en: "Griddle plate with eggs.", es: "Plato de la plancha con huevos." } },
      { name: { en: "French Toast & Eggs", es: "Pan Francés con Huevos" }, price: 19.99, tags: [], desc: { en: "Griddle plate with eggs.", es: "Plato de la plancha con huevos." } },
    ],
  },
  {
    id: "burrito",
    name: { en: "Breakfast Burrito", es: "Burrito de Desayuno" },
    items: [
      {
        name: { en: "Breakfast Burrito", es: "Burrito de Desayuno" },
        price: 15.99,
        tags: [],
        desc: { en: "Eggs, potatoes, cheese and your choice of meat.", es: "Huevos, papas, queso y carne a elegir." },
      },
    ],
  },
  {
    id: "lunch",
    name: { en: "Lunch", es: "Almuerzo" },
    items: [
      {
        name: { en: "Classic Burger", es: "Hamburguesa Clásica" },
        price: 18.99,
        tags: [],
        desc: { en: "Mayo, lettuce, tomato, red onion, American cheese and pickles.", es: "Mayonesa, lechuga, tomate, cebolla morada, queso americano y pepinillos." },
      },
      {
        name: { en: "Bonanza Burger", es: "Hamburguesa Bonanza" },
        price: 20.99,
        tags: ["popular"],
        desc: { en: "Bacon, BBQ sauce, onion rings, cheese, lettuce, tomato and red onion.", es: "Tocino, salsa BBQ, aros de cebolla, queso, lechuga, tomate y cebolla morada." },
      },
      {
        name: { en: "Patty Melt", es: "Patty Melt" },
        price: 19.99,
        tags: [],
        desc: { en: "On grilled sourdough with grilled onions, American cheese and pickles.", es: "En pan sourdough a la plancha con cebolla asada, queso americano y pepinillos." },
      },
      {
        name: { en: "Grilled Chicken Sandwich", es: "Sándwich de Pollo a la Parrilla" },
        price: 18.99,
        tags: [],
        desc: { en: "Mayo, lettuce, tomato, red onion and pickles.", es: "Mayonesa, lechuga, tomate, cebolla morada y pepinillos." },
      },
      {
        name: { en: "BLT", es: "BLT" },
        price: 17.99,
        tags: [],
        desc: { en: "On sourdough with mayo, bacon, lettuce and tomato.", es: "En sourdough con mayonesa, tocino, lechuga y tomate." },
      },
    ],
  },
  {
    id: "salads",
    name: { en: "Salads", es: "Ensaladas" },
    items: [
      {
        name: { en: "House Salad (small)", es: "Ensalada de la Casa (chica)" },
        price: 8.99,
        tags: ["veg"],
        desc: { en: "Mixed greens, cherry tomatoes, cucumber, red onion, Cheddar and croutons.", es: "Lechugas mixtas, tomate cherry, pepino, cebolla morada, queso Cheddar y crutones." },
      },
      {
        name: { en: "Caesar Salad", es: "Ensalada César" },
        price: 13.99,
        tags: [],
        desc: { en: "Romaine, cherry tomatoes, Parmesan and croutons.", es: "Lechuga romana, tomate cherry, queso parmesano y crutones." },
      },
    ],
  },
  {
    id: "kids",
    name: { en: "Kids", es: "Menú Infantil" },
    items: [
      { name: { en: "Mighty Mouse Pancake", es: "Hot Cake Mighty Mouse" }, price: 6.99, tags: ["kids"], desc: { en: "", es: "" } },
      { name: { en: "Kids French Toast", es: "Pan Francés Infantil" }, price: 8.99, tags: ["kids"], desc: { en: "Half order.", es: "Media orden." } },
      { name: { en: "Kids Grilled Cheese", es: "Sándwich de Queso Infantil" }, price: 8.99, tags: ["kids"], desc: { en: "With fries.", es: "Con papas fritas." } },
      { name: { en: "Kids Quesadilla", es: "Quesadilla Infantil" }, price: 8.99, tags: ["kids"], desc: { en: "With fries.", es: "Con papas fritas." } },
    ],
  },
  {
    id: "sides",
    name: { en: "Sides", es: "Extras" },
    compact: true,
    items: [
      { name: { en: "Egg", es: "Huevo" }, price: 2.99 },
      { name: { en: "Toast", es: "Pan tostado" }, price: 3.99 },
      { name: { en: "Tortillas", es: "Tortillas" }, price: 3.99 },
      { name: { en: "Side Pancake", es: "Hot cake" }, price: 3.99 },
      { name: { en: "Fries", es: "Papas fritas" }, price: 4.99 },
      { name: { en: "Cup of Fruit", es: "Taza de fruta" }, price: 4.99 },
      { name: { en: "House Potatoes", es: "Papas de la casa" }, price: 5.99 },
      { name: { en: "Bacon", es: "Tocino" }, price: 6.99 },
      { name: { en: "Sausage", es: "Salchicha" }, price: 6.99 },
      { name: { en: "Onion Rings", es: "Aros de cebolla" }, price: 6.99 },
      { name: { en: "Chips & Salsa", es: "Totopos con salsa" }, price: 6.99 },
    ],
  },
  {
    id: "drinks",
    name: { en: "Drinks", es: "Bebidas" },
    compact: true,
    note: { en: "Ask your server about micheladas and mimosas.", es: "Pregunta a tu mesero por micheladas y mimosas." },
    items: [
      { name: { en: "Café de Olla", es: "Café de Olla" }, price: 4.99, tags: ["popular"], photo: "images/menu-cafe-de-olla.jpg" },
      { name: { en: "Chocolate Abuelita", es: "Chocolate Abuelita" }, price: 4.99, tags: ["weekend"] },
      { name: { en: "Coffee", es: "Café" }, price: 3.99 },
      { name: { en: "Hot Tea", es: "Té caliente" }, price: 3.99 },
      { name: { en: "Orange Juice", es: "Jugo de naranja" }, price: null },
      { name: { en: "Apple Juice", es: "Jugo de manzana" }, price: null },
      { name: { en: "Lemonade", es: "Limonada" }, price: 3.99 },
      { name: { en: "Soda", es: "Refresco" }, price: 3.99 },
      { name: { en: "Milk / Chocolate Milk", es: "Leche / Leche con chocolate" }, price: 3.99 },
      { name: { en: "Oat or Almond Milk", es: "Leche de avena o almendra" }, price: 3.99 },
    ],
  },
];

/* ---------------------------------------------------------------------
   THE FOUR DISHES ON THE FRONT PAGE
   `photo` names a key in SITE.photos. `art` names the built-in drawing
   that shows until there's a photo.
   --------------------------------------------------------------------- */
const SIGNATURES = [
  {
    photo: "chilaquiles",
    art: "chilaquiles",
    name: { en: "Chilaquiles", es: "Chilaquiles" },
    price: 18.99,
    blurb: {
      en: "Red, green, or half and half. The dish people mean when they say 'best chilaquiles in town.'",
      es: "Rojos, verdes, o mitad y mitad. El platillo del que hablan cuando dicen 'los mejores chilaquiles del pueblo'.",
    },
  },
  {
    photo: "arrachera",
    art: "arrachera",
    name: { en: "Marinated Arrachera & Eggs", es: "Arrachera Marinada con Huevos" },
    price: 26.99,
    badge: { en: "Sells out", es: "Se agota" },
    blurb: {
      en: "Hand-cut skirt steak, marinated in-house. Get it with eggs, or piled on the chilaquiles. It runs out most days, so come early or order ahead.",
      es: "Arrachera cortada a mano, marinada en casa. Pídela con huevos o encima de los chilaquiles. Se termina casi todos los días: llega temprano u ordena antes.",
    },
  },
  {
    photo: "pancakes",
    art: "frenchToast",
    name: { en: "Pancakes", es: "Hot Cakes" },
    price: 10.99,
    blurb: {
      en: "Three to a stack, dusted with powdered sugar and cinnamon. Add blueberries or chocolate chips, or make it a plate with eggs.",
      es: "Tres por orden, con azúcar glass y canela. Agrégales mora azul o chispas de chocolate, o hazlos plato con huevos.",
    },
  },
  {
    photo: "cafeDeOlla",
    art: "cafeDeOlla",
    name: { en: "Café de Olla", es: "Café de Olla" },
    price: 4.99,
    blurb: {
      en: "Coffee simmered with cinnamon and piloncillo, the way it's made at home. The reason regulars are regulars.",
      es: "Café hervido con canela y piloncillo, como se hace en casa. La razón por la que los clientes de siempre son de siempre.",
    },
  },
];

/* ---------------------------------------------------------------------
   SOCIAL PROOF — short quotes from public reviews, attributed to the
   platform. Swap in new ones any time.
   --------------------------------------------------------------------- */
const RATINGS = [
  { platform: "Yelp", score: "4.5", detail: { en: "160+ reviews", es: "más de 160 reseñas" }, href: "yelp" },
  { platform: "Tripadvisor", score: "5.0", detail: { en: "out of 5", es: "de 5" }, href: "tripadvisor" },
  { platform: "Nextdoor", score: "★", detail: { en: "Neighborhood Favorite", es: "Favorito del vecindario" }, href: "" },
];

const REVIEWS = [
  { quote: { en: "Best chilaquiles in town.", es: "Los mejores chilaquiles del pueblo." }, source: "Yelp" },
  { quote: { en: "Best coffee in the morning!", es: "¡El mejor café de la mañana!" }, source: "Nextdoor" },
  { quote: { en: "Large portions, great taste, awesome coffee.", es: "Porciones grandes, gran sabor, café buenísimo." }, source: "Restaurant Guru" },
  { quote: { en: "Great flavors and excellent service.", es: "Sabores excelentes y un servicio excelente." }, source: "Yelp" },
  { quote: { en: "Fantastic food and service!", es: "¡Comida y servicio fantásticos!" }, source: "Nextdoor" },
];

/* ---------------------------------------------------------------------
   DOWNTOWN CALENDAR — the days San Benito Street fills up.
   Kept generic on purpose so it never goes stale.
   --------------------------------------------------------------------- */
const EVENTS = [
  {
    name: { en: "Downtown Farmers' Market", es: "Mercado de Agricultores del Centro" },
    when: { en: "Wednesdays, 3–7 PM · April to October", es: "Miércoles, 3–7 PM · abril a octubre" },
    desc: {
      en: "Ninety-plus vendors set up on San Benito Street between Fifth and Seventh. We're right in the middle of it.",
      es: "Más de noventa puestos sobre San Benito Street entre la Quinta y la Séptima. Estamos justo en medio.",
    },
  },
  {
    name: { en: "Hollister Independence Rally", es: "Rally de la Independencia de Hollister" },
    when: { en: "July 4th weekend", es: "Fin de semana del 4 de julio" },
    desc: {
      en: "Tens of thousands of motorcycles on San Benito Street. Doors open at 7 — eat before the street closes to cars.",
      es: "Decenas de miles de motos en San Benito Street. Abrimos a las 7: desayuna antes de que cierren la calle a los autos.",
    },
  },
  {
    name: { en: "Street Festival & Car Show", es: "Festival de la Calle y Exhibición de Autos" },
    when: { en: "A Saturday in July", es: "Un sábado de julio" },
    desc: {
      en: "Downtown's classic car show, nearly forty years running, right outside our windows.",
      es: "La exhibición de autos clásicos del centro, casi cuarenta años de tradición, justo afuera de nuestras ventanas.",
    },
  },
  {
    name: { en: "Lights On Celebration", es: "Encendido de Luces" },
    when: { en: "Saturday after Thanksgiving", es: "Sábado después de Acción de Gracias" },
    desc: {
      en: "Downtown lights up for the holidays. Warm up with a café de olla first.",
      es: "El centro se ilumina para las fiestas. Primero entra en calor con un café de olla.",
    },
  },
];

/* ---------------------------------------------------------------------
   THE STORY — from the owners' 2024 interview with BenitoLink.
   --------------------------------------------------------------------- */
const STORY = {
  paragraphs: [
    {
      en: "Buenos Días Cafecito opened on San Benito Street in the fall of 2022. It started with David Ramirez, who already co-owned Las Micheladas Bar & Grill and thought downtown Hollister was missing a real breakfast spot.",
      es: "Buenos Días Cafecito abrió en San Benito Street en el otoño de 2022. Empezó con David Ramirez, que ya era socio de Las Micheladas Bar & Grill y pensaba que al centro de Hollister le faltaba un verdadero lugar de desayuno.",
    },
    {
      en: "He brought in Ricardo Saavedra, who grew up in his father's diner in Scotts Valley and has worked in restaurant kitchens since he was six, and Trino Serrano, who runs the operation and shapes the menu.",
      es: "Sumó a Ricardo Saavedra, que creció en el diner de su padre en Scotts Valley y trabaja en cocinas de restaurante desde los seis años, y a Trino Serrano, que dirige la operación y da forma al menú.",
    },
    {
      en: "The idea was simple: the American diner breakfast we all grew up on, cooked the way our families cook at home. Chilaquiles next to chicken-fried steak. Café de olla next to a plain black coffee. Everything from scratch, every morning.",
      es: "La idea era simple: el desayuno americano de diner con el que todos crecimos, cocinado como cocinan nuestras familias en casa. Chilaquiles junto al bistec empanizado. Café de olla junto a un café americano. Todo desde cero, cada mañana.",
    },
  ],
  quotes: [
    {
      text: { en: "It's your all-American breakfast with a sense of our culture.", es: "Es tu desayuno americano de siempre, con el sentido de nuestra cultura." },
      who: "David Ramirez",
    },
    {
      text: { en: "There's no doubt in my mind that we are going to be here for the next 20 years.", es: "No tengo ninguna duda de que vamos a estar aquí los próximos 20 años." },
      who: "David Ramirez",
    },
  ],
  owners: [
    { name: "David Ramirez", role: { en: "Co-owner · the idea", es: "Socio · la idea" } },
    { name: "Ricardo Saavedra", role: { en: "Co-owner · the kitchen", es: "Socio · la cocina" } },
    { name: "Trino Serrano", role: { en: "Co-owner · the menu & operations", es: "Socio · el menú y la operación" } },
  ],
};

/* ---------------------------------------------------------------------
   EVERY OTHER WORD ON THE PAGE, in English and Spanish.
   `{open}`, `{close}`, `{date}`, `{year}` get filled in by the site.
   --------------------------------------------------------------------- */
const I18N = {
  en: {
    "meta.title": "Buenos Días Cafecito — Mexican Breakfast & Lunch in Downtown Hollister, CA",
    "skip": "Skip to content",
    "lang.switch": "ES",
    "lang.switchLabel": "Cambiar a español",
    "nav.menu": "Menu",
    "nav.order": "Order",
    "nav.catering": "Catering",
    "nav.visit": "Visit",
    "nav.about": "About",
    "nav.call": "Call",
    "nav.orderOnline": "Order online",
    "nav.callOrder": "Call to order",
    "nav.toggle": "Menu",
    "notice.newNumber": "We have a new phone number: {phone}. The old number, {old}, no longer reaches us.",

    "status.openNow": "Open now · closes at {close}",
    "status.opensToday": "Opens today at {open}",
    "status.opensTomorrow": "Opens tomorrow at {open}",
    "status.closedToday": "Closed today · opens {day} at {open}",
    "status.hoursDaily": "Every day {open} – {close}",

    "hero.kicker": "Downtown Hollister · Since 2022",
    "hero.sub": "Chilaquiles, café de olla and a proper diner breakfast, made from scratch on San Benito Street. Call ahead and it's ready when you walk in.",
    "hero.order": "Order online",
    "hero.callOrder": "Call to order",
    "hero.textOrder": "Text your order",
    "hero.callLine": "Call ahead:",
    "hero.menu": "See the menu",
    "hero.address": "512 San Benito St · Hollister, CA",

    "proof.title": "Rated by the people who eat here",

    "sig.kicker": "House favorites",
    "sig.title": "What people drive in for",
    "sig.sub": "Three partners, one kitchen, everything from scratch. Start here if it's your first visit.",
    "sig.fullMenu": "See the full menu",

    "menu.kicker": "The menu",
    "menu.title": "Breakfast all day, lunch too",
    "menu.sub": "Served 7 AM to 2 PM, every day. These are our in-house prices, no app markup. Call ahead with the item numbers and we'll have it ready.",
    "menu.add": "Add",
    "menu.added": "Added",
    "menu.print": "Print menu",
    "menu.updated": "Menu and prices as of {date}. Subject to change. Tax not included.",
    "menu.jump": "Jump to",
    "tag.popular": "Popular",
    "tag.sellsOut": "Sells out — order early",
    "tag.veg": "Vegetarian",
    "tag.weekend": "Fri – Sun only",
    "tag.kids": "Kids",
    "price.ask": "Ask",

    "order.kicker": "Order",
    "order.title": "Call ahead, it's ready when you walk in",
    "order.call.title": "Call ahead",
    "order.call.body": "Tell us what you want and when you'll be here. Pay at the counter when you pick up. No app, no fees, no markup.",
    "order.call.cta": "Call",
    "order.call.note": "Tip: say the item numbers from the menu and it goes twice as fast.",
    "order.text.title": "Text your order",
    "order.text.body": "Tap Add next to anything on the menu, then send it as a text. We'll text back to confirm and tell you when it's ready.",
    "order.text.cta": "Start a text order",
    "order.online.title": "Order online",
    "order.online.body": "Order ahead from our own ordering page. Same in-house prices.",
    "order.online.cta": "Order online",
    "order.delivery.title": "Delivery",
    "order.delivery.body": "Not leaving the house? We're on DoorDash. Prices there include the app's fees, so if you can swing by, call ahead instead.",
    "order.delivery.cta": "Open DoorDash",
    "text.kicker": "Text your order",
    "text.title": "Your text order",
    "text.empty": "Nothing yet. Tap Add next to a dish on the menu, or type what you'd like below.",
    "text.name": "Your name",
    "text.time": "Pickup time",
    "text.timeHint": "e.g. 7:45",
    "text.notes": "Anything else? Eggs over easy, no onions, extra salsa…",
    "text.total": "Estimated total before tax",
    "text.send": "Text it to {phone}",
    "text.call": "Call instead",
    "text.copy": "Copy order",
    "text.copied": "Copied!",
    "text.clear": "Clear",
    "text.howTitle": "How it works",
    "text.how": "Your phone opens a text with the order already written. Send it, we text back to confirm, you pay when you pick up.",
    "text.msgIntro": "Pickup order",
    "text.msgFor": "for",
    "text.msgAt": "at",
    "text.msgNotes": "Notes",
    "text.msgTotal": "Est. total before tax",
    "text.remove": "Remove",
    "pill.items": "{n} items",
    "pill.item": "1 item",
    "pill.review": "Review text order",
    "order.dinein.title": "Dine in",
    "order.dinein.body": "Patio seating on San Benito Street, dogs welcome outside, wheelchair accessible, and we take Apple Pay. Bringing a big group? Call ahead and we'll set you up.",
    "order.dinein.cta": "Get directions",

    "catering.kicker": "Catering & large orders",
    "catering.title": "Feed the whole crew",
    "catering.sub": "Office breakfasts, crew meals, quinceañera brunches, church groups, rally weekend. Tell us the date and the headcount and we'll call you back with a quote.",
    "catering.ideas.title": "Good for",
    "catering.ideas.1": "Morning meetings and job-site breakfasts",
    "catering.ideas.2": "Birthday and quinceañera brunches",
    "catering.ideas.3": "Team breakfast burritos by the dozen",
    "catering.ideas.4": "Rally and festival weekend crews",
    "form.name": "Your name",
    "form.phone": "Phone",
    "form.date": "Date needed",
    "form.headcount": "How many people",
    "form.notes": "What are you thinking? Dishes, pickup or delivery, what time.",
    "form.submit": "Send request",
    "form.orCall": "or call",
    "form.fallbackTitle": "Send it straight to our phone",
    "form.fallbackBody": "Tap below to text us this request, or call and read it to us. We answer during business hours.",
    "form.text": "Text it to us",
    "form.copy": "Copy message",
    "form.copied": "Copied!",
    "form.thanks": "Got it — we'll call you back within a business day.",
    "form.error": "Something went wrong on our end. Please call us and we'll take it over the phone.",
    "form.msgIntro": "Catering request from the website",

    "visit.kicker": "Visit",
    "visit.title": "Right on San Benito Street",
    "visit.hours": "Hours",
    "visit.address": "Address",
    "visit.parking": "Street parking on San Benito Street and the side streets. In the heart of downtown, a few doors from the Wednesday farmers' market.",
    "visit.google": "Google Maps",
    "visit.apple": "Apple Maps",
    "visit.save": "Save our number",
    "visit.phone": "Phone",
    "visit.mapTitle": "Map showing Buenos Días Cafecito at 512 San Benito Street, Hollister",
    "visit.pinnaclesTitle": "Heading to Pinnacles?",
    "visit.pinnacles": "We're the last real breakfast before the park. The east entrance is about 32 miles down Highway 25, so fuel up here and be at the trailhead by nine.",
    "visit.days.Mon": "Monday", "visit.days.Tue": "Tuesday", "visit.days.Wed": "Wednesday", "visit.days.Thu": "Thursday",
    "visit.days.Fri": "Friday", "visit.days.Sat": "Saturday", "visit.days.Sun": "Sunday",
    "visit.closed": "Closed",
    "visit.today": "Today",

    "events.kicker": "Downtown calendar",
    "events.title": "We're on the route",
    "events.sub": "San Benito Street is the stage for Hollister's biggest days. Our doors open at 7, so get in before the crowds do.",

    "about.kicker": "Our story",
    "about.title": "Three partners, one idea: Hollister needed breakfast",
    "about.source": "From the owners' 2024 interview with BenitoLink",
    "about.readMore": "Read the story",

    "reviews.kicker": "What Hollister says",
    "reviews.cta": "Had a good breakfast? A review helps a small, local business more than you'd think.",
    "reviews.google": "Review us on Google",
    "reviews.yelp": "Review us on Yelp",

    "footer.follow": "Follow along",
    "footer.hours": "Hours",
    "footer.find": "Find us",
    "footer.chamber": "Member, San Benito County Chamber of Commerce",
    "footer.rights": "© {year} Buenos Dias Cafecito LLC · 512 San Benito St, Hollister, CA 95023",
    "footer.tagline": "Modern Mexican breakfast & lunch.",

    "mobile.order": "Order online",
    "mobile.call": "Call to order",
    "mobile.text": "Text order",
    "mobile.menu": "Menu",

    "print.title": "Menu",
    "print.hours": "Open every day 7 AM – 2 PM",
    "print.order": "Call ahead:",
  },

  es: {
    "meta.title": "Buenos Días Cafecito — Desayuno y almuerzo mexicano en el centro de Hollister, CA",
    "skip": "Ir al contenido",
    "lang.switch": "EN",
    "lang.switchLabel": "Switch to English",
    "nav.menu": "Menú",
    "nav.order": "Ordenar",
    "nav.catering": "Catering",
    "nav.visit": "Visítanos",
    "nav.about": "Nosotros",
    "nav.call": "Llamar",
    "nav.orderOnline": "Ordena en línea",
    "nav.callOrder": "Llama para ordenar",
    "nav.toggle": "Menú",
    "notice.newNumber": "Tenemos número nuevo: {phone}. El número anterior, {old}, ya no nos comunica.",

    "status.openNow": "Abierto ahora · cierra a las {close}",
    "status.opensToday": "Abre hoy a las {open}",
    "status.opensTomorrow": "Abre mañana a las {open}",
    "status.closedToday": "Cerrado hoy · abre el {day} a las {open}",
    "status.hoursDaily": "Todos los días {open} – {close}",

    "hero.kicker": "Centro de Hollister · Desde 2022",
    "hero.sub": "Chilaquiles, café de olla y un desayuno de diner como debe ser, hecho desde cero en San Benito Street. Llama antes y está listo cuando llegues.",
    "hero.order": "Ordena en línea",
    "hero.callOrder": "Llama para ordenar",
    "hero.textOrder": "Ordena por texto",
    "hero.callLine": "Llama antes:",
    "hero.menu": "Ver el menú",
    "hero.address": "512 San Benito St · Hollister, CA",

    "proof.title": "Calificado por quienes comen aquí",

    "sig.kicker": "Los favoritos de la casa",
    "sig.title": "Por lo que la gente viene",
    "sig.sub": "Tres socios, una cocina, todo hecho desde cero. Empieza aquí si es tu primera visita.",
    "sig.fullMenu": "Ver el menú completo",

    "menu.kicker": "El menú",
    "menu.title": "Desayuno todo el día, y almuerzo también",
    "menu.sub": "Se sirve de 7 AM a 2 PM, todos los días. Estos son los precios de la casa, sin sobreprecio de apps. Llama antes con los números de los platillos y lo tenemos listo.",
    "menu.add": "Agregar",
    "menu.added": "Agregado",
    "menu.print": "Imprimir menú",
    "menu.updated": "Menú y precios a {date}. Sujetos a cambio. No incluyen impuestos.",
    "menu.jump": "Ir a",
    "tag.popular": "Popular",
    "tag.sellsOut": "Se agota — pide temprano",
    "tag.veg": "Vegetariano",
    "tag.weekend": "Solo vie – dom",
    "tag.kids": "Niños",
    "price.ask": "Pregunta",

    "order.kicker": "Ordenar",
    "order.title": "Llama antes y está listo cuando llegues",
    "order.call.title": "Llama antes",
    "order.call.body": "Dinos qué quieres y a qué hora llegas. Pagas en el mostrador al recoger. Sin app, sin comisiones, sin sobreprecio.",
    "order.call.cta": "Llamar",
    "order.call.note": "Tip: di los números de los platillos del menú y va el doble de rápido.",
    "order.text.title": "Ordena por texto",
    "order.text.body": "Toca Agregar junto a lo que quieras del menú y envíalo como mensaje de texto. Te contestamos para confirmar y decirte cuándo está listo.",
    "order.text.cta": "Empezar pedido por texto",
    "order.online.title": "Ordena en línea",
    "order.online.body": "Ordena antes desde nuestra propia página de pedidos. Mismos precios de la casa.",
    "order.online.cta": "Ordena en línea",
    "order.delivery.title": "A domicilio",
    "order.delivery.body": "¿No sales de casa? Estamos en DoorDash. Los precios ahí incluyen las comisiones de la app, así que si puedes pasar, mejor llama antes.",
    "order.delivery.cta": "Abrir DoorDash",
    "text.kicker": "Ordena por texto",
    "text.title": "Tu pedido por texto",
    "text.empty": "Aún nada. Toca Agregar junto a un platillo del menú, o escribe lo que quieras abajo.",
    "text.name": "Tu nombre",
    "text.time": "Hora para recoger",
    "text.timeHint": "p. ej. 7:45",
    "text.notes": "¿Algo más? Huevos estrellados, sin cebolla, salsa extra…",
    "text.total": "Total estimado antes de impuestos",
    "text.send": "Enviar texto al {phone}",
    "text.call": "Mejor llamar",
    "text.copy": "Copiar pedido",
    "text.copied": "¡Copiado!",
    "text.clear": "Borrar",
    "text.howTitle": "Cómo funciona",
    "text.how": "Tu teléfono abre un mensaje con el pedido ya escrito. Lo envías, te confirmamos por texto y pagas al recoger.",
    "text.msgIntro": "Pedido para recoger",
    "text.msgFor": "para",
    "text.msgAt": "a las",
    "text.msgNotes": "Notas",
    "text.msgTotal": "Total est. antes de impuestos",
    "text.remove": "Quitar",
    "pill.items": "{n} platillos",
    "pill.item": "1 platillo",
    "pill.review": "Revisar pedido por texto",
    "order.dinein.title": "Come aquí",
    "order.dinein.body": "Patio sobre San Benito Street, perros bienvenidos afuera, acceso para silla de ruedas y aceptamos Apple Pay. ¿Vienen en grupo grande? Llámanos antes y te acomodamos.",
    "order.dinein.cta": "Cómo llegar",

    "catering.kicker": "Catering y pedidos grandes",
    "catering.title": "Alimenta a todo el equipo",
    "catering.sub": "Desayunos de oficina, comidas para cuadrillas, brunch de quinceañera, grupos de iglesia, fin de semana del rally. Dinos la fecha y cuántos son y te llamamos con una cotización.",
    "catering.ideas.title": "Ideal para",
    "catering.ideas.1": "Juntas matutinas y desayunos en la obra",
    "catering.ideas.2": "Brunch de cumpleaños y quinceañera",
    "catering.ideas.3": "Burritos de desayuno por docena para el equipo",
    "catering.ideas.4": "Cuadrillas del rally y los festivales",
    "form.name": "Tu nombre",
    "form.phone": "Teléfono",
    "form.date": "Fecha",
    "form.headcount": "Cuántas personas",
    "form.notes": "¿Qué tienes en mente? Platillos, recoger o entrega, a qué hora.",
    "form.submit": "Enviar solicitud",
    "form.orCall": "o llama al",
    "form.fallbackTitle": "Envíalo directo a nuestro teléfono",
    "form.fallbackBody": "Toca abajo para enviarnos este mensaje por texto, o llámanos y léenoslo. Contestamos en horario de atención.",
    "form.text": "Enviar por texto",
    "form.copy": "Copiar mensaje",
    "form.copied": "¡Copiado!",
    "form.thanks": "¡Recibido! Te llamamos en un día hábil.",
    "form.error": "Algo salió mal de nuestro lado. Por favor llámanos y lo tomamos por teléfono.",
    "form.msgIntro": "Solicitud de catering desde el sitio web",

    "visit.kicker": "Visítanos",
    "visit.title": "Justo en San Benito Street",
    "visit.hours": "Horario",
    "visit.address": "Dirección",
    "visit.parking": "Estacionamiento en la calle sobre San Benito Street y las calles laterales. En el corazón del centro, a unas puertas del mercado de agricultores de los miércoles.",
    "visit.google": "Google Maps",
    "visit.apple": "Apple Maps",
    "visit.save": "Guardar nuestro número",
    "visit.phone": "Teléfono",
    "visit.mapTitle": "Mapa de Buenos Días Cafecito en 512 San Benito Street, Hollister",
    "visit.pinnaclesTitle": "¿Vas a Pinnacles?",
    "visit.pinnacles": "Somos el último desayuno de verdad antes del parque. La entrada este está a unas 32 millas por la carretera 25: desayuna aquí y llega al sendero a las nueve.",
    "visit.days.Mon": "Lunes", "visit.days.Tue": "Martes", "visit.days.Wed": "Miércoles", "visit.days.Thu": "Jueves",
    "visit.days.Fri": "Viernes", "visit.days.Sat": "Sábado", "visit.days.Sun": "Domingo",
    "visit.closed": "Cerrado",
    "visit.today": "Hoy",

    "events.kicker": "Calendario del centro",
    "events.title": "Estamos en la ruta",
    "events.sub": "San Benito Street es el escenario de los días más grandes de Hollister. Abrimos a las 7: llega antes que la multitud.",

    "about.kicker": "Nuestra historia",
    "about.title": "Tres socios, una idea: a Hollister le faltaba desayuno",
    "about.source": "De la entrevista de los dueños con BenitoLink en 2024",
    "about.readMore": "Leer la historia",

    "reviews.kicker": "Lo que dice Hollister",
    "reviews.cta": "¿Buen desayuno? Una reseña ayuda a un negocio local pequeño más de lo que crees.",
    "reviews.google": "Reséñanos en Google",
    "reviews.yelp": "Reséñanos en Yelp",

    "footer.follow": "Síguenos",
    "footer.hours": "Horario",
    "footer.find": "Encuéntranos",
    "footer.chamber": "Miembro de la Cámara de Comercio del Condado de San Benito",
    "footer.rights": "© {year} Buenos Dias Cafecito LLC · 512 San Benito St, Hollister, CA 95023",
    "footer.tagline": "Desayuno y almuerzo mexicano moderno.",

    "mobile.order": "Ordena en línea",
    "mobile.call": "Llama para ordenar",
    "mobile.text": "Pedido por texto",
    "mobile.menu": "Menú",

    "print.title": "Menú",
    "print.hours": "Abierto todos los días 7 AM – 2 PM",
    "print.order": "Llama antes:",
  },
};
