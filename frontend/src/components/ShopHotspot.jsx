// ===================================================================
// SHOPHOTSPOT.JSX - Nje pike-shenje e klikueshme mbi rrugen
// Perdoret 8 here te StreetScene (per cdo dyqan)
// ===================================================================

import { Link } from "react-router-dom";

// Komponenti merr keto props nga StreetScene:
// - num: numri (01, 02, ...)
// - cat: kategoria (hoodies, tshirts, ...)
// - name: emri (Hoodies, T-shirts, ...)
// - top, left: pozicioni
// Eshte hequr "desc" sepse karta nuk shfaq me pershkrim
export default function ShopHotspot({ num, cat, name, top, left }) {
  return (
    // Link e ben hotspot-in te klikueshem - dergon te shop me kategorine si parameter
    <Link
      to={`/shop?cat=${cat}`}
      className="shop-hotspot"
      style={{ top, left }}
    >
      {/* Numri me ngjyre portokalli qe pulson */}
      <span className="shop-hotspot__num">{num}</span>

      {/* Karta e re - shfaqet LART mbi piken */}
      <div className="shop-hotspot__card shop-hotspot__card--top">
        {/* Label: SHOP 01, SHOP 02, etj. */}
        <span className="shop-hotspot__cat">/ Shop {num}</span>
        {/* Emri kryesor (Trousers, Hoodies, etj.) */}
        <h3>{name}</h3>
        {/* Butoni "Enter" - pershkrimi u hoq */}
        <span className="shop-hotspot__cta">Enter the shop →</span>
      </div>
    </Link>
  );
}