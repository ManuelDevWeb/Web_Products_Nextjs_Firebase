import React, { useEffect, useState, useContext } from "react";
import { getDocs, collection } from "firebase/firestore";

// Components
import Layout from "../components/layout/Layout";

// Importando Context Firebase
import { FirebaseContext } from "../firebase";

// Styled components
// const Heading = styled.h1`
//   color: red;
// `;

const Home = () => {
  // Accediendo al contexto y a los valores
  const { firebase } = useContext(FirebaseContext);

  // State de productos
  const [productos, setProductos] = useState([]);

  // UseEffect que se ejecuta una vez se renderiza el componente
  useEffect(() => {
    const obtenerProductos = async () => {
      // Describiendo lo que nos queremos traer de la DB
      const querySnapshot = await getDocs(collection(firebase.db, "productos"));
      // Obteniendo los datos a partir de la query
      const productos = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      // Almacenando los datos en el state
      setProductos(productos);
    };
    obtenerProductos();
  }, []);

  return (
    <div>
      <Layout>
        <h1>Inicio</h1>

        {/* 
        CSS en Next.js
        <style jsx>
          {`
            h1 {
              color: red;
            }
          `}
        </style> 
      */}
      </Layout>
    </div>
  );
};

export default Home;
