// ===================================================================
// MANIFEST.JSX - Faqja qe shfaq manifestin e markes
// URL: /manifest
// Eshte e thjeshte - vetem tekst + footer
// ===================================================================

import Footer from "../components/Footer";

export default function Manifest() {
  return (
    <>
      <section className="manifesto" style={{ paddingTop: 160 }}>
        <div className="manifesto__inner">

          {/* TITULLI KRYESOR i manifestit */}
          <h2 className="manifesto__lead">
            We don't <em>sell clothes.</em><br />
            We sell <em>attitude.</em>
          </h2>

          {/* TEKSTI KRYESOR i manifestit */}
          <div className="manifesto__body">
            <p>
              STREET was founded in 2022 in Tirana, by a group of girls and guys who were tired of
              expensive brands that claimed to understand the street, but had never seen it up close.
            </p>
            <p>
              Every product we drop is a reaction — against uniformity, against the rush, against fast-fashion
              that forgets what it means to be authentic. We work with local makers, with materials that last,
              and with design that does not apologize.
            </p>
            <p>
              So this is not an e-commerce site. This is an invitation. Step in. Try it. Have an opinion.
            </p>

            {/* STATISTIKAT - 3 numra kryesore */}
            <div className="stats">
              <div>
                <div className="stat__num">08</div>
                <div className="stat__label">Shops · 1 avenue</div>
              </div>
              <div>
                <div className="stat__num">12K</div>
                <div className="stat__label">Global customers</div>
              </div>
              <div>
                <div className="stat__num">100%</div>
                <div className="stat__label">Made local</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer minimal />
    </>
  );
}