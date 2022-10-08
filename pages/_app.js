// Importando app de firebase inicializada y el contexto
import FirebaseContext from "../firebase/context";
import firebase from "../firebase/firebase";
// Custom Hooks
import useAutenticacion from "../hooks/useAutenticacion";

// Esto es como si fuera el app.js de create react app
const MyApp = (props) => {
  // Propios de Nextjs. Component es el componente actual y props, son los props de la pagina.
  const { Component, pageProps } = props;

  // Llamando y destructurando el custom hook
  const { usuarioAutenticado } = useAutenticacion();

  return (
    // Provider (Permite a los hijos tener acceso al state)
    <FirebaseContext.Provider value={{ firebase, usuarioAutenticado }}>
      <Component {...pageProps} />
    </FirebaseContext.Provider>
  );
};

export default MyApp;
