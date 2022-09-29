import app from "firebase/compat/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

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
    // Metodos de autenticacion de firebase
    this.auth = getAuth();
  }

  // Funcion para registrar un usuario
  async registrarUsuario(nombre, email, password) {
    // Creando usuario en firebase
    const nuevoUsuario = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );

    // Actualizado usuario en firebase
    return await updateProfile(nuevoUsuario.user, {
      displayName: nombre,
    });
  }

  // Funcion para iniciar sesion
  async loginUsuario(email, password) {
    // Iniciando sesion en firebase
    return await signInWithEmailAndPassword(this.auth, email, password);
  }

  // Funcion para cerrar sesion
  async logoutUsuario() {
    // Cerrar sesion en firebase
    await signOut(this.auth);
  }
}

// Instanciando un objeto de la clase Firebase
const firebase = new Firebase();

export default firebase;
