import React, { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import { getDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { es } from "date-fns/locale";

// Componentes
import Layout from "../../components/layout/Layout";
import Error404 from "../../components/layout/404";
import { Campo, InputSubmit } from "../../components/ui/Formulario";
import Boton from "../../components/ui/Boton";

// Importando Context Firebase
import { FirebaseContext } from "../../firebase";

// Styled components
const ContenedorProducto = styled.div`
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 2fr 1fr;
    column-gap: 2rem;
  }
`;

const CreadorProducto = styled.p`
  padding: 0.5rem 2rem;
  background-color: #0c7c65;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  display: inline-block;
  text-align: center;
`;

const Producto = () => {
  // State del producto
  const [producto, setProducto] = useState({});
  // State del error
  const [error, setError] = useState(false);
  // State de comentario
  const [comentario, setComentario] = useState({});
  // State para indicar que consulte a la DB
  const [consultarDB, setConsultarDB] = useState(true);

  // Llamando useRouter para tener acceso a la informacion de la URL
  const router = useRouter();

  // Obteniendo el id actual de la URL
  const {
    query: { id },
  } = router;

  // Accediendo al contexto y a los valores
  const { firebase, usuarioAutenticado } = useContext(FirebaseContext);

  // useEffect que se ejecuta cada que cambia el id
  useEffect(() => {
    // Validamos que exista un id
    if (id && consultarDB) {
      // Realizamos consulta a la DB de firebase
      const obtenerProducto = async () => {
        // Describiendo lo que queremos traer de la DB
        const productoQuery = doc(firebase.db, "movies", id);
        // Obteniendo la data a partir de la query
        const producto = await getDoc(productoQuery);

        // Validando si existe el documento en la DB
        if (producto.exists()) {
          // Almacenando la data de producto en el state
          setProducto(producto.data());
          setConsultarDB(false);
        } else {
          setError(true);
          setConsultarDB(false);
        }
      };
      obtenerProducto();
    }
  }, [id, consultarDB]);

  if (Object.keys(producto).length === 0 && !error) return "Cargando...";

  const {
    comentarios,
    creado,
    descripcion,
    empresa,
    nombre,
    url,
    imageUrl,
    votos,
    creador,
    votantes,
  } = producto;

  // Funcion para administrar y validar votos
  const votarProducto = async () => {
    // Si el usuario no esta logeado lo enviamos a la pagina de login
    if (!usuarioAutenticado) {
      return router.push("/login");
    }

    // Obtener y sumar un nuevo voto
    const nuevoTotal = votos + 1;

    // Verificar si el usuario actual ha votado
    if (votantes.includes(usuarioAutenticado.uid)) return;

    // Guardar el id del usuario que vota en el arreglo de votantes
    const nuevoVotantes = [...votantes, usuarioAutenticado.uid];

    // Actualizar en la DB de firebase
    // Describiendo lo que queremos traer de la DB
    const productoQuery = doc(firebase.db, "movies", id);
    // Modificamos el documento obtenido y pasamos la data
    await updateDoc(productoQuery, {
      votos: nuevoTotal,
      votantes: nuevoVotantes,
    });

    // Actualizar el state
    setProducto({
      ...producto,
      votos: nuevoTotal,
    });

    // Pasamos a true para consultar de nuevo
    setConsultarDB(true);
  };

  // Funcion para crear comentario
  const comentarioChange = (e) => {
    setComentario({
      ...comentario,
      [e.target.name]: e.target.value,
    });
  };

  // Funcion para agregar comentarios al producto
  const agregarComentario = async (e) => {
    e.preventDefault();

    // Validamos si el usuario esta autenticado
    if (!usuarioAutenticado) {
      return router.push("/login");
    }

    // Informacion extra al comentario
    comentario.usuarioId = usuarioAutenticado.uid;
    comentario.usuarioNombre = usuarioAutenticado.displayName;

    // Tomar copia de comentarios y agregarlos al arreglo
    const nuevosComentarios = [...comentarios, comentario];

    // Actualizar en la DB de firebase
    // Describiendo lo que queremos traer de la DB
    const productoQuery = doc(firebase.db, "movies", id);
    // Modificamos el documento obtenido y pasamos la data
    await updateDoc(productoQuery, {
      comentarios: nuevosComentarios,
    });

    // Actualizar el state
    setProducto({
      ...producto,
      comentarios: nuevosComentarios,
    });

    // Pasamos a true para consultar de nuevo
    setConsultarDB(true);
  };

  // Funcion que identifica si el comentario es del creador del producto
  const esCreador = (id) => {
    if (creador.id === id) {
      return true;
    }
  };

  // Funcion que revisa que el creados del producto sea el que esta logeado
  const puedeBorrar = () => {
    // Validando si hay usuario logeado
    if (!usuarioAutenticado) return false;

    if (creador.id === usuarioAutenticado.uid) {
      return true;
    }
  };

  // Funcion para eliminar producto de la DB
  const eliminarProducto = async () => {
    if (!usuarioAutenticado) {
      return router.push("/login");
    }

    if (creador.id !== usuarioAutenticado.uid) {
      return router.push("/");
    }

    try {
      // Describiendo lo que queremos traer de la DB
      const productoQuery = doc(firebase.db, "movies", id);
      // Eliminando de Firebase
      await deleteDoc(productoQuery);

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <>
        {error ? (
          <Error404 />
        ) : (
          <div className="contenedor">
            <h1
              // Styled props
              css={css`
                text-align: center;
                margin-top: 1rem;
              `}
            >
              {nombre}
            </h1>

            <ContenedorProducto>
              <div>
                <p>
                  Publicado hace:{" "}
                  {formatDistanceToNow(new Date(creado), { locale: es })}
                </p>

                <p>
                  Publicado por: {creador.nombre} de - {empresa}
                </p>

                <img src={imageUrl} alt={`Imagen ${nombre}`} />

                <p>{descripcion}</p>

                {
                  // Validando si el usuario esta logeado
                  usuarioAutenticado && (
                    <>
                      <h2>Agrega tu comentario</h2>
                      <form
                        // Funcion que se ejecuta al enviar formulario
                        onSubmit={agregarComentario}
                      >
                        <Campo>
                          <input
                            type="text"
                            name="mensaje"
                            onChange={comentarioChange}
                          />
                        </Campo>
                        <InputSubmit type="submit" value="Agregar comentario" />
                      </form>
                    </>
                  )
                }

                <h2
                  css={css`
                    margin: 2rem 0;
                  `}
                >
                  Comentarios
                </h2>

                {comentarios.length === 0 ? (
                  "Aun no hay comentarios"
                ) : (
                  <ul>
                    {
                      // Iterando sobre los comentarios
                      comentarios.map((comentario, i) => (
                        <li
                          key={`${comentario.usuarioId}-${i}`}
                          css={css`
                            border: 1px solid #e1e1e1;
                            padding: 2rem;
                          `}
                        >
                          <p>{comentario.mensaje}</p>
                          <p>
                            Escrito por:
                            <span
                              css={css`
                                font-weight: bold;
                              `}
                            >
                              {" "}
                              {comentario.usuarioNombre}
                            </span>
                          </p>
                          {esCreador(comentario.usuarioId) && (
                            <CreadorProducto>Es Creador</CreadorProducto>
                          )}
                        </li>
                      ))
                    }
                  </ul>
                )}
              </div>

              <aside>
                <Boton target="_blank" bgColor="true" href={url}>
                  Visitar URL
                </Boton>

                <div
                  css={css`
                    margin-top: 5rem;
                  `}
                >
                  {
                    // Validando si el usuario esta logeado
                    usuarioAutenticado && (
                      <Boton onClick={votarProducto}>Votar</Boton>
                    )
                  }

                  <p
                    css={css`
                      text-align: center;
                    `}
                  >
                    {votos} Votos
                  </p>
                </div>
              </aside>
            </ContenedorProducto>

            {puedeBorrar() && (
              <Boton onClick={eliminarProducto}>Eliminar Producto</Boton>
            )}
          </div>
        )}
      </>
    </Layout>
  );
};

export default Producto;
