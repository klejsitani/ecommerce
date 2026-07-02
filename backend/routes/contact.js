// ===================================================================
// ROUTES/CONTACT.JS - API per formen e kontaktit
// Trajton kerkesat qe nisin me /api/contact
//
// Mesazhet ruhen ne file messages.json
// Kjo eshte me e mire se memoria sepse mesazhet ruhen edhe pas restart
// Por per produksion do perdoreshim database
// ===================================================================

import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path-i ku ruajme mesazhet
const messagesPath = path.join(__dirname, "..", "data", "messages.json");

// ===== FUNKSIONE NDIHMESE =====

// Lexon mesazhet ekzistuese nga file
function readMessages() {
  // Nese file nuk ekziston, kthe array bosh
  if (!fs.existsSync(messagesPath)) {
    return [];
  }

  const raw = fs.readFileSync(messagesPath, "utf-8");

  // Nese file eshte bosh, kthe array bosh
  if (!raw.trim()) {
    return [];
  }

  return JSON.parse(raw);
}

// Shkruan mesazhet ne file
function writeMessages(messages) {
  // JSON.stringify(messages, null, 2) e formaton bukur me dhembe
  fs.writeFileSync(messagesPath, JSON.stringify(messages, null, 2));
}

// ===================================================================
// POST /api/contact - Prano nje mesazh te ri
// Body: { name, email, topic, message }
// ===================================================================
router.post("/", (req, res) => {
  try {
    const { name, email, topic, message } = req.body;

    // Validimi - te gjitha fushat duhet te jene plot
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: "Name, email, and message are required"
      });
    }

    // Lexojme mesazhet ekzistuese
    const messages = readMessages();

    // Krijojme nje mesazh te ri me detaje shtese
    const newMessage = {
      id: Date.now(),                 // Timestamp si id e vetme
      name,
      email,
      topic: topic || "General",
      message,
      createdAt: new Date().toISOString()  // Data e tanishme
    };

    // Shtojme te lista
    messages.push(newMessage);

    // Ruajme ne file
    writeMessages(messages);

    // Kthejme sukses
    res.json({
      success: true,
      message: "Message received. Thank you!"
    });
  } catch (err) {
    console.error("Error saving message:", err);
    res.status(500).json({
      success: false,
      error: "Failed to save message"
    });
  }
});

// ===================================================================
// GET /api/contact - Liste e te gjithe mesazheve (per admin)
// Ne nje aplikacion real do duhej autentifikim
// ===================================================================
router.get("/", (req, res) => {
  try {
    const messages = readMessages();
    res.json({
      count: messages.length,
      messages
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;