import React, { useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import Router from "next/router";

// Styles components
const InputText = styled.input`
  border: 1px solid var(--gris3);
  padding: 1rem;
  min-width: 300px;
`;

const ButtonSubmit = styled.button`
  height: 3rem;
  width: 3rem;
  display: block;
  background-size: 4rem;
  background-image: url("/static/img/buscar.png");
  background-repeat: no-repeat;
  position: absolute;
  right: 2px;
  top: 2px;
  background-color: white;
  border: none;
  text-indent: -9999px;

  &:hover {
    cursor: pointer;
  }
`;

const Buscar = () => {
  // State que maneja la busqueda del usuario
  const [busqueda, setBusqueda] = useState("");

  // Funcion para uscar producto
  const buscarProducto = (e) => {
    e.preventDefault();

    // Validamos que el usuario haya ingresado un valor
    if (busqueda.trim() === "") return;

    // Redireccionando al usuario a /buscar
    Router.push({
      pathname: "/buscar",
      // Creando query en la ruta (?key=valorBusqueda), la leemos en el componente busqueda
      query: {
        q: busqueda,
      },
    });
  };

  return (
    <form
      // Aplicando styles props
      css={css`
        position: relative;
      `}
      // Funcion que se ejecuta al enviar formulario
      onSubmit={buscarProducto}
    >
      <InputText
        type="text"
        placeholder="Buscar Productos"
        onChange={(e) => setBusqueda(e.target.value)}
      />
      <ButtonSubmit type="submit">Buscar</ButtonSubmit>
    </form>
  );
};

export default Buscar;
