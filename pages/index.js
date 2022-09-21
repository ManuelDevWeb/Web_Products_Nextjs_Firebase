import React from "react";

// Components
import Layout from "../components/layout/Layout";

// Components

// Styled components
// const Heading = styled.h1`
//   color: red;
// `;

const Home = () => {
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
