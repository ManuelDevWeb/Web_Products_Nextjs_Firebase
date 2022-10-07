import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Components
import Layout from "../components/layout/Layout";
import DetallesProducto from "../components/layout/DetallesProducto";

// Custom hook
import useProductos from "../hooks/useProductos";

const Buscar = () => {
  // State par guardar resultado de los productos filtrados
  const [resultado, setResultado] = useState([]);

  // Llamando useRouter para tener acceso a la informacion de la URL
  const router = useRouter();
  // console.log(router)

  // Accediendo a la query que viene por la ruta
  const {
    query: { q },
  } = router;

  // Obteniendo Todos los productos
  const { productos } = useProductos("creado");

  // UseEffect que se ejecuta cuando cambia la query y se traigan los productos
  useEffect(() => {
    const busqueda = q.toLowerCase();

    // Filtrando sobre los productos
    const filtro = productos.filter(
      (producto) =>
        producto.nombre.toLowerCase().includes(busqueda) ||
        producto.descripcion.toLowerCase().includes(busqueda)
    );

    setResultado(filtro);
  }, [q, productos]);

  return (
    <div>
      <Layout>
        <div className="listado-productos">
          <div className="contenedor">
            <ul className="bg-white">
              {
                // Iterando sore los productos filtrados
                resultado.map((producto) => (
                  <DetallesProducto key={producto.id} producto={producto} />
                ))
              }
            </ul>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Buscar;
