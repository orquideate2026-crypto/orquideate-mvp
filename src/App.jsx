import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Catalog from "./pages/Catalog.jsx";
import Home from "./pages/Home.jsx";
import Personalizer from "./pages/Personalizer.jsx";
import Preorder from "./pages/Preorder.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="catalogo" element={<Catalog />} />
        <Route path="producto/:productId" element={<ProductDetail />} />
        <Route path="personalizar/:productId?" element={<Personalizer />} />
        <Route path="preorden" element={<Preorder />} />
      </Route>
    </Routes>
  );
}
