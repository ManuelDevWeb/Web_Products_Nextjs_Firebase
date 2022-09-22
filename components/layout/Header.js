import React from "react";

// Components
import Buscar from "../ui/Buscar";

const Header = () => {
  return (
    <header>
      <div>
        <div>
          <p>P</p>

          {/* Buscador */}
          <Buscar />

          {/* Navegacion */}
        </div>

        <div>{/* Menu de administracion */}</div>
      </div>
    </header>
  );
};

export default Header;
