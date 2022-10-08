import React, { useState, useEffect, useContext } from "react";
import { getDocs, collection, query, orderBy } from "firebase/firestore";

// Importando Contexto Firebase
import FirebaseContext from "../firebase/context";

const useProductos = (orden) => {
  // Accediendo al contexto y a los valores
  const { firebase } = useContext(FirebaseContext);

  // State de productos
  const [productos, setProductos] = useState([]);

  // UseEffect que se ejecuta una vez se renderiza el componente
  useEffect(() => {
    const obtenerProductos = async () => {
      // Describiendo lo que nos queremos traer de la DB
      const querySnapshot = await getDocs(
        query(collection(firebase.db, "movies"), orderBy(orden, "desc"))
      );
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

  return {
    productos,
  };
};

export default useProductos;
