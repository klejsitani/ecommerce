// ===================================================================
// SHOP.JSX - Faqja qe shfaq te gjitha produktet me filtra
// URL: /shop ose /shop?cat=hoodies (per nje kategori specifike)
// ===================================================================

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import { fetchProducts } from "../data/api";

// Lista e kategorive me emrat ne anglisht
// key = vlera teknike (lidhet me products.json)
// name = emri qe del te user-i
const CATEGORIES = [
  { key: "hoodies",    name: "Hoodies" },
  { key: "tshirts",    name: "T-shirts" },
  { key: "trousers",   name: "Trousers" },
  { key: "sweatpants", name: "Sweatpants" },
  { key: "pants",      name: "Pants" },
  { key: "atlete",     name: "Sneakers" },
  { key: "parfume",    name: "Fragrances" },
  { key: "corape",     name: "Socks" }
];

export default function Shop() {
  // Marrim parametrat nga URL (p.sh. ?cat=hoodies)
  const [searchParams] = useSearchParams();
  const initialCat = searchParams.get("cat");

  // State per te gjithe produktet (nga API)
  const [allProducts, setAllProducts] = useState([]);

  // State per kategorite e zgjedhura (Set)
  // Nese ka cat ne URL, perdor vetem ate. Perndryshe, te gjitha.
  const [activeCats, setActiveCats] = useState(
    initialCat
      ? new Set([initialCat])
      : new Set(CATEGORIES.map(c => c.key))
  );

  // State per loading (po ngarkohen produktet)
  const [loading, setLoading] = useState(true);

  // useEffect per te marre produktet nga API kur faqja hapet
  useEffect(() => {
    fetchProducts()
      .then(data => setAllProducts(data.products))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // useEffect per te ndryshuar filtrin kur URL ndryshon
  // (p.sh. nese user-i klikon nje hotspot tjeter)
  useEffect(() => {
    if (initialCat) {
      setActiveCats(new Set([initialCat]));
    } else {
      setActiveCats(new Set(CATEGORIES.map(c => c.key)));
    }
  }, [initialCat]);

  // Funksioni qe shton ose heq nje kategori nga filtrat
  function toggleCat(key) {
    const next = new Set(activeCats);
    if (next.has(key)) next.delete(key); // hiqe nese eshte
    else next.add(key); // shtoje nese nuk eshte
    setActiveCats(next);
  }

  // Filtron produktet bazuar te kategorite e zgjedhura
  const filtered = allProducts.filter(p => activeCats.has(p.cat));

  return (
    <>
      <section className="shop">
        {/* TITULLI I FAQES */}
        <div className="shop__head section-head">
          <h2 className="section-head__title">Shop <em>catalog</em></h2>
          <div className="section-head__desc">
            <span className="eyebrow">/ All · {allProducts.length} products · 8 shops</span>
            Filter by category, price or size. Or let your eyes wander freely.
          </div>
        </div>

        {/* LAYOUT - filtra majtas, produktet djathtas */}
        <div className="shop__layout">

          {/* FILTRAT (anesorja e majte) */}
          <aside className="shop__filters">
            <h4>Shop</h4>
            <div className="filter-group">
              {/* Krijojme nje checkbox per cdo kategori */}
              {CATEGORIES.map(c => (
                <label key={c.key}>
                  <input
                    type="checkbox"
                    checked={activeCats.has(c.key)}
                    onChange={() => toggleCat(c.key)}
                  />
                  {c.name}
                </label>
              ))}
            </div>

            <h4>Price</h4>
            <div className="filter-group">
              <label><input type="checkbox" /> Under 20 €</label>
              <label><input type="checkbox" /> 20 € — 60 €</label>
              <label><input type="checkbox" /> 60 € — 120 €</label>
              <label><input type="checkbox" /> Over 120 €</label>
            </div>

            <h4>Size</h4>
            <div className="filter-group">
              {["XS", "S", "M", "L", "XL"].map(s => (
                <label key={s}><input type="checkbox" /> {s}</label>
              ))}
            </div>
          </aside>

          {/* PRODUKTET (anesorja e djathte) */}
          <div className="shop__grid">
            {/* Nese po ngarkohen, trego mesazh */}
            {loading && (
              <div style={{ gridColumn: "1/-1", padding: "80px 0", textAlign: "center", color: "var(--cream-dim)", fontFamily: "var(--font-mono)", letterSpacing: ".2em", textTransform: "uppercase", fontSize: 12 }}>
                Loading...
              </div>
            )}
            {/* Nese nuk ka produkte qe perputhen me filtrat */}
            {!loading && filtered.length === 0 && (
              <div style={{ gridColumn: "1/-1", padding: "80px 0", textAlign: "center", color: "var(--cream-dim)", fontFamily: "var(--font-mono)", letterSpacing: ".2em", textTransform: "uppercase", fontSize: 12 }}>
                No products — try a different filter
              </div>
            )}
            {/* Shfaq produktet duke perdorur ProductCard */}
            {!loading && filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      <Footer minimal />
    </>
  );
}