// ===================================================================
// ROUTES/NEWSLETTER.JS - API per abonime ne newsletter
// Trajton kerkesat qe nisin me /api/newsletter
//
// Email-et ruhen ne file subscribers.json
// Kontrollohen per duplikate - nuk lejon te njejtin email dy here
// ===================================================================

import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const subscribersPath = path.join(__dirname, "..", "data", "subscribers.json");

// ===== FUNKSIONE NDIHMESE =====

function readSubscribers() {
  if (!fs.existsSync(subscribersPath)) {
    return [];
  }

  const raw = fs.readFileSync(subscribersPath, "utf-8");
  if (!raw.trim()) {
    return [];
  }

  return JSON.parse(raw);
}

function writeSubscribers(subscribers) {
  fs.writeFileSync(subscribersPath, JSON.stringify(subscribers, null, 2));
}

// ===== VALIDIM I EMAIL-IT =====
// Regex i thjeshte qe verifikon formatin baze te email-it
function isValidEmail(email) {
  // ^ - fillim string
  // [^\s@]+ - nje ose me shume karaktere qe nuk jane hapesire ose @
  // @ - duhet te kete @
  // \. - duhet te kete pike (escape me \)
  // $ - fund string
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// ===================================================================
// POST /api/newsletter - Regjistro nje email te ri
// Body: { email: string }
// ===================================================================
router.post("/", (req, res) => {
  try {
    const { email } = req.body;

    // Validimi 1 - email duhet te jete i pranishem
    if (!email) {
      return res.status(400).json({
        success: false,
        error: "Email is required"
      });
    }

    // Validimi 2 - email duhet te kete format te sakte
    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        error: "Invalid email format"
      });
    }

    const subscribers = readSubscribers();

    // Kontrollojme nese email ekziston tashme (case-insensitive)
    const exists = subscribers.some(
      s => s.email.toLowerCase() === email.toLowerCase()
    );

    if (exists) {
      return res.status(409).json({
        success: false,
        error: "Email already subscribed"
      });
    }

    // Shtojme email-in e ri
    const newSubscriber = {
      id: Date.now(),
      email,
      subscribedAt: new Date().toISOString()
    };

    subscribers.push(newSubscriber);
    writeSubscribers(subscribers);

    res.json({
      success: true,
      message: "Successfully subscribed!"
    });
  } catch (err) {
    console.error("Error subscribing:", err);
    res.status(500).json({
      success: false,
      error: "Failed to subscribe"
    });
  }
});

// ===================================================================
// GET /api/newsletter - Liste e abonentëve (per admin)
// ===================================================================
router.get("/", (req, res) => {
  try {
    const subscribers = readSubscribers();
    res.json({
      count: subscribers.length,
      subscribers
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;