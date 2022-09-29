import { useState, useEffect } from "react";

// Importando app de firebase inicializada con las funciones
import { firebase } from "../firebase";

const useAutenticacion = () => {
  // State que almacena el usuario logeado
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(null);

  // useEffect que se ejecuta una vez
  useEffect(() => {
    // Validando si hay un usuario autenticado para guardar su sesion (firebase lo hace internamente) y asignandolo al state local
    const unsuscribe = firebase.auth.onAuthStateChanged((usuario) => {
      if (usuario) {
        setUsuarioAutenticado(usuario);
      } else {
        setUsuarioAutenticado(null);
      }
    });

    return () => unsuscribe();
  }, []);

  return {
    usuarioAutenticado,
  };
};

export default useAutenticacion;
