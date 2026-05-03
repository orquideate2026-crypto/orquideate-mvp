import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <NavLink className="brand" to="/">
          <img src="/images/logo.png" alt="Orquídeate" />
        </NavLink>
        <nav className="site-nav" aria-label="Navegación principal">
          <NavLink to="/">Inicio</NavLink>
          <NavLink to="/catalogo">Catálogo</NavLink>
          <NavLink to="/personalizar">Personalizar</NavLink>
          <NavLink to="/preorden">Preorden</NavLink>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
