import React from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

// Components
import Buscar from "../ui/Buscar";
import Navegacion from "./Navegacion";
import Boton from "../ui/Boton";

// Styled components
const ContenedorHeader = styled.div`
  max-width: 1280px;
  width: 95%;
  margin: 0 auto;

  // Media query, se aplica de 768px hacia arriba
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;

const Logo = styled.p`
  color: var(--verde);
  font-size: 3rem;
  line-height: 0;
  font-weight: 700;
  font-family: "Roboto Slab", serif;
  margin-right: 2rem;
`;

const Header = () => {
  const usuario = false;

  return (
    <header
      // Aplicando styles props
      css={css`
        border-bottom: 2px solid var(--gris3);
        padding: 1rem 0;
      `}
    >
      <ContenedorHeader>
        <div
          // Aplicando styles props
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          <Link href="/">
            <Logo>P</Logo>
          </Link>

          {/* Buscador */}
          <Buscar />

          {/* Navegacion */}
          <Navegacion />
        </div>

        <div
          // Aplicando styles props
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          {
            /* Menu de administracion */
            usuario ? (
              <>
                <p
                  // Aplicando styles props
                  css={css`
                    margin-right: 2rem;
                  `}
                >
                  Hola: Manuel
                </p>

                <Boton bgColor="true">Cerrar Sesion</Boton>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Boton bgColor="true">Login</Boton>
                </Link>

                <Link href="/crear-cuenta">
                  <Boton>Crear Cuenta</Boton>
                </Link>
              </>
            )
          }
        </div>
      </ContenedorHeader>
    </header>
  );
};

export default Header;
