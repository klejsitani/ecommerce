// ===================================================================
// TOAST.JSX - Mesazhe te vogla ne kend te ekranit
// P.sh. "Added to cart", "Message sent", etj.
// Ato shfaqen per 3 sekonda dhe pastaj zhduken
// ===================================================================

import { useEffect, useState } from "react";

// ===================================================================
// SISTEM EVENT-BASED
// ===================================================================
// Per te treguar nje toast nga cilido komponent, perdorim CustomEvent
// Cdokush mund te therrese showToast("mesazh") nga kudo

// Eksportojme funksionin global per te treguar toast
export function showToast(message) {
  // Krijojme nje event te ri me emrin "show-toast"
  // detail mban mesazhin qe duam te tregojme
  const event = new CustomEvent("show-toast", {
    detail: { message }
  });

  // E hedhim event-in - te gjithe degjuesit do e marrin
  window.dispatchEvent(event);
}

// ===================================================================
// TOASTCONTAINER - komponenti qe degjon dhe shfaq toasts
// Vendoset nje here te App.jsx
// ===================================================================
export function ToastContainer() {

  // State per listen e toast-eve aktive
  const [toasts, setToasts] = useState([]);

  // useEffect qe instalon "degjuesin" e event-eve
  useEffect(() => {

    // Funksion qe ekzekutohet kur dikush therret showToast()
    function handleToast(event) {
      // Marrim mesazhin nga event.detail
      const message = event.detail.message;

      // Krijojme nje toast te ri me id te vetem (timestamp)
      const newToast = {
        id: Date.now() + Math.random(),
        message
      };

      // Shtojme te lista
      setToasts(prev => [...prev, newToast]);

      // Pas 3 sekondash, hiqe automatikisht
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== newToast.id));
      }, 3000);
    }

    // Aktivizojme degjuesin
    window.addEventListener("show-toast", handleToast);

    // CLEANUP - kur komponenti zhduket, heqim degjuesin
    // Kjo eshte e rendesishme per te shmangur "memory leaks"
    return () => {
      window.removeEventListener("show-toast", handleToast);
    };
  }, []);

  // ===== RENDER =====
  return (
    <div className="toast-container">
      {/* Per cdo toast ne liste, krijojme nje div */}
      {toasts.map(toast => (
        <div key={toast.id} className="toast">
          {toast.message}
        </div>
      ))}
    </div>
  );
}