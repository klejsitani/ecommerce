// ===================================================================
// CONTACT.JSX - Faqja e kontaktit me forme + info te kontaktit
// URL: /contact
// Forma dergon te dhenat ne backend te /api/contact (POST)
// ===================================================================

import { useState } from "react";
import Footer from "../components/Footer";
import { sendContactMessage } from "../data/api";
import { showToast } from "../components/Toast";

export default function Contact() {
  // State per te dhenat e formes
  // Eshte nje objekt me 4 fusha
  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: "Product question",
    message: ""
  });

  // State per te ditur nese po dergon (per te bllokuar butonin)
  const [sending, setSending] = useState(false);

  // Funksioni qe perditeson nje fushe te formes
  // Quhet sa here qe user-i shkruan te nje input
  function update(field, value) {
    // setForm me funksion qe merr state-in e kaluar dhe kthen te ri
    // ...prev = kopjojme te gjithe state-in, pastaj override field
    setForm(prev => ({ ...prev, [field]: value }));
  }

  // Funksioni qe ekzekutohet kur user-i klikon "Send"
  async function handleSubmit(e) {
    e.preventDefault(); // ndalojme reload-in default te form-es
    setSending(true); // bllokojme butonin

    try {
      // Dergojme te dhenat te API
      const result = await sendContactMessage(form);

      if (result.success) {
        // Tregojme mesazh suksesi
        showToast("Message sent. Thank you.");
        // Pastrojme formen
        setForm({ name: "", email: "", topic: "Product question", message: "" });
      } else {
        showToast(result.error || "Something went wrong");
      }
    } catch (err) {
      showToast("Server did not respond");
    } finally {
      // Hap butonin per perdorim te ri (qofte sukses ose gabim)
      setSending(false);
    }
  }

  return (
    <>
      <section className="contact">
        <div className="contact__grid">

          {/* ANESORJA E MAJTE - info e kontaktit */}
          <div>
            <span className="eyebrow">/ Contact · 2026</span>
            <h1 className="contact__title">Let's<br /><em>talk.</em></h1>
            <p className="contact__lead">
              Got a product question? Idea for a collab? Or just want to tell us you saw someone wearing
              our hoodie yesterday? Write to us — we read every message, even the angry ones.
            </p>

            {/* INFO E DETAJUAR - email, telefon, adrese, etj. */}
            <div className="contact-info">
              <div className="contact-info__row">
                <span className="contact-info__label">Email</span>
                <span className="contact-info__val">hello@street.al</span>
              </div>
              <div className="contact-info__row">
                <span className="contact-info__label">Phone</span>
                <span className="contact-info__val">+355 69 000 0000</span>
              </div>
              <div className="contact-info__row">
                <span className="contact-info__label">Studio</span>
                <span className="contact-info__val">Rr. Myslym Shyri 14, Tirana 1001</span>
              </div>
              <div className="contact-info__row">
                <span className="contact-info__label">Hours</span>
                <span className="contact-info__val">Mon–Fri · 10:00 — 19:00</span>
              </div>
              <div className="contact-info__row">
                <span className="contact-info__label">Press</span>
                <span className="contact-info__val">press@street.al</span>
              </div>
            </div>
          </div>

          {/* ANESORJA E DJATHTE - forma e kontaktit */}
          <form className="contact__form" onSubmit={handleSubmit}>

            {/* FUSHA: Emri */}
            <div className="field">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="What should we call you"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                required
              />
            </div>

            {/* FUSHA: Email */}
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="you@email.com"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                required
              />
            </div>

            {/* FUSHA: Tema (dropdown) */}
            <div className="field">
              <label htmlFor="topic">Topic</label>
              <select
                id="topic"
                value={form.topic}
                onChange={(e) => update("topic", e.target.value)}
              >
                <option style={{ background: "#0c0c0c" }}>Product question</option>
                <option style={{ background: "#0c0c0c" }}>Order and shipping</option>
                <option style={{ background: "#0c0c0c" }}>Collaboration</option>
                <option style={{ background: "#0c0c0c" }}>Press / Media</option>
                <option style={{ background: "#0c0c0c" }}>Other</option>
              </select>
            </div>

            {/* FUSHA: Mesazhi (textarea) */}
            <div className="field">
              <label htmlFor="msg">Message</label>
              <textarea
                id="msg"
                placeholder="Write to us what's on your mind..."
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                required
              />
            </div>

            {/* BUTONI - tregon mesazh ndryshme kur po dergon */}
            <button
              type="submit"
              className="btn"
              disabled={sending}
              style={{ marginTop: 12, alignSelf: "flex-start" }}
            >
              {sending ? "Sending..." : "Send message →"}
            </button>
          </form>
        </div>
      </section>

      <Footer minimal />
    </>
  );
}