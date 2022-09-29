import React, { useContext } from "react";
import Link from "next/link";
import styled from "@emotion/styled";

// Importando contexto firebase
import { FirebaseContext } from "../../firebase";

// Styled components
const Nav = styled.nav`
  padding-left: 2rem;

  a {
    font-size: 1.2rem;
    margin-left: 2rem;
    color: var(--gris2);
    font-family: "PT Sans", sans-serif;

    &:last-of-type {
      margin-right: 0;
    }
  }
`;

const Navegacion = () => {
  // Accediendo al contexto y a los valore
  const { usuarioAutenticado } = useContext(FirebaseContext);

  return (
    <Nav>
      <Link href="/">Inicio</Link>
      <Link href="/populares">Populares</Link>
      {
        // Validando si hay un usuario logeado
        usuarioAutenticado && <Link href="/nuevo-producto">Nuevo Producto</Link>
      }
    </Nav>
  );
};

export default Navegacion;
