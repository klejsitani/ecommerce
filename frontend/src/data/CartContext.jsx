// ===================================================================
// CARTCONTEXT.JSX - Konteksti i shportes
// "Context" eshte nje mekanizem i React per te ndare te dhena me te
// gjithe komponentet pa i kaluar manualisht prej njerit te tjetri
//
// Pa Context: do duhej te kalonim shporten nga App -> Nav -> ProductCard
// Me Context: cdo komponent merr shporten direkt me useCart()
// ===================================================================

// Sjellim hooks dhe createContext nga React
import { createContext, useContext, useEffect, useState } from "react";

// Sjellim funksionet API qe komunikojne me backend
import { fetchCart, addToCart as apiAddToCart, removeFromCart as apiRemoveFromCart } from "./api";

// ===== KRIJOJME CONTEXT =====
// Kjo eshte "kutia" qe do te mbaje te dhenat e shportes
// Mund ta krahasoni me nje "kanal televiziv" qe komponentet mund te "shikojne"
const CartContext = createContext(null);

// ===================================================================
// CARTPROVIDER - komponenti qe "transmeton" te dhenat e shportes
// Perdoret te App.jsx, rreth gjithe aplikacionit
// Cdo komponent brenda <CartProvider> mund te perdore useCart()
// ===================================================================
export function CartProvider({ children }) {

  // ===== STATE LOKAL =====
  // items = lista e produkteve ne shporte
  const [items, setItems] = useState([]);

  // ===== EFFECT - kur komponenti hapet, marrim shporten nga backend =====
  useEffect(() => {
    // Ngarko shporten ne fillim te aplikacionit
    loadCart();
  }, []); // [] do thote: ekzekutoje vetem nje here (kur App hapet)

  // ===== FUNKSION QE NGARKON SHPORTEN NGA BACKEND =====
  async function loadCart() {
    try {
      const data = await fetchCart();
      // data ka strukturen { count, items: [...] }
      setItems(data.items || []);
    } catch (err) {
      console.error("Failed to load cart:", err);
    }
  }

  // ===== FUNKSION QE SHTON PRODUKT =====
  async function add(productId) {
    try {
      // Therrasim API per te shtuar
      await apiAddToCart(productId);
      // Pas suksesi, ringarkojme shporten te freskuar
      await loadCart();
    } catch (err) {
      console.error("Failed to add:", err);
      throw err;  // Hidhe perpara qe komponenti ta kape
    }
  }

  // ===== FUNKSION QE HEQ PRODUKT =====
  async function remove(productId) {
    try {
      await apiRemoveFromCart(productId);
      await loadCart();
    } catch (err) {
      console.error("Failed to remove:", err);
    }
  }

  // ===== VLERA QE TRANSMETOHET =====
  // Cdo komponent qe perdor useCart() do kete qasje te ketyre vlerave
  const value = {
    items,                              // Lista e produkteve ne shporte
    count: items.length,                // Sa produkte ne total
    add,                                // Funksioni per te shtuar
    remove,                             // Funksioni per te hequr
    reload: loadCart                    // Funksioni per te ringarkuar manualisht
  };

  // ===== RENDER =====
  // <CartContext.Provider> transmeton value te te gjithe femijet
  // {children} = cdo gje brenda <CartProvider>...</CartProvider>
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// ===================================================================
// USECART - hook personalizuar qe e ben perdorimin me te lehte
// Ne vend te: const ctx = useContext(CartContext)
// Mund te shkruajme: const { items, add } = useCart()
// ===================================================================
export function useCart() {
  const context = useContext(CartContext);

  // Nese useCart() perdoret jashte CartProvider, dije se diçka eshte gabim
  if (!context) {
    throw new Error("useCart duhet te perdoret brenda CartProvider");
  }

  return context;
}