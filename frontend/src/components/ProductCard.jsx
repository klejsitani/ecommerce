// ===================================================================
// PRODUCTCARD.JSX - Komponenti qe shfaq nje produkt te vetem
// Perdoret te lista e produkteve (te Shop dhe Home)
// ===================================================================

// Sjellim Link nga react-router-dom per te beje navigim pa reload
import { Link } from "react-router-dom";

// Sjellim funksionin qe gjeneron path-in e fotos kryesore
import { getMainImage } from "../data/images";

// Krijojme nje "fjalor" qe perkthen key-t teknike (cat) ne emra te lexueshem
// P.sh. "atlete" -> "Sneakers" qe te duket bukur ne ekran
const CAT_LABELS = {
  hoodies:    "Hoodies",
  tshirts:    "T-shirts",
  trousers:   "Trousers",
  sweatpants: "Sweatpants",
  pants:      "Pants",
  atlete:     "Sneakers",
  parfume:    "Fragrances",
  corape:     "Socks"
};

// Funksion ndihmes qe formaton cmimin
// Merr nje numer (p.sh. 54) dhe kthen "54 €" me simbolin e euros
function formatPrice(n) {
  return n + " €";
}

// Eksportojme komponentin default
// {product} eshte "destructuring" - marrim product-in nga props
export default function ProductCard({ product }) {
  // Marrim te dhenat e produktit nga objekti
  const { id, name, cat, price, tag, klasa } = product;

  // Marrim path-in e fotos duke perdorur funksionin tone ndihmes
  // Nese produkti ka foto reale -> /images/products/1/black-1.avif
  // Nese jo -> /images/products/coming-soon.avif
  const imageSrc = getMainImage(product);

  // Kontrollojme nese fotoja eshte coming-soon (per stilizim te ndryshem)
const isComingSoon = !product.images || !product.images.colors || product.images.colors.length === 0;

  // Percaktojme klasen CSS te tag-ut bazuar ne llojin e tij
  // P.sh. nese eshte "Limited" -> stilizohet ndryshe nga "New"
  const tagClass = tag === "Limited"
    ? "product__tag--soldout"
    : tag === "New"
    ? "product__tag--new"
    : "";

  return (
    // Link e ben kete kart te klikueshme - dergon te /product/:id
    <Link to={`/product/${id}`} className="product-link">
      <article className={`product ${klasa}`}>

        {/* Pjesa e imazhit */}
        <div className="product__image">
          {/* Imazhi - tregohet gjithmone (ose foto reale ose coming-soon) */}
          <img
               src={imageSrc}
              alt={name}
               className={`product__photo ${isComingSoon ? "product__photo--coming" : ""}`}
                 loading="lazy"
            />

          {/* Tag-u (New, Drop 04, Limited, etc.) - mbi foton */}
          <span className={`product__tag ${tagClass}`}>{tag}</span>

          {/* Mesazh qe del kur user-i ben hover */}
          <span className="product__quick">Quick view →</span>
        </div>

        {/* Pjesa me informacionin (emer, kategori, cmim) */}
        <div className="product__info">
          <div>
            {/* Emri i produktit */}
            <div className="product__name">{name}</div>
            {/* Kategoria - perkthehet nga fjalor */}
            <div className="product__cat">{CAT_LABELS[cat] || cat}</div>
          </div>
          {/* Cmimi i formatuar */}
          <div className="product__price">{formatPrice(price)}</div>
        </div>
      </article>
    </Link>
  );
}