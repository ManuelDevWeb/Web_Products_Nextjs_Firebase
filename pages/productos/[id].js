import React, { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import { getDoc, doc } from "firebase/firestore";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

// Componentes
import Layout from "../../components/layout/Layout";
import Error404 from "../../components/layout/404";

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
  const { firebase } = useContext(FirebaseContext);

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
  }, [id]);

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
  } = producto;

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
            <div>2</div>

            <aside>2</aside>
          </ContenedorProducto>
        </div>
      </>
    </Layout>
  );
};

export default Producto;
