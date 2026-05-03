import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { categories } from "../data/categories.js";
import { products } from "../data/products.js";
import { formatCurrency } from "../utils/pricing.js";

const filters = [
  "Todos",
  "Collares",
  "Pulseras",
  "Aretes",
  "Anillos",
  "Charms",
  "Kits",
  "Personalizables",
  "Regalos",
];

export default function Catalog() {
  const [activeFilter, setActiveFilter] = useState("Todos");

  const activeCategory = categories.find((category) => category.name === activeFilter) ?? categories[0];

  const visibleProducts = useMemo(() => {
    if (activeFilter === "Todos") {
      return products;
    }

    if (activeFilter === "Personalizables" || activeFilter === "Regalos") {
      return products.filter((product) => product.tags?.includes(activeFilter));
    }

    return products.filter((product) => product.category === activeFilter);
  }, [activeFilter]);

  return (
    <section className="page-section catalog-section">
      <div className="section-heading catalog-heading">
        <div>
          <p className="eyebrow">Catálogo MVP</p>
          <h1>Compra por tipo de accesorio</h1>
        </div>
        <p className="category-description">{activeCategory.description}</p>
      </div>

      <div className="filter-row" aria-label="Filtrar productos por categoría">
        {filters.map((filter) => (
          <button
            className={`filter-button ${activeFilter === filter ? "active" : ""}`}
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="product-grid">
        {visibleProducts.map((product) => (
          <article className="product-card" key={product.id}>
            <img className="product-image" src={product.image} alt={product.imageAlt} />
            <div className="product-content">
              <span className="product-badge">{product.badge}</span>
              <p className="product-kicker">{product.category}</p>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
            </div>

            <div className="product-details">
              <div>
                <span>Flor</span>
                <strong>{product.flower}</strong>
              </div>
              <div>
                <span>Aroma</span>
                <strong>{product.scent}</strong>
              </div>
            </div>

            <div className="product-footer">
              <div>
                <span>Precio</span>
                <strong>{formatCurrency(product.price)}</strong>
              </div>
              <Link className="button secondary small" to={`/producto/${product.id}`}>
                Ver detalle
              </Link>
            </div>
          </article>
        ))}
      </div>

      <p className="catalog-note">
        Imágenes referenciales generadas para prototipo MVP. Producto sujeto a
        disponibilidad artesanal.
      </p>
    </section>
  );
}
