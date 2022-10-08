import React from "react";

// Components
import Layout from "../components/layout/Layout";
import DetallesProducto from "../components/layout/DetallesProducto";

// Custom hook
import useProductos from "../hooks/useProductos";

// Styled components
// const Heading = styled.h1`
//   color: red;
// `;

const Home = () => {
  const { productos } = useProductos("creado");

  return (
    <div>
      <Layout>
        <div className="listado-productos">
          <div className="contenedor">
            <ul className="bg-white">
              {
                // Iterando sore los productos consultados
                productos.map((producto) => (
                  <DetallesProducto key={producto.id} producto={producto} />
                ))
              }
            </ul>
          </div>
        </div>

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
