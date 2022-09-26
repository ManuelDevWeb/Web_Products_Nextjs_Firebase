import React from "react";
import { css } from "@emotion/react";

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

// State inicial
const STATE_INICIAL = {
  nombre: "",
  email: "",
  password: "",
};

const CrearCuenta = () => {
  // Funcion crear cuenta
  const crearCuenta = () => {
    console.log("Creando cuenta...");
  };

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

            <InputSubmit type="submit" value="Crear Cuenta" />
          </Formulario>
        </>
      </Layout>
    </div>
  );
};

export default CrearCuenta;
