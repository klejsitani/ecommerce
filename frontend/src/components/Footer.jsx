// ===================================================================
// FOOTER.JSX - Komponenti i fundit te cdo faqe
// Ka 2 variante: full (me lidhje) dhe minimal (vetem copyright)
// ===================================================================

import { Link } from "react-router-dom";

// Komponenti merr prop "minimal" - nese eshte true, tregon versionin e shkurter
export default function Footer({ minimal = false }) {

  // VERSIONI MINIMAL - perdoret te faqe te tjera pervec Home
  if (minimal) {
    return (
      <footer className="footer">
        <div className="footer__bottom">
          <span>© 2026 STREET</span>
          <span>Street style · No compromise</span>
          <Link to="/">← Back to home</Link>
        </div>
      </footer>
    );
  }

  // VERSIONI I PLOTE - perdoret vetem te Home
  return (
    <footer className="footer">
      {/* PJESA KRYESORE - 4 kolona */}
      <div className="footer__top">

        {/* KOLONA 1 - Marka dhe pershkrimi */}
        <div className="footer__brand">
          <h3>STREET</h3>
          <p>Hoodies, t-shirts, trousers, sweatpants, pants, sneakers, fragrances, socks. Made for the street, since 2022.</p>
        </div>

        {/* KOLONA 2 - Lidhje per cdo dyqan */}
        <div className="footer__col">
          <h4>Shops</h4>
          <ul>
            <li><Link to="/shop?cat=hoodies">Hoodies</Link></li>
            <li><Link to="/shop?cat=tshirts">T-shirts</Link></li>
            <li><Link to="/shop?cat=trousers">Trousers</Link></li>
            <li><Link to="/shop?cat=sweatpants">Sweatpants</Link></li>
            <li><Link to="/shop?cat=pants">Pants</Link></li>
            <li><Link to="/shop?cat=atlete">Sneakers</Link></li>
            <li><Link to="/shop?cat=parfume">Fragrances</Link></li>
            <li><Link to="/shop?cat=corape">Socks</Link></li>
          </ul>
        </div>

        {/* KOLONA 3 - Lidhje te tjera (manifest, kontakt, karriere) */}
        <div className="footer__col">
          <h4>Brand</h4>
          <ul>
            <li><Link to="/manifest">Manifest</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><a href="#">Careers</a></li>
          </ul>
        </div>

        {/* KOLONA 4 - Rrjete sociale */}
        <div className="footer__col">
          <h4>Follow</h4>
          <ul>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">TikTok</a></li>
            <li><a href="#">YouTube</a></li>
            <li><a href="#">Spotify</a></li>
          </ul>
        </div>
      </div>

      {/* FUNDI - copyright dhe lokacionet */}
      <div className="footer__bottom">
        <span>© 2026 STREET. All rights reserved.</span>
        <span>Tirana ↔ Berlin ↔ Milan</span>
      </div>
    </footer>
  );
}