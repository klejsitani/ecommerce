// ===================================================================
// SERVER.JS - Pikenisja e backend-it
// Ky file ekzekutohet kur thirret "npm start"
// Pergjigjet per:
//   - Krijimin e aplikacionit Express
//   - Aktivizimin e middleware (CORS, JSON)
//   - Lidhjen e route-ave me URL-te
//   - Nisjen e serverit ne port 5000
// ===================================================================

// ===== SJELLJA E PAKETAVE =====

// Express - biblioteka kryesore qe na ndihmon te krijojme nje server web
import express from "express";

// CORS - lejon frontend-in (port 5173) te bashkebisedoje me backend (port 5000)
// Pa CORS, browser-i bllokon kerkesat nga origje te ndryshme per arsye sigurie
import cors from "cors";

// Path utilities - ndihmojne me file-paths te Node.js
import path from "path";
import { fileURLToPath } from "url";

// ===== SJELLJA E ROUTE-AVE =====
// Cdo router ka funksionet per nje pjese specifike te API
import productsRouter from "./routes/products.js";
import cartRouter from "./routes/cart.js";
import contactRouter from "./routes/contact.js";
import newsletterRouter from "./routes/newsletter.js";

// ===== KONFIGURIM TE FILE PATHS =====
// Meqe perdorim ES Modules (import), nuk kemi __dirname te gatshem
// Keto rreshta e krijojne ate manualisht
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ===== KRIJIMI I APLIKACIONIT =====

// Krijojme aplikacionin Express - zemra e serverit
const app = express();

// Porti ku do degjoje serveri
// process.env.PORT lejon te ndryshojme portin me nje variable mjedisi
// Nese nuk eshte caktuar, perdor 5000 si default
const PORT = process.env.PORT || 5000;

// ===== MIDDLEWARE =====
// Middleware = funksione qe ekzekutohen para se te arrije kerkesa te route-at
// Mendoji si "filter" qe pergatit kerkesen ose pergjigjen

// Aktivizojme CORS per te gjitha kerkesat
// Tani frontend mund te therrese backend pa probleme sigurie
app.use(cors());

// Bejme te mundur qe serveri te kuptoje JSON ne body te kerkeses
// P.sh. kur frontend dergon formen e kontaktit, te dhenat vijne si JSON
app.use(express.json());

// ===== ROUTES =====

// Route per faqen kryesore - vetem per test
// Kur dikush hap http://localhost:5000/ do shohe ket pergjigje
app.get("/", (req, res) => {
  res.json({
    name: "RRUGA Backend API",
    status: "online",
    message: "The server is working!",
    endpoints: {
      products: "/api/products",
      cart: "/api/cart",
      contact: "/api/contact",
      newsletter: "/api/newsletter"
    }
  });
});

// Lidhim cdo router me prefiksin e tij
// Cdo kerkese qe nis me /api/products do trajtohet nga productsRouter
app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);
app.use("/api/contact", contactRouter);
app.use("/api/newsletter", newsletterRouter);

// ===== ERROR HANDLING =====
// Middleware per gabime - ekzekutohet nese nje route hedh nje gabim
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ error: "Internal server error" });
});

// 404 - cdo URL qe nuk eshte gjetur
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// ===== START SERVER =====
// Themi serverit te filloje degimi ne portin e percaktuar
// Funksioni callback ekzekutohet sapo serveri eshte gati
app.listen(PORT, () => {
  console.log("");
  console.log("===========================================");
  console.log("  RRUGA Backend API is live!");
  console.log("  -> http://localhost:" + PORT);
  console.log("  -> API: http://localhost:" + PORT + "/api");
  console.log("===========================================");
  console.log("");
});