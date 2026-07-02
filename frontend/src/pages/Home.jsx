// ===================================================================
// HOME.JSX - Faqja kryesore (faqja qe hapet kur shkon te /)
// Permban: StreetScene, marquee, produktet e zgjedhura, manifesto, newsletter
// ===================================================================

import { useEffect, useState } from "react";
import StreetScene from "../components/StreetScene";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import { fetchProducts, subscribeNewsletter } from "../data/api";
import { showToast } from "../components/Toast";

export default function Home() {
  // State per produktet e zgjedhura (nje nga cdo kategori)
  const [featured, setFeatured] = useState([]);

  // State per email-in qe shkruan user-i ne newsletter
  const [email, setEmail] = useState("");

  // useEffect ekzekutohet kur faqja hapet
  useEffect(() => {
    // Therrasim API per te marre te gjitha produktet
    fetchProducts().then(data => {
      // Krijojme nje Set per te mbajtur kategorite qe kemi pare
      const seenCats = new Set();
      // Lista e produkteve te zgjedhur (nje per kategori)
      const oneFromEach = [];

      // Per cdo produkt, nese kategoria e tij nuk eshte pare ende, shtoje
      for (const p of data.products) {
        if (!seenCats.has(p.cat)) {
          seenCats.add(p.cat);
          oneFromEach.push(p);
        }
      }

      // Vendos produktet e zgjedhur ne state
      setFeatured(oneFromEach);
    }).catch(console.error);
  }, []); // [] do thote: ekzekutoje vetem nje here ne fillim

  // Funksioni qe ekzekutohet kur user-i klikon "Join"
  async function handleSubscribe(e) {
    e.preventDefault(); // ndalojme reload-in default te form-es
    try {
      // Dergojme email-in te API
      const result = await subscribeNewsletter(email);
      if (result.success) {
        // Tregojme mesazh suksesi
        showToast("Welcome to STREET");
        // Pastrojme fushen
        setEmail("");
      } else {
        showToast(result.error || "Something went wrong");
      }
    } catch (err) {
      showToast("Server did not respond");
    }
  }

  return (
    <>
      {/* SKENA E RRUGES me 8 hotspots */}
      <StreetScene />

      {/* MARQUEE - tekst qe levizet horizontalisht (animacion) */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          <span>Made for the street</span>
          <span>Drop 04 live now</span>
          <span>Free shipping over 60 €</span>
          <span>8 shops · 1 avenue</span>
          <span>Limited edition</span>
          <span>Made for the street</span>
          <span>Drop 04 live now</span>
          <span>Free shipping over 60 €</span>
          <span>8 shops · 1 avenue</span>
          <span>Limited edition</span>
        </div>
      </div>

      {/* PRODUKTET E ZGJEDHURA - nje per cdo kategori */}
      <section className="featured">
        <div className="section-head reveal is-visible">
          <h2 className="section-head__title">Drop <em>04</em></h2>
          <div className="section-head__desc">
            <span className="eyebrow">/ 02 — New arrivals</span>
            One product from each shop. Limited quantities. Some will never come back.
          </div>
        </div>

        {/* Lista e produkteve duke perdorur ProductCard */}
        <div className="products">
          {featured.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* MANIFESTO - tekst me filozofine e markes */}
      <section className="manifesto" id="manifesto">
        <div className="manifesto__inner">
          <h2 className="manifesto__lead reveal is-visible">
            We don't <em>sell clothes.</em><br />
            We sell <em>attitude.</em>
          </h2>

          <div className="manifesto__body reveal is-visible">
            <p>
              STREET was founded in 2022 in Tirana, by a group of girls and guys who were tired of
              expensive brands that claimed to understand the street, but had never seen it up close.
            </p>
            <p>
              Every product we drop is a reaction — against uniformity, against the rush, against fast-fashion
              that forgets what it means to be authentic. We work with local makers, with materials that last,
              and with design that does not apologize.
            </p>
            <p>
              So this is not an e-commerce site. This is an invitation. Step in. Try it. Have an opinion.
            </p>

            {/* STATISTIKAT - 3 numra kryesore */}
            <div className="stats">
              <div>
                <div className="stat__num">08</div>
                <div className="stat__label">Shops · 1 avenue</div>
              </div>
              <div>
                <div className="stat__num">12K</div>
                <div className="stat__label">Global customers</div>
              </div>
              <div>
                <div className="stat__num">100%</div>
                <div className="stat__label">Made local</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER - form per t'u abonuar */}
      <section className="newsletter">
        <h2 className="newsletter__title">Join the street.</h2>
        <p className="newsletter__sub">Drops before others. Private promos. Zero spam.</p>
        <form className="newsletter__form" onSubmit={handleSubscribe}>
          <input
            type="email"
            placeholder="YOUR EMAIL"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Join →</button>
        </form>
      </section>

      <Footer />
    </>
  );
}