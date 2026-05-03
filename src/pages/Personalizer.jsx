import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  accessoryTypes,
  aromaOptions,
  extraOptions,
  flowerOptions,
} from "../data/customizationOptions.js";
import { products } from "../data/products.js";
import { calculateEstimatedPrice, formatCurrency } from "../utils/pricing.js";
import { savePreorderSelection } from "../utils/preorderSelection.js";

export default function Personalizer() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const initialProduct = products.find((item) => item.id === productId) ?? products[0];
  const [productIdSelected, setProductIdSelected] = useState(initialProduct.id);
  const [accessoryType, setAccessoryType] = useState(accessoryTypes[0]);
  const [flower, setFlower] = useState(flowerOptions[0]);
  const [aroma, setAroma] = useState(aromaOptions[0].name);
  const [extras, setExtras] = useState([]);

  const selectedProduct = products.find((item) => item.id === productIdSelected) ?? products[0];
  const estimatedPrice = useMemo(
    () => calculateEstimatedPrice({ product: selectedProduct, aroma, extras }),
    [aroma, extras, selectedProduct],
  );

  const preorderSelection = {
    product: selectedProduct,
    accessoryType,
    flower,
    aroma,
    extras,
    estimatedPrice,
  };

  function toggleExtra(extraName) {
    setExtras((currentExtras) =>
      currentExtras.includes(extraName)
        ? currentExtras.filter((item) => item !== extraName)
        : [...currentExtras, extraName],
    );
  }

  function continueToPreorder() {
    savePreorderSelection(preorderSelection);
    navigate("/preorden", { state: preorderSelection });
  }

  return (
    <section className="page-section personalizer-layout">
      <div className="section-intro">
        <p className="eyebrow">Personalizador</p>
        <h1>Diseña tu accesorio floral</h1>
        <p>
          Elige la base, la flor, el aroma y los detalles que harían sentir esta
          pieza como tuya.
        </p>

        <aside className="summary-card" aria-label="Resumen de personalización">
          <img
            className="summary-image"
            src={selectedProduct.image}
            alt={selectedProduct.imageAlt}
          />
          <p className="summary-title">Tu accesorio Orquídeate</p>
          <dl>
            <div>
              <dt>Producto</dt>
              <dd>{selectedProduct.name}</dd>
            </div>
            <div>
              <dt>Tipo</dt>
              <dd>{accessoryType}</dd>
            </div>
            <div>
              <dt>Flor</dt>
              <dd>{flower}</dd>
            </div>
            <div>
              <dt>Aroma</dt>
              <dd>{aroma}</dd>
            </div>
            <div>
              <dt>Extras</dt>
              <dd>{extras.length ? extras.join(", ") : "Sin extras"}</dd>
            </div>
            <div className="summary-total">
              <dt>Precio estimado</dt>
              <dd>{formatCurrency(estimatedPrice)}</dd>
            </div>
          </dl>
        </aside>
      </div>

      <form className="panel-form" onSubmit={(event) => event.preventDefault()}>
        <label>
          Producto base
          <select
            value={productIdSelected}
            onChange={(event) => setProductIdSelected(event.target.value)}
          >
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Tipo de accesorio
          <select
            value={accessoryType}
            onChange={(event) => setAccessoryType(event.target.value)}
          >
            {accessoryTypes.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>

        <label>
          Flor
          <select value={flower} onChange={(event) => setFlower(event.target.value)}>
            {flowerOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>

        <label>
          Aroma
          <select value={aroma} onChange={(event) => setAroma(event.target.value)}>
            {aromaOptions.map((option) => (
              <option key={option.name} value={option.name}>
                {option.name}
                {option.price ? ` (+${formatCurrency(option.price)})` : ""}
              </option>
            ))}
          </select>
        </label>

        <fieldset className="checkbox-group">
          <legend>Extras</legend>
          {extraOptions.map((extra) => (
            <label className="extra-option" key={extra.name}>
              <input
                checked={extras.includes(extra.name)}
                type="checkbox"
                onChange={() => toggleExtra(extra.name)}
              />
              <span>{extra.name}</span>
              <strong>{formatCurrency(extra.price)}</strong>
            </label>
          ))}
        </fieldset>

        <div className="estimate">
          <span>Precio estimado</span>
          <strong>{formatCurrency(estimatedPrice)}</strong>
        </div>

        <button className="button primary full-width" type="button" onClick={continueToPreorder}>
          Continuar a preorden
        </button>
      </form>
    </section>
  );
}
