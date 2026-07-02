// ===================================================================
// API.JS - Funksione ndihmese qe komunikojne me backend
// Cdo funksion ben nje "fetch" te nje endpoint te backend-it
// React komponentet i thirrjne keto funksione (jo fetch drejtperdrejt)
// ===================================================================

// Path-i baze i API-se
// Vlere bosh sepse Vite proxy ridrejton /api -> http://localhost:5000/api
const API_BASE = "/api";

// ===================================================================
// PRODUKTET
// ===================================================================

// -------------------------------------------------------------------
// fetchProducts - Merr te gjitha produktet (ose vetem nje kategori)
// -------------------------------------------------------------------
// Argument: cat (opsionale) - filtro sipas kategorise
// Kthen: { count, products: [...] }
export async function fetchProducts(cat) {
  // Ndertojme URL-ne (me ose pa parameter cat)
  // P.sh.: /api/products  ose  /api/products?cat=hoodies
  const url = cat
    ? `${API_BASE}/products?cat=${cat}`
    : `${API_BASE}/products`;

  // Bejme kerkesen HTTP (GET nga default)
  const response = await fetch(url);

  // Nese serveri kthen error, e ndalojme
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  // Kthejme te dhenat si JSON
  return response.json();
}

// -------------------------------------------------------------------
// fetchProductById - Merr nje produkt te vetem
// -------------------------------------------------------------------
// Argument: id - numri i produktit (p.sh. 1, 2, ...)
// Kthen: { product: { id, name, price, ... } }
export async function fetchProductById(id) {
  const response = await fetch(`${API_BASE}/products/${id}`);

  if (!response.ok) {
    throw new Error("Product not found");
  }

  return response.json();
}

// ===================================================================
// SHPORTA (CART)
// ===================================================================

// -------------------------------------------------------------------
// fetchCart - Merr permbajtjen e shportes
// -------------------------------------------------------------------
export async function fetchCart() {
  const response = await fetch(`${API_BASE}/cart`);
  return response.json();
}

// -------------------------------------------------------------------
// addToCart - Shton nje produkt ne shporte
// -------------------------------------------------------------------
// Argument: productId - id e produktit qe duam te shtojme
export async function addToCart(productId) {
  // POST me body JSON
  const response = await fetch(`${API_BASE}/cart`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId })
  });

  if (!response.ok) {
    throw new Error("Failed to add to cart");
  }

  return response.json();
}

// -------------------------------------------------------------------
// removeFromCart - Heq nje produkt nga shporta
// -------------------------------------------------------------------
export async function removeFromCart(productId) {
  const response = await fetch(`${API_BASE}/cart/${productId}`, {
    method: "DELETE"
  });

  return response.json();
}

// ===================================================================
// KONTAKT
// ===================================================================

// -------------------------------------------------------------------
// sendContactMessage - Dergon nje mesazh nga forma e kontaktit
// -------------------------------------------------------------------
// Argument: data = { name, email, topic, message }
export async function sendContactMessage(data) {
  const response = await fetch(`${API_BASE}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // Konverton objektin JavaScript ne string JSON per ta derguar
    body: JSON.stringify(data)
  });

  return response.json();
}

// ===================================================================
// NEWSLETTER
// ===================================================================

// -------------------------------------------------------------------
// subscribeNewsletter - Regjistron nje email per newsletter
// -------------------------------------------------------------------
// Argument: email - email-i qe do te regjistrohet
export async function subscribeNewsletter(email) {
  const response = await fetch(`${API_BASE}/newsletter`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  });

  return response.json();
}