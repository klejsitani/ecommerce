// ===================================================================
// ROUTES/PRODUCTS.JS - API per produktet
// Trajton kerkesat qe nisin me /api/products
// Lexon te dhenat nga products.json (jo database)
// ===================================================================

// Sjellja e paketave te nevojshme
import express from "express";
import fs from "fs";              // fs = file system, per te lexuar file-a
import path from "path";
import { fileURLToPath } from "url";

// Krijojme nje "mini-app" (router) per produktet
// E veshim me /api/products te server.js
const router = express.Router();

// ===== KONFIGURIM TE FILE PATHS =====
// Krijojme __dirname per ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path-i i plote te products.json
// .. shkon nje folder lart (nga routes/ ne backend/)
// pastaj /data/products.json
const dataPath = path.join(__dirname, "..", "data", "products.json");

// ===== FUNKSION NDIHMES =====
// Lexon products.json dhe kthen objektin JavaScript
function readData() {
  // fs.readFileSync lexon file-in sinkronisht (bllokues)
  // "utf-8" eshte enkodimi i tekstit
  const raw = fs.readFileSync(dataPath, "utf-8");
  // JSON.parse konverton string-un ne objekt JS
  return JSON.parse(raw);
}

// ===================================================================
// GET /api/products - Merr te gjitha produktet
// Mund te filtroje sipas kategorise me query parameter (?cat=hoodies)
// ===================================================================
router.get("/", (req, res) => {
  try {
    // Lexojme te dhenat nga JSON
    const { products } = readData();

    // Marrim parametrin "cat" nga URL
    // P.sh. /api/products?cat=hoodies -> cat = "hoodies"
    const { cat } = req.query;

    // Nese eshte specifikuar kategori, filtrojme
    if (cat) {
      const filtered = products.filter(p => p.cat === cat);
      return res.json({
        count: filtered.length,
        products: filtered
      });
    }

    // Perndryshe, kthe te gjitha
    res.json({
      count: products.length,
      products
    });
  } catch (err) {
    // Nese ka gabim ne lexim, kthe error
    console.error("Error reading products:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ===================================================================
// GET /api/products/categories - Liste e kategorive te disponueshme
// MUND OSE NUK MUND TE PERDORET nga frontend (eshte ekstra)
// MOS HARRO: Kjo duhet te jete PARA route-it /:id
// ===================================================================
router.get("/categories", (req, res) => {
  try {
    const { categories } = readData();
    res.json({ categories });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ===================================================================
// GET /api/products/:id - Merr nje produkt te vetem
// :id eshte parameter dinamik (p.sh. /api/products/1, /api/products/5)
// ===================================================================
router.get("/:id", (req, res) => {
  try {
    const { products } = readData();

    // Konvertojme :id ne numer (vjen si string nga URL)
    const id = parseInt(req.params.id);

    // Gjejme produktin me kete id
    const product = products.find(p => p.id === id);

    // Nese nuk u gjet, kthejme 404
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ product });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Eksportojme router-in qe te perdoret te server.js
export default router;