import app from "firebase/compat/app";

// Configuracion firebase
import firebaseConfig from "./config";

// Clase Firebase con todos los metodos necesarios
class Firebase {
  constructor() {
    // Validamos si no hay ninguna aplicacion inicializada
    if (!app.apps.length) {
      // Cada que se instancie Firebase, se inicia la app
      app.initializeApp(firebaseConfig);
    }
  }
}

// Instanciando un objeto de la clase Firebase
const firebase = new Firebase();

export default firebase;
