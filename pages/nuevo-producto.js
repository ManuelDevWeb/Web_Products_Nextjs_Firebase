import React, { useContext } from "react";
import { css } from "@emotion/react";
import Router from "next/router";
import { addDoc, collection } from "firebase/firestore";

// Components
import Layout from "../components/layout/Layout";
import {
  Formulario,
  Campo,
  InputSubmit,
  Error,
} from "../components/ui/Formulario";

// Custom Hooks
import useValidacion from "../hooks/useValidacion";
// Funcion para validar datos
import validarCrearProducto from "../validacion/validarCrearProducto";

// Importando Context Firease
import { FirebaseContext } from "../firebase";

// State inicial
const STATE_INICIAL = {
  nombre: "",
  empresa: "",
  imagen: "",
  url: "",
  descripcion: "",
};

const NuevoProducto = () => {
  // Accediendo al contexto y a los valore
  const { usuarioAutenticado, firebase } = useContext(FirebaseContext);

  // Llamando y destructurando el custom hook
  const { valores, errores, handleSubmit, handleChange, handleBlur } =
    useValidacion(STATE_INICIAL, validarCrearProducto, crearProducto);

  const { nombre, empresa, imagen, url, descripcion } = valores;

  // Funcion crear producto
  async function crearProducto() {
    // Validamos si el usuario esta logeado
    if (!usuarioAutenticado) {
      return Router.push("/login");
    }

    // Crear el objeto de nuevo producto
    const producto = {
      nombre,
      empresa,
      url,
      descripcion,
      votos: 0,
      comentarios: [],
      creado: Date.now(),
    };

    // Insertando en la DB
    try {
      // Agregando documento (producto) a la coleccion de productos
      await addDoc(collection(firebase.db, "productos"), producto);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Layout>
        <h1
          // Aplicando styles props
          css={css`
            text-align: center;
            margin-top: 3rem;
          `}
        >
          Nuevo Producto
        </h1>
        <Formulario
          // Ejecutando la funcion que viene desde el custom hook y se ejecuta al enviar formulario
          onSubmit={handleSubmit}
          noValidate
        >
          <fieldset>
            <legend>Informacion General</legend>
            <Campo>
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                placeholder="Nombre Producto"
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
              <label htmlFor="empresa">Empresa</label>
              <input
                type="text"
                id="empresa"
                placeholder="Nombre Empresa"
                name="empresa"
                value={empresa}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo>
            {
              // Validando si hay errores
              errores.empresa && <Error>{errores.empresa}</Error>
            }

            {/* <Campo>
              <label htmlFor="imagen">Imagen</label>
              <input
                type="file"
                id="imagen"
                name="imagen"
                value={imagen}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo> */}

            <Campo>
              <label htmlFor="url">URL</label>
              <input
                type="url"
                id="url"
                name="url"
                placeholder="URL del Producto"
                value={url}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo>
            {
              // Validando si hay errores
              errores.url && <Error>{errores.url}</Error>
            }
          </fieldset>

          <fieldset>
            <legend>Sobre tu Producto</legend>

            <Campo>
              <label htmlFor="descripcion">Descripcion</label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={descripcion}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo>
            {
              // Validando si hay errores
              errores.descripcion && <Error>{errores.descripcion}</Error>
            }
          </fieldset>

          <InputSubmit type="submit" value="Crear Producto" />
        </Formulario>
      </Layout>
    </div>
  );
};

export default NuevoProducto;
