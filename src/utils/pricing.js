import { aromaOptions, extraOptions } from "../data/customizationOptions.js";

export function calculateEstimatedPrice({ product, aroma, extras = [] }) {
  const aromaPrice = aromaOptions.find((option) => option.name === aroma)?.price ?? 0;
  const extrasPrice = extras.reduce((total, extraName) => {
    const extra = extraOptions.find((option) => option.name === extraName);
    return total + (extra?.price ?? 0);
  }, 0);

  return product.basePrice + aromaPrice + extrasPrice;
}

export function formatCurrency(value) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
}
