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
import validarIniciarSesion from "../validacion/validarIniciarSesion";

// State inicial
const STATE_INICIAL = {
  email: "",
  password: "",
};

const Login = () => {
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
  } = useValidacion(STATE_INICIAL, validarIniciarSesion, iniciarSesion);

  const { email, password } = valores;

  // Funcion iniciar sesion
  function iniciarSesion() {
    console.log("Iniciando Sesion");
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
            Iniciar Sesion
          </h1>
          <Formulario
            // Ejecutando la funcion que viene desde el custom hook y se ejecuta al enviar formulario
            onSubmit={handleSubmit}
            noValidate
          >
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

            <InputSubmit type="submit" value="Iniciar Sesion" />
          </Formulario>
        </>
      </Layout>
    </div>
  );
};

export default Login;
