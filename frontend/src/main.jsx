// ===================================================================
// MAIN.JSX - Pikenisja e aplikacionit React
// Ky file ekzekutohet i pari kur hapet faqja
// I thote React: "Merr App-in dhe vendose te <div id="root">"
// ===================================================================

// Sjellim StrictMode nga React - ndihmon ne gjetjen e gabimeve gjate zhvillimit
import { StrictMode } from "react";

// Sjellim createRoot - funksion qe lidh React me HTML
import { createRoot } from "react-dom/client";

// Sjellim BrowserRouter - lejon navigim ne aplikacion me URL te ndryshme
// P.sh. /shop, /product/1, /contact, etj.
import { BrowserRouter } from "react-router-dom";

// Sjellim komponentin App qe permban gjithe aplikacionin
import App from "./App.jsx";

// Sjellim CSS-ne kryesore te aplikacionit
import "./styles/style.css";

// ===================================================================
// LIDHJA E REACT ME HTML
// ===================================================================

// 1. Gjej elementin me id="root" te index.html
const rootElement = document.getElementById("root");

// 2. Krijo nje "rrenje" React te lidhur me ate element
const root = createRoot(rootElement);

// 3. Renderoje aplikacionin brenda asaj rrenjeje
root.render(
  // StrictMode - kontrollon kodin per probleme te mundshme
  <StrictMode>
    {/* BrowserRouter - aktivizon routing per <Link> dhe <Route> */}
    <BrowserRouter>
      {/* App - komponenti kryesor qe permban gjithe aplikacionin */}
      <App />
    </BrowserRouter>
  </StrictMode>
);