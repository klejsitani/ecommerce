// ===================================================================
// PRODUCTDETAIL.JSX - Faqja e detajeve te nje produkti te vetem
// URL: /product/1, /product/2, etc.
// ===================================================================

import { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import Footer from "../components/Footer";
import { fetchProductById } from "../data/api";
import { useCart } from "../data/CartContext";
import { showToast } from "../components/Toast";
// Sjellim funksionet ndihmese per fotot
import { getImagesForColor, hasImages, getPriceForColor } from "../data/images";

// Fjalor qe perkthen kategorite teknike ne emra anglisht
const CAT_LABELS = {
  hoodies: "Hoodies", tshirts: "T-shirts", trousers: "Trousers",
  sweatpants: "Sweatpants", pants: "Pants", atlete: "Sneakers",
  parfume: "Fragrances", corape: "Socks"
};

// Funksion qe formaton cmimin (54 -> "54 €")
function formatPrice(n) {
  return n + " €";
}

// Funksion qe percakton madhesinet sipas kategorise
// - atlete (sneakers): numra 40, 40.5, 41, etc.
// - corape (socks): vetem 40-45
// - parfume (fragrances): 50ml, 100ml
// - te tjera: XS, S, M, L, XL, XXL
function getSizesForCategory(cat) {
  if (cat === "atlete") {
    return ["40", "40.5", "41", "41.5", "42", "42.5", "43", "44", "45"];
  }
  if (cat === "corape") {
    return ["40-45"];
  }
  if (cat === "parfume") {
    return ["50ml", "100ml"];
  }
  return ["XS", "S", "M", "L", "XL", "XXL"];
}

// Funksion qe percakton madhesine default per cdo kategori
function getDefaultSize(cat) {
  if (cat === "atlete") return "42";
  if (cat === "corape") return "40-45";
  if (cat === "parfume") return "50ml";
  return "M";
}

export default function ProductDetail() {
  // Marrim parametrin :id nga URL
  const { id } = useParams();

  // Marrim funksionin add nga shporta
  const { add } = useCart();

  // State per produktin qe do shfaqim
  const [product, setProduct] = useState(null);
  // State per loading
  const [loading, setLoading] = useState(true);

  // State per ngjyren e zgjedhur (key, p.sh. "black")
  const [selectedColor, setSelectedColor] = useState(null);
  // State per thumbnail-in aktiv (cila foto eshte e madhe)
  const [activeThumb, setActiveThumb] = useState(0);
  // State per madhesine e zgjedhur
  const [selectedSize, setSelectedSize] = useState("M");

  // useEffect ekzekutohet kur faqja hapet ose ID ndryshon
  useEffect(() => {
    fetchProductById(id)
      .then(data => {
        setProduct(data.product);
        // Cakto madhesinen default sipas kategorise
        setSelectedSize(getDefaultSize(data.product.cat));
        // Cakto ngjyren e pare si default (nese ka)
        if (data.product.images && data.product.images.colors && data.product.images.colors.length > 0) {
          setSelectedColor(data.product.images.colors[0].key);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  // Llogarit fotot per ngjyren aktive
  // useMemo = ruaj llogarine deri sa product ose selectedColor ndryshon
  const images = useMemo(() => {
    if (!product || !selectedColor) return [];
    return getImagesForColor(product, selectedColor);
  }, [product, selectedColor]);

  // Llogarit cmimin aktual (varet nga ngjyra e zgjedhur)
  const currentPrice = useMemo(() => {
    if (!product) return 0;
    if (selectedColor) {
      return getPriceForColor(product, selectedColor);
    }
    return product.price;
  }, [product, selectedColor]);

  // Funksion qe ekzekutohet kur user-i klikon "Add to cart"
  async function handleAddToCart() {
    if (!product) return;
    try {
      await add(product.id);
      showToast("Added to cart");
    } catch (err) {
      showToast("Error - please try again");
    }
  }

  // Funksion qe ekzekutohet kur user-i ndryshon ngjyren
  function handleColorChange(colorKey) {
    setSelectedColor(colorKey);
    // Reset thumb-in tek e para
    setActiveThumb(0);
  }

  // Nese po ngarkohet ende, trego mesazh
  if (loading) {
    return (
      <section className="product-detail">
        <div style={{ textAlign: "center", padding: 80, color: "var(--cream-dim)" }}>
          Loading...
        </div>
      </section>
    );
  }

  // Nese produkti nuk u gjet
  if (!product) {
    return (
      <section className="product-detail">
        <div style={{ textAlign: "center", padding: 80 }}>
          <h2 className="h-display" style={{ fontSize: 48 }}>Product not found</h2>
          <Link to="/shop" className="btn" style={{ marginTop: 20 }}>← Back to shop</Link>
        </div>
      </section>
    );
  }

  // Kontrollojme nese produkti ka foto reale
  const productHasImages = hasImages(product);
  // Madhesite e disponueshme sipas kategorise
  const sizes = getSizesForCategory(product.cat);
  // Vetem produktet jo-parfume kane ngjyra te shfaqshme
  const showColors = product.cat !== "parfume";

  return (
    <>
      <section className="product-detail">
        <div className="pd__grid">

          {/* GALERIA E IMAZHEVE (anesorja e majte) */}
          <div className="pd__gallery">

            {/* THUMBNAILS (kolonen e majte) */}
            <div className="pd__thumbs">
              {productHasImages ? (
                // Nese ka foto reale, krijo thumbnail per cdo foto
                images.map((imgSrc, i) => (
                  <div
                    key={i}
                    className={`pd__thumb ${activeThumb === i ? "active" : ""}`}
                    onClick={() => setActiveThumb(i)}
                  >
                    <img src={imgSrc} alt={`thumbnail ${i + 1}`} />
                  </div>
                ))
              ) : (
                // Nese s'ka foto, trego 4 thumbnails coming-soon
                [0, 1, 2, 3].map(i => (
                  <div
                    key={i}
                    className={`pd__thumb ${activeThumb === i ? "active" : ""}`}
                    onClick={() => setActiveThumb(i)}
                  >
                    <img src="/images/products/coming-soon.avif" alt="coming soon" />
                  </div>
                ))
              )}
            </div>

            {/* FOTO KRYESORE (e madhe) */}
            <div className={`pd__main-image ${product.klasa}`}>
              {productHasImages && images[activeThumb] ? (
                <img
                  src={images[activeThumb]}
                  alt={product.name}
                  className="pd__photo"
                />
              ) : (
                <img
                  src="/images/products/coming-soon.avif"
                  alt="Coming soon"
                  className="pd__photo pd__photo--coming"
                />
              )}
              {/* Tag-u (New, Drop 04, etc.) */}
              <span className="product__tag product__tag--new" style={{ top: 20, left: 20, position: "absolute", zIndex: 3 }}>
                {product.tag}
              </span>
            </div>
          </div>

          {/* INFORMACIONI I PRODUKTIT (anesorja e djathte) */}
          <div className="pd__info">
            <span className="eyebrow">/ {CAT_LABELS[product.cat]} · Drop 04</span>
            <h1 className="pd__title">{product.name}</h1>
            <div className="pd__price">{formatPrice(currentPrice)}</div>

            <p className="pd__desc">{product.desc}</p>

            {/* ZGJEDHJA E MADHESISE */}
            <div className="pd__options">
              <div className="pd__options-title">Size</div>
              <div className="size-grid">
                {sizes.map(s => (
                  <button
                    key={s}
                    className={`size-btn ${selectedSize === s ? "active" : ""}`}
                    onClick={() => setSelectedSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* ZGJEDHJA E NGJYRES - vetem nese produkti nuk eshte parfum */}
            {showColors && (
              <div className="pd__options">
                <div className="pd__options-title">Color</div>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {productHasImages ? (
                    // Nese ka foto, trego ngjyrat reale nga products.json
                    product.images.colors.map(color => (
                      <button
                        key={color.key}
                        className={`color-btn ${selectedColor === color.key ? "active" : ""}`}
                        style={{ background: color.hex }}
                        onClick={() => handleColorChange(color.key)}
                        aria-label={color.name}
                        title={color.name}
                      />
                    ))
                  ) : (
                    // Nese s'ka foto, trego ngjyra defaullt
                    [
                      { hex: "#0c0c0c", name: "Black" },
                      { hex: "#ede4d3", name: "Cream" },
                      { hex: "#ff3d00", name: "Orange" },
                      { hex: "#4a4a4a", name: "Gray" }
                    ].map((color, i) => (
                      <button
                        key={i}
                        className="color-btn"
                        style={{ background: color.hex }}
                        aria-label={color.name}
                        title={color.name}
                      />
                    ))
                  )}
                </div>
              </div>
            )}

            {/* BUTONAT */}
            <div className="pd__buy">
              <button className="btn" onClick={handleAddToCart}>
                Add to cart →
              </button>
              <button className="btn btn--ghost">Save ♡</button>
            </div>

            {/* ACCORDION ME DETAJE */}
            <div className="pd__accordion">
              <details open>
                <summary>Details</summary>
                <p>{product.desc}</p>
              </details>
              <details>
                <summary>Size and fit</summary>
                <p>Loose fit. If you are between sizes, choose the bigger one. Model in photo: 1.82m, wears size M.</p>
              </details>
              <details>
                <summary>Care</summary>
                <p>Wash at 30°C. No softener. Air dry. Nothing complicated.</p>
              </details>
              <details>
                <summary>Shipping and returns</summary>
                <p>Shipping within Europe 2-4 days. Free over 60 €. Returns within 14 days, free.</p>
              </details>
            </div>
          </div>
        </div>
      </section>

      <Footer minimal />
    </>
  );
}