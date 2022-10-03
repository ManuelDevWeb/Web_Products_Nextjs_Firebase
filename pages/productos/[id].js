import React, { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import { getDoc, doc } from "firebase/firestore";

// Componentes
import Layout from "../../components/layout/Layout";
import Error404 from "../../components/layout/404";

// Importando Context Firebase
import { FirebaseContext } from "../../firebase";

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

  return (
    <Layout>
      <>{error && <Error404 />}</>
    </Layout>
  );
};

export default Producto;
