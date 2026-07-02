// ===================================================================
// ROUTES/CART.JS - API per shporten e blerjeve
// Trajton kerkesat qe nisin me /api/cart
//
// E rendesishme: Te dhenat ruhen ne MEMORIE, jo ne file
// Kjo do thote: kur ndalon serverin, shporta humbet
// Per nje aplikacion real, do duhej te ruheshin ne database
// ===================================================================

import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

// Konfigurim __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path-i te products.json (per te marre detajet e produktit)
const productsPath = path.join(__dirname, "..", "data", "products.json");

// ===== STATE I SHPORTES NE MEMORIE =====
// Kjo eshte nje array qe ruan id-te e produkteve ne shporte
// P.sh. [1, 2, 5, 1] = 4 produkte (1 i dyfishuar)
// Kur ndalon serveri, kjo zhduket
let cartItems = [];

// ===== FUNKSION NDIHMES =====
// Merr produktet komplete (jo vetem id) nga products.json
function getCartWithDetails() {
  // Lexojme products.json
  const raw = fs.readFileSync(productsPath, "utf-8");
  const { products } = JSON.parse(raw);

  // Per cdo id ne cartItems, gjejme produktin e plote
  const items = cartItems.map(id => products.find(p => p.id === id))
    // Filtrojme ata qe nuk u gjeten (mund te jene fshire)
    .filter(p => p);

  return items;
}

// ===================================================================
// GET /api/cart - Merr permbajtjen e shportes
// ===================================================================
router.get("/", (req, res) => {
  try {
    const items = getCartWithDetails();

    // Llogarit totalin e cmimit
    const total = items.reduce((sum, p) => sum + p.price, 0);

    res.json({
      count: items.length,
      items,
      total
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ===================================================================
// POST /api/cart - Shton nje produkt ne shporte
// Body: { productId: number }
// ===================================================================
router.post("/", (req, res) => {
  try {
    // Marrim productId nga body i kerkeses
    const { productId } = req.body;

    // Validimi - duhet te jete numer
    if (!productId || typeof productId !== "number") {
      return res.status(400).json({ error: "Invalid productId" });
    }

    // Shtojme ne array
    cartItems.push(productId);

    // Kthejme shporten e perditesuar
    const items = getCartWithDetails();
    res.json({
      success: true,
      count: items.length,
      items
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ===================================================================
// DELETE /api/cart/:productId - Heq nje produkt nga shporta
// Heq vetem nje kopje (jo te gjitha)
// ===================================================================
router.delete("/:productId", (req, res) => {
  try {
    const productId = parseInt(req.params.productId);

    // Gjejme indeksin e produktit ne array
    const index = cartItems.indexOf(productId);

    if (index === -1) {
      return res.status(404).json({ error: "Product not in cart" });
    }

    // Heqim nje element nga ai indeks
    cartItems.splice(index, 1);

    const items = getCartWithDetails();
    res.json({
      success: true,
      count: items.length,
      items
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ===================================================================
// DELETE /api/cart - Zbraz te gjithe shporten
// ===================================================================
router.delete("/", (req, res) => {
  cartItems = [];
  res.json({ success: true, count: 0, items: [] });
});

export default router;