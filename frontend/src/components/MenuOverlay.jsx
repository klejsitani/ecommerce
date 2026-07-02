// ===================================================================
// MENUOVERLAY.JSX - Menu i madh qe hapet kur klikon 3 vizat
// Permban: butonin X (mbyll), search bar, navigim, footer
// ===================================================================

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../data/CartContext";
import { fetchProducts } from "../data/api";

// Komponenti merr nje prop "onClose" - funksioni qe mbyll menu-ne
export default function MenuOverlay({ onClose }) {
  // Marrim "count" nga shporta (numri i produkteve aktualisht)
  const { count } = useCart();

  // useNavigate per te bere navigim me kod (kur klikon nje produkt te search)
  const navigate = useNavigate();

  // State per fjalen qe shkruan user-i ne search bar
  const [searchQuery, setSearchQuery] = useState("");

  // State per te gjitha produktet (do i marrim nje here nga API)
  const [allProducts, setAllProducts] = useState([]);

  // useEffect qe ekzekutohet kur menu hapet - marrim produktet nga API
  useEffect(() => {
    fetchProducts()
      .then(data => setAllProducts(data.products))
      .catch(err => console.error(err));
  }, []);

  // Lista e linkeve qe do shfaqim ne menu
  const links = [
    { num: "01", label: "Home",     to: "/" },
    { num: "02", label: "Shop",     to: "/shop" },
    { num: "03", label: "Manifest", to: "/manifest" },
    { num: "04", label: "Contact",  to: "/contact" }
  ];

  // Filtrim live - kthen produktet qe permbajne fjalen e kerkimit
  // toLowerCase() = bejme te dyja te vogla per kerkim "case-insensitive"
  const filteredProducts = searchQuery.trim() === ""
    ? []
    : allProducts.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.cat.toLowerCase().includes(searchQuery.toLowerCase())
      );

  // Funksioni qe ekzekutohet kur klikon mbi nje produkt nga search
  function handleProductClick(productId) {
    onClose(); // mbyll menu-ne
    navigate(`/product/${productId}`); // shko te faqja e produktit
  }

  return (
    <aside className="menu-overlay">

      {/* BUTONI X per te mbyllur menu-ne (lart djathtas) */}
      <button
        className="menu-overlay__close"
        onClick={onClose}
        aria-label="Close menu"
      >
        ×
      </button>

      {/* KOKA E MENU - emri i markes + label */}
      <div className="menu-overlay__head">
        <span className="menu-overlay__brand">STREET</span>
        <span className="menu-overlay__label">Menu · 2026</span>
      </div>

      {/* SEARCH BAR */}
      <div className="menu-overlay__search">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="menu-overlay__search-input"
          autoFocus
        />

        {/* Rezultatet e kerkimit - shfaqen vetem nese ka tekst */}
        {searchQuery.trim() !== "" && (
          <div className="menu-overlay__search-results">
            {filteredProducts.length === 0 ? (
              <div className="menu-overlay__search-empty">
                No products found for "{searchQuery}"
              </div>
            ) : (
              <ul>
                {filteredProducts.slice(0, 6).map(p => (
                  <li key={p.id}>
                    <button
                      onClick={() => handleProductClick(p.id)}
                      className="menu-overlay__search-item"
                    >
                      <span className="result-name">{p.name}</span>
                      <span className="result-price">{p.price} €</span>
                    </button>
                  </li>
                ))}
                {filteredProducts.length > 6 && (
                  <li className="menu-overlay__search-more">
                    +{filteredProducts.length - 6} more results
                  </li>
                )}
              </ul>
            )}
          </div>
        )}
      </div>

      {/* NAVIGIMI KRYESOR me 4 linket */}
      <nav className="menu-overlay__nav">
        <ol>
          {links.map(link => (
            <li key={link.to}>
              <Link to={link.to} onClick={onClose}>
                <span className="num">{link.num}</span>
                <span className="lbl">{link.label}</span>
              </Link>
            </li>
          ))}
        </ol>
      </nav>

      {/* FUNDI I MENU - tekst i shkurter + butoni i shportes */}
      <div className="menu-overlay__footer">
        <div>
          <span className="eyebrow">/ 8 shops · 1 avenue</span>
          <p>Street style, no compromise. Join the next drop.</p>
        </div>
        <Link to="/shop" onClick={onClose} className="menu-overlay__cart">
          Cart [{count}]
        </Link>
      </div>
    </aside>
  );
}