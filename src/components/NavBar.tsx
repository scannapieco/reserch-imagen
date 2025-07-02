import React from "react";

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  showFavs: boolean;
  setShowFavs: (show: boolean) => void;
  favCount: number;
  children?: React.ReactNode; // Para el formulario de búsqueda
}

export const Navbar = ({
  darkMode,
  toggleDarkMode,
  showFavs,
  setShowFavs,
  favCount,
  children,
}: NavbarProps) => (
  <nav className={`navbar${darkMode ? " dark" : ""}`}>
    <div className="navbar-logo">
      <span role="img" aria-label="logo"></span> PH
    </div>
    <div className="navbar-form">
      {children}
    </div>
    <div className="navbar-actions">
      <button
        className="navbar-btn"
        onClick={() => setShowFavs(!showFavs)}
        aria-label="Ver favoritos"
      >
        {showFavs ? "Ver Todos" : `Favoritos (${favCount})`}
      </button>
      <button
        className="navbar-btn"
        onClick={toggleDarkMode}
        aria-label={darkMode ? "Modo claro" : "Modo oscuro"}
      >
        {darkMode ? "🌙" : "☀️"}
      </button>
    </div>
  </nav>
);