import React, { useContext, useState } from "react";
import { css } from "@emotion/react";
import Router from "next/router";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Components
import Layout from "../components/layout/Layout";
import {
  Formulario,
  Campo,
  InputSubmit,
  Error,
} from "../components/ui/Formulario";
import Error404 from "../components/layout/404";

// Custom Hooks
import useValidacion from "../hooks/useValidacion";
// Funcion para validar datos
import validarCrearProducto from "../validacion/validarCrearProducto";

// Importando Context Firebase
import FirebaseContext from "../firebase/context";

// State inicial
const STATE_INICIAL = {
  nombre: "",
  empresa: "",
  url: "",
  descripcion: "",
};

const NuevoProducto = () => {
  // Accediendo al contexto y a los valores
  const { usuarioAutenticado, firebase } = useContext(FirebaseContext);

  // State imagen
  const [image, setImage] = useState(null);

  // Llamando y destructurando el custom hook
  const {
    valores,
    errores,
    handleSubmit,
    handleChange,
    handleBlur,
    submitForm,
  } = useValidacion(STATE_INICIAL, validarCrearProducto, crearProducto);

  const { nombre, empresa, url, descripcion } = valores;

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
      imageUrl: await handleUpload(),
      descripcion,
      votos: 0,
      comentarios: [],
      creado: Date.now(),
      creador: {
        id: usuarioAutenticado.uid,
        nombre: usuarioAutenticado.displayName,
      },
      votantes: [],
    };

    // Insertando en la DB
    try {
      // Agregando documento (producto) a la coleccion de productos
      await addDoc(collection(firebase.db, "movies"), producto);
      // console.log("Producto agregado", producto);
    } catch (error) {
      console.log(error);
    }
  }

  // Funcion para actualizar el estado de imagen
  const handleFile = (e) => {
    if (e.target.files[0]) {
      // console.log(e.target.files[0]);
      setImage(e.target.files[0]);
    }
  };

  // Funcion para subir la imagen a firestore
  async function handleUpload() {
    if (image === null) return;

    // Creando la referencia de la imagen
    const imagenRef = ref(
      firebase.storage,
      `imagenes/productos/${image.name + image.lastModified}`
    );

    try {
      // Subiendo imagen a firebase
      const fileUploaded = await uploadBytes(imagenRef, image);
      // Obtener url http de la imagen
      return getDownloadURL(fileUploaded.ref);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Layout>
        {!usuarioAutenticado ? (
          <Error404 />
        ) : (
          <>
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

                <Campo>
                  <label htmlFor="image">Imagen</label>
                  <input
                    type="file"
                    accept="image/*"
                    id="image"
                    name="image"
                    onInput={(e) => handleFile(e)}
                  />
                </Campo>

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
          </>
        )}
      </Layout>
    </div>
  );
};

export default NuevoProducto;
