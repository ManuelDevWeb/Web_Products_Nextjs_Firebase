import React from "react";

// Components
import Layout from "../components/layout/Layout";
import DetallesProducto from "../components/layout/DetallesProducto";

// Custom hooks
import useProductos from "../hooks/useProductos";

// Styled components
// const Heading = styled.h1`
//   color: red;
// `;

const Populares = () => {
  const { productos } = useProductos("votos");

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

export default Populares;
