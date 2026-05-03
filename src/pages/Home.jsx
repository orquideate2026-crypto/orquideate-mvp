import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="page-section hero">
      <div className="hero-copy-block">
        <p className="eyebrow">Accesorios florales artesanales</p>
        <h1>Flores colombianas convertidas en piezas personales, aromáticas y sostenibles.</h1>
        <p className="hero-copy">
          Piezas hechas a mano con flores preservadas, aromas suaves y detalles
          pensados para regalar o llevar cerca.
        </p>
        <div className="hero-actions">
          <Link className="button primary" to="/catalogo">
            Ver catálogo
          </Link>
          <Link className="button secondary" to="/personalizar">
            Personalizar
          </Link>
        </div>
      </div>

      <figure className="hero-media">
        <img
          src="/images/orquideate-taller-floral.jpeg"
          alt="Mesa artesanal con orquídeas, aromas y materiales florales de Orquídeate."
        />
      </figure>
    </section>
  );
}
