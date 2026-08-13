// ---------- Data ----------
const PRODUCTS = [
  { id: "tee-logo",    name: "Logo Tee — Black",      cat: "T-Shirt",  price: 32, emoji: "👕", bg: "linear-gradient(135deg,#ff2e88,#7a1740)" },
  { id: "hoodie-rave", name: "Rave Hoodie",           cat: "Hoodie",   price: 68, emoji: "🧥", bg: "linear-gradient(135deg,#19e6c4,#0c5a4c)" },
  { id: "cap-jas",     name: "Embroidered Cap",       cat: "Headwear", price: 28, emoji: "🧢", bg: "linear-gradient(135deg,#8a4dff,#2a1466)" },
  { id: "vinyl-night", name: "'Night Shift' Vinyl",   cat: "Vinyl",    price: 24, emoji: "💿", bg: "linear-gradient(135deg,#ff7a2e,#5a2a0c)" },
  { id: "tote-bass",   name: "Bass Tote Bag",         cat: "Accessory",price: 18, emoji: "👜", bg: "linear-gradient(135deg,#2ea8ff,#0c3a5a)" },
  { id: "tee-tour",    name: "Tour Tee — Limited",    cat: "T-Shirt",  price: 36, emoji: "👕", bg: "linear-gradient(135deg,#ff2e88,#19e6c4)" },
  { id: "sticker-pak", name: "Sticker Pack (x6)",     cat: "Accessory",price: 9,  emoji: "✨", bg: "linear-gradient(135deg,#ffd12e,#5a4a0c)" },
  { id: "beanie-glow", name: "Glow Beanie",           cat: "Headwear", price: 26, emoji: "🎽", bg: "linear-gradient(135deg,#19e6c4,#8a4dff)" },
];

const TOUR = [
  { date: "JUN 21", city: "Los Angeles, CA", venue: "Sound Nightclub",     status: "tickets", label: "Tickets" },
  { date: "JUL 05", city: "Austin, TX",       venue: "Kingdom",            status: "tickets", label: "Tickets" },
  { date: "JUL 19", city: "Chicago, IL",      venue: "Radius",             status: "sold",    label: "Sold Out" },
  { date: "AUG 02", city: "New York, NY",     venue: "Brooklyn Mirage",    status: "tickets", label: "Tickets" },
  { date: "AUG 16", city: "Miami, FL",        venue: "Club Space",         status: "tickets", label: "Tickets" },
];

// ---------- State ----------
const cart = [];

// ---------- Render products ----------
const grid = document.getElementById("productGrid");
PRODUCTS.forEach((p) => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <div class="card__img" style="background:${p.bg}">${p.emoji}</div>
    <div class="card__body">
      <span class="card__cat">${p.cat}</span>
      <span class="card__name">${p.name}</span>
      <div class="card__row">
        <span class="card__price">$${p.price}</span>
        <button class="add-btn" data-id="${p.id}">Add</button>
      </div>
    </div>`;
  grid.appendChild(card);
});

// ---------- Render tour ----------
const tourList = document.getElementById("tourList");
TOUR.forEach((t) => {
  const li = document.createElement("li");
  li.className = "tour-row";
  li.innerHTML = `
    <span class="tour-date">${t.date}</span>
    <div class="tour-info">
      <div class="tour-city">${t.city}</div>
      <div class="tour-venue">${t.venue}</div>
    </div>
    <span class="tour-status ${t.status}">${t.label}</span>`;
  tourList.appendChild(li);
});

// ---------- Cart logic ----------
const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const drawer = document.getElementById("cartDrawer");

function addToCart(id) {
  const product = PRODUCTS.find((p) => p.id === id);
  if (product) {
    cart.push(product);
    renderCart();
  }
}

function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

function renderCart() {
  cartCount.textContent = cart.length;
  cartTotal.textContent = "$" + cart.reduce((sum, p) => sum + p.price, 0);

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="cart-empty">Your cart is empty.<br />Go grab some heat. 🔥</p>';
    return;
  }
  cartItems.innerHTML = "";
  cart.forEach((p, i) => {
    const line = document.createElement("div");
    line.className = "cart-line";
    line.innerHTML = `
      <span class="cart-line__name">${p.name}</span>
      <span class="cart-line__price">$${p.price}</span>
      <button class="cart-line__rm" data-index="${i}" aria-label="Remove">✕</button>`;
    cartItems.appendChild(line);
  });
}

// ---------- Events (delegation) ----------
grid.addEventListener("click", (e) => {
  if (e.target.matches(".add-btn")) {
    addToCart(e.target.dataset.id);
    openDrawer();
  }
});

cartItems.addEventListener("click", (e) => {
  if (e.target.matches(".cart-line__rm")) {
    removeFromCart(Number(e.target.dataset.index));
  }
});

function openDrawer() { drawer.classList.add("open"); drawer.setAttribute("aria-hidden", "false"); }
function closeDrawer() { drawer.classList.remove("open"); drawer.setAttribute("aria-hidden", "true"); }

document.getElementById("cartBtn").addEventListener("click", openDrawer);
document.getElementById("cartClose").addEventListener("click", closeDrawer);
document.getElementById("cartScrim").addEventListener("click", closeDrawer);

document.getElementById("checkoutBtn").addEventListener("click", () => {
  if (cart.length === 0) return;
  alert("This is a demo store — checkout isn't connected to a real payment system yet. 💜");
});

// ---------- Newsletter ----------
document.getElementById("newsletterForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  document.getElementById("formMsg").textContent = `Thanks! ${email} is on the list. 🎧`;
  e.target.reset();
});

// ---------- Misc ----------
document.getElementById("year").textContent = new Date().getFullYear();
renderCart();
