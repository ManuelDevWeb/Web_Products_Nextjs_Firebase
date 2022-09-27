import App from "next/app";

// Importando app de firebase inicializada y el contexto
import { firebase, FirebaseContext } from "../firebase";

// Esto es como si fuera el app.js de create react app
const MyApp = (props) => {
  // Propios de Nextjs. Component es el componente actual y props, son los props de la pagina.
  const { Component, pageProps } = props;

  return (
    // Provider (Permite a los hijos tener acceso al state)
    <FirebaseContext.Provider value={{ firebase }}>
      <Component {...pageProps} />
    </FirebaseContext.Provider>
  );
};

export default MyApp;
