import React, { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import { getDoc, doc, updateDoc } from "firebase/firestore";
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

const Producto = () => {
  // State del producto
  const [producto, setProducto] = useState({});
  // State del error
  const [error, setError] = useState(false);

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
    if (id) {
      // Realizamos consulta a la DB de firebase
      const obtenerProducto = async () => {
        // Describiendo lo que queremos traer de la DB
        const productoQuery = doc(firebase.db, "productos", id);
        // Obteniendo la data a partir de la query
        const producto = await getDoc(productoQuery);

        // Validando si existe el documento en la DB
        if (producto.exists()) {
          // Almacenando la data de producto en el state
          setProducto(producto.data());
        } else {
          setError(true);
        }
      };
      obtenerProducto();
    }
  }, [id, producto]);

  if (Object.keys(producto).length === 0) return "Cargando...";

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

    // Actualizar en la DB de firebbase
    // Describiendo lo que queremos traer de la DB
    const productoQuery = doc(firebase.db, "productos", id);
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
  };

  return (
    <Layout>
      <>
        {error && <Error404 />}

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
                    <form>
                      <Campo>
                        <input type="text" name="mensaje" />
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
              {
                // Iterando sobre los comentarios
                comentarios.map((comentario) => (
                  <li>
                    <p>{comentario.nombre}</p>
                    <p>Escrito por: {comentario.usuarioNombre}</p>
                  </li>
                ))
              }
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
        </div>
      </>
    </Layout>
  );
};

export default Producto;
