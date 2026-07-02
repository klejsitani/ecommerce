// ===================================================================
// APP.JSX - Komponenti kryesor i aplikacionit
// Permban routing (cila URL -> cila faqe) dhe komponente te perbashketa
// ===================================================================

// Sjellim useState per state lokal (a eshte menyja e hapur)
import { useState, useEffect } from "react";

// Sjellim komponente te routing nga react-router-dom
// - Routes: kontejneri qe permban te gjitha rrugen
// - Route: nje rruge individuale (URL + komponent qe shfaqet)
// - useLocation: tregon ne cilen URL jemi
import { Routes, Route, useLocation } from "react-router-dom";

// Sjellim CartProvider - "konteksti" qe ndan shporten me gjithe aplikacionin
import { CartProvider } from "./data/CartContext";

// Sjellim Nav (navigimi i siperm) dhe MenuOverlay (menu hamburger)
import Nav from "./components/Nav";
import MenuOverlay from "./components/MenuOverlay";

// Sjellim Toast (njoftime te vogla) - vetem Container-in
import { ToastContainer } from "./components/Toast";

// Sjellim te gjitha faqet
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Contact from "./pages/Contact";
import Manifest from "./pages/Manifest";

// ===================================================================
// KOMPONENTI APP
// ===================================================================
export default function App() {

  // ===== STATE LOKAL =====
  // menuOpen = true nese menu hamburger eshte i hapur
  const [menuOpen, setMenuOpen] = useState(false);

  // Kur menuOpen ndryshon, shto/hiq klasen "menu-open" te body
// Kjo aktivizon CSS-n qe ben menu te dukshme
useEffect(() => {
  if (menuOpen) {
    document.body.classList.add("menu-open");
  } else {
    document.body.classList.remove("menu-open");
  }
}, [menuOpen]);

  // ===== HOOKS =====
  // useLocation na thote ne cilen URL jemi
  // Perdoret per te dhene "scrolled" stilizim te Nav-it
  const location = useLocation();

  // Te disa faqe duam qe Nav-i te kete gjithmone stil "scrolled" (sfond i errët)
  // P.sh. te Contact, ku s'ka skene e bukur ne sfond
  const alwaysScrolledPages = ["/contact", "/manifest", "/shop"];
  const isProductPage = location.pathname.startsWith("/product/");
  const alwaysScrolled = alwaysScrolledPages.includes(location.pathname) || isProductPage;

  // ===== FUNKSION PER HAPJE/MBYLLJE MENU =====
      function toggleMenu() {
  setMenuOpen(!menuOpen);
    }

  return (
    // CartProvider rrethon gjithcka - lejon faqet te kene qasje te shporta
    <CartProvider>

      {/* NAV - shfaqet ne te gjitha faqet */}
      <Nav
        onToggleMenu={toggleMenu}
        menuOpen={menuOpen}
        alwaysScrolled={alwaysScrolled}
      />

      {/* MENU OVERLAY - shfaqet vetem nese menuOpen = true */}
      {/* "menuOpen && ..." do thote: nese menuOpen eshte true, shfaq MenuOverlay */}
      {menuOpen && <MenuOverlay onClose={toggleMenu} />}

      {/* ROUTING - percakton cila faqe del per cdo URL */}
      <Routes>
        {/* URL: / -> faqja Home */}
        <Route path="/" element={<Home />} />

        {/* URL: /shop -> faqja Shop */}
        <Route path="/shop" element={<Shop />} />

        {/* URL: /product/1, /product/2, etc. -> faqja ProductDetail */}
        {/* ":id" eshte parameter dinamik - lexohet me useParams() te ProductDetail */}
        <Route path="/product/:id" element={<ProductDetail />} />

        {/* URL: /contact -> faqja Contact */}
        <Route path="/contact" element={<Contact />} />

        {/* URL: /manifest -> faqja Manifest */}
        <Route path="/manifest" element={<Manifest />} />
      </Routes>

      {/* TOAST CONTAINER - tregon mesazhe te vogla ne kend te ekranit */}
      {/* P.sh. "Added to cart", "Message sent", etj. */}
      <ToastContainer />
    </CartProvider>
  );
}