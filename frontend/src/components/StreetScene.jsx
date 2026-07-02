// ===================================================================
// STREETSCENE.JSX - Skena kryesore me rrugen dhe 8 hotspots
// Ky eshte komponenti i pare qe sheh user-i kur hap faqen
// ===================================================================

// Sjellim komponentin per nje hotspot individual
import ShopHotspot from "./ShopHotspot";

// LISTA E 8 DYQANEVE
// Cdo hotspot ka:
// - num: numri qe del te hotspot (01-08)
// - cat: kategoria (lidhet me products.json)
// - name: emri qe del te karta
// - top, left: pozicioni ne ekran (perqindje)
// Pershkrimet (desc) jane hequr - karta nuk i shfaq me
const SHOPS = [
  // 01 HOODIES - Vetrinat majtas (ku duken manekinet ne xham)
  { num: "01", cat: "hoodies",    name: "Hoodies",    top: "76%", left: "4%"  },

  // 02 T-SHIRTS - Hyrja e G-STAR (shenja e zeze majtas)
  { num: "02", cat: "tshirts",    name: "T-shirts",   top: "70%", left: "22%" },

  // 03 TROUSERS - Ndertesa me harqe (Brioni)
  { num: "03", cat: "trousers",   name: "Trousers",   top: "65%", left: "35%" },

  // 04 SWEATPANTS - Vetrinat me harqe rrethore (qender)
  { num: "04", cat: "sweatpants", name: "Sweatpants", top: "68%", left: "48%" },

  // 05 PANTS - Banderolat dhe ndertesa qendrore-djathtas
  { num: "05", cat: "pants",      name: "Pants",      top: "70%", left: "60%" },

  // 06 SNEAKERS - Tenda dhe njerezit djathtas
  { num: "06", cat: "atlete",     name: "Sneakers",   top: "73%", left: "82%" },

  // 07 FRAGRANCES - Lart djathtas, te ndertesa moderne
  { num: "07", cat: "parfume",    name: "Fragrances", top: "60%", left: "90%" },

  // 08 SOCKS - Vetrinat djathtas-poshte
  { num: "08", cat: "corape",     name: "Socks",      top: "80%", left: "78%" }
];

export default function StreetScene() {
  return (
    <section className="street-scene">
      {/* Background-i (foto e rruges) */}
      <div className="street-scene__bg"></div>
      {/* Overlay i zi per te lexueshmerine */}
      <div className="street-scene__overlay"></div>

      {/* Titulli i madh "AVENUE" */}
      <h1 className="street-scene__title">AVENUE</h1>

      {/* TEKSTI I HYRJES (lart majtas) */}
      <div className="street-scene__intro">
        <span className="eyebrow">/ The District · Drop 04</span>
        <h2>Step into <em>the avenue.</em><br />Eight shops. Eight stories.</h2>
        <p>Click on any marker to enter a shop.</p>
      </div>

      {/* META INFORMACIONI (lart djathtas - dekoracion) */}
      <div className="street-scene__meta">
        <div className="rno">/ 01 — 08</div>
        <div className="rname">Avenue · Front view</div>
        <div className="rcoord">34.067° N · 118.401° W</div>
      </div>

      {/* SHFAQIM 8 HOTSPOT-AT duke perdorur .map() */}
      {SHOPS.map(shop => (
        <ShopHotspot key={shop.num} {...shop} />
      ))}

      {/* Tekst poshte qe thote te beje scroll */}
      <div className="street-scene__compass">
        <span>N · Scroll to see more</span>
      </div>
    </section>
  );
}