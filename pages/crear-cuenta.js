import React, { useState } from "react";
import { css } from "@emotion/react";
import Router from "next/router";

// Components
import Layout from "../components/layout/Layout";
import {
  Campo,
  Formulario,
  InputSubmit,
  Error,
} from "../components/ui/Formulario";

// Custom Hooks
import useValidacion from "../hooks/useValidacion";
// Funcion para validar datos
import validarCrearCuenta from "../validacion/validarCrearCuenta";

// Importando app de firebase inicializada con las funciones
import { firebase } from "../firebase";

// State inicial
const STATE_INICIAL = {
  nombre: "",
  email: "",
  password: "",
};

const CrearCuenta = () => {
  // State para manejar el error
  const [error, setError] = useState(false);

  // Llamando y destructurando el custom hook
  const {
    valores,
    errores,
    submitForm,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useValidacion(STATE_INICIAL, validarCrearCuenta, crearCuenta);

  const { nombre, email, password } = valores;

  // Funcion crear cuenta
  async function crearCuenta() {
    try {
      // Llamando la funcion encargada de registrar usuarios
      await firebase.registrarUsuario(nombre, email, password);
      // Redireccionando usuario a la pagina inicial
      Router.push("/");
    } catch (error) {
      console.log("Hubo un error al crear el usuario", error.message);
      setError(error.message);
    }
  }

  return (
    <div>
      <Layout>
        <>
          <h1
            // Aplicando styles props
            css={css`
              text-align: center;
              margin-top: 3rem;
            `}
          >
            Crear Cuenta
          </h1>
          <Formulario
            // Ejecutando la funcion que viene desde el custom hook y se ejecuta al enviar formulario
            onSubmit={handleSubmit}
            noValidate
          >
            <Campo>
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                placeholder="Tu Nombre"
                name="nombre"
                value={nombre}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo>
            {
              // Validando si hay errores
              errores.nombre && <Error>{errores.nombre}</Error>
            }

            <Campo>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                placeholder="Tu Email"
                name="email"
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo>
            {
              // Validando si hay errores
              errores.email && <Error>{errores.email}</Error>
            }

            <Campo>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Tu Password"
                name="password"
                value={password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo>
            {
              // Validando si hay errores
              errores.password && <Error>{errores.password}</Error>
            }

            {
              // Validando si hay error al crear usuario
              error && <Error>{error}</Error>
            }

            <InputSubmit type="submit" value="Crear Cuenta" />
          </Formulario>
        </>
      </Layout>
    </div>
  );
};

export default CrearCuenta;
