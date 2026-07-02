// ===================================================================
// NAV.JSX - Navigimi i siperm i faqes
// Permban logon (majtas) dhe butonin hamburger (djathtas)
// ===================================================================

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

// Komponenti merr 3 props nga App.jsx:
// - onToggleMenu: funksioni qe hap/mbyll menu-ne
// - menuOpen: a eshte menu e hapur (true/false)
// - alwaysScrolled: a duhet te kete gjithmone stilin "scrolled"
export default function Nav({ onToggleMenu, menuOpen, alwaysScrolled = false }) {
  // State per te ditur nese user-i ka bere scroll
  const [scrolled, setScrolled] = useState(alwaysScrolled);

  // useLocation na ndihmon te dime ne cilen faqe jemi
  const location = useLocation();

  // useEffect ekzekutohet kur komponenti hapet
  // Dhe sa here qe ndryshon alwaysScrolled
  useEffect(() => {
    // Nese eshte alwaysScrolled, nuk i degjojme scroll-it
    if (alwaysScrolled) return;

    // Funksion qe ekzekutohet kur user-i ben scroll
    const onScroll = () => setScrolled(window.scrollY > 60);

    // Shtojme degjuesin
    window.addEventListener("scroll", onScroll, { passive: true });

    // Therrasim nje here per state-in fillestar
    onScroll();

    // Cleanup - heqim degjuesin kur komponenti zhduket
    return () => window.removeEventListener("scroll", onScroll);
  }, [alwaysScrolled]);

  // Reset i scrolled state kur ndryshon faqja
  useEffect(() => {
    if (alwaysScrolled) setScrolled(true);
  }, [location.pathname, alwaysScrolled]);

  return (
    // Nav-i ka klasen "scrolled" kur user-i ka bere scroll
    <header className={`nav ${scrolled ? "scrolled" : ""}`}>
      {/* LOGO - klikoje per te kthyer ne home */}
      <Link to="/" className="nav__logo">STREET</Link>

      {/* BUTONI HAMBURGER me 3 viza */}
      <button
        className="menu-toggle"
        onClick={onToggleMenu}
        aria-label="Open menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </header>
  );
}