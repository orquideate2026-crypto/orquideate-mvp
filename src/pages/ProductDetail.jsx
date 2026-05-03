import { Link, useParams } from "react-router-dom";
import { products } from "../data/products.js";
import { formatCurrency } from "../utils/pricing.js";

export default function ProductDetail() {
  const { productId } = useParams();
  const product = products.find((item) => item.id === productId) ?? products[0];

  return (
    <section className="page-section detail-layout">
      <img className="detail-art" src={product.image} alt={product.imageAlt} />
      <div className="detail-copy">
        <p className="eyebrow">Detalle de producto</p>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p className="price">{formatCurrency(product.price)}</p>

        <div className="detail-section">
          <h2>Descripción del accesorio</h2>
          <p>{product.detailDescription}</p>
        </div>

        <div className="detail-section">
          <h2>Historia de la pieza</h2>
          <p>{product.story}</p>
        </div>

        <Link className="button primary" to={`/personalizar/${product.id}`}>
          Personalizar este accesorio
        </Link>
      </div>
    </section>
  );
}
