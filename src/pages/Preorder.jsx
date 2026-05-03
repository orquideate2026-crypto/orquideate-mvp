import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPreorder } from "../services/preorders.js";
import { formatCurrency } from "../utils/pricing.js";
import { loadPreorderSelection } from "../utils/preorderSelection.js";

export default function Preorder() {
  const location = useLocation();
  const [customization] = useState(() => location.state ?? loadPreorderSelection());
  const [form, setForm] = useState({ name: "", whatsapp: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("saving");
    setErrorMessage("");

    const result = await createPreorder({
      customer_name: form.name.trim(),
      whatsapp: form.whatsapp.trim(),
      product_name: customization.product.name,
      selected_type: customization.accessoryType,
      selected_flower: customization.flower,
      selected_scent: customization.aroma,
      extras: customization.extras,
      estimated_price: customization.estimatedPrice,
      message: form.message.trim() || null,
      status: "new",
    });

    if (result.ok) {
      setStatus(result.demo ? "demo-saved" : "saved");
      return;
    }

    setStatus("error");
    setErrorMessage(
      result.error?.message
        ? `No se pudo registrar la preorden: ${result.error.message}`
        : "No se pudo registrar la preorden. Revisa la configuración de Supabase.",
    );
  }

  if (!customization) {
    return (
      <section className="page-section empty-state">
        <p className="eyebrow">Preorden</p>
        <h1>Primero personaliza tu accesorio para continuar con la preorden.</h1>
        <Link className="button primary" to="/personalizar">
          Ir al personalizador
        </Link>
      </section>
    );
  }

  return (
    <section className="page-section preorder-layout">
      <div className="section-intro">
        <p className="eyebrow">Preorden</p>
        <h1>Reserva tu accesorio personalizado</h1>
        <p>
          Esta versión registra tu intención de compra para que podamos
          contactarte por WhatsApp y confirmar los detalles de tu accesorio.
        </p>

        <aside className="summary-card" aria-label="Resumen de selección">
          <img
            className="summary-image"
            src={customization.product.image}
            alt={customization.product.imageAlt}
          />
          <p className="summary-title">Tu accesorio Orquídeate</p>
          <dl>
            <div>
              <dt>Producto</dt>
              <dd>{customization.product.name}</dd>
            </div>
            <div>
              <dt>Tipo</dt>
              <dd>{customization.accessoryType}</dd>
            </div>
            <div>
              <dt>Flor</dt>
              <dd>{customization.flower}</dd>
            </div>
            <div>
              <dt>Aroma</dt>
              <dd>{customization.aroma}</dd>
            </div>
            <div>
              <dt>Extras</dt>
              <dd>
                {customization.extras.length ? customization.extras.join(", ") : "Sin extras"}
              </dd>
            </div>
            <div className="summary-total">
              <dt>Precio estimado</dt>
              <dd>{formatCurrency(customization.estimatedPrice)}</dd>
            </div>
          </dl>
        </aside>
      </div>

      <form className="panel-form preorder-form" onSubmit={handleSubmit}>
        <label>
          Nombre
          <input
            required
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            placeholder="Tu nombre"
          />
        </label>

        <label>
          WhatsApp
          <input
            required
            value={form.whatsapp}
            onChange={(event) => setForm({ ...form, whatsapp: event.target.value })}
            placeholder="Ej. 300 123 4567"
          />
        </label>

        <label>
          Mensaje opcional
          <textarea
            value={form.message}
            onChange={(event) => setForm({ ...form, message: event.target.value })}
            placeholder="Cuéntanos si es para regalo, fecha especial o una ocasión concreta."
          />
        </label>

        <button className="button primary full-width" type="submit" disabled={status === "saving"}>
          {status === "saving" ? "Guardando..." : "Enviar preorden"}
        </button>

        {status === "saved" ? (
          <p className="success">
            Tu preorden fue registrada correctamente. Te contactaremos por WhatsApp.
          </p>
        ) : null}

        {status === "demo-saved" ? (
          <p className="success">
            Modo demo: tu preorden fue simulada correctamente. Agrega las variables
            de Supabase para guardar registros reales.
          </p>
        ) : null}

        {status === "error" ? <p className="error">{errorMessage}</p> : null}
      </form>
    </section>
  );
}
