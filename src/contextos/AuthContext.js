import React, { useContext, useEffect, useState } from "react";
import { auth } from "../Firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

//creamos el contexto
const AuthContext = React.createContext()

//?Hook para acceder al contexto
const useAuth = () => {
  return useContext(AuthContext)
}

//creamos el componente padre encierra la app y provee el estado (provider)
//recive como propiedad los elementos hijo  
// en el Provider le inyectamos el estado de la app value={{}}
const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState();
  const [cargando, setCargando] = useState(true)     //state para saber cuando carga la comprovacion de onAuthStateChanged

  //effect para ejecutar la comprovacion una sola vez
  useEffect(() => {
    //comprovamos si hay un usuario, con el servicio de auth de firestore
    const cancelarSuscripcion = onAuthStateChanged(auth, (usuario) => {
      setUsuario(usuario);      //obtenemos el objeto de usuario solo si iniciamos secion, si no devuelve null
      setCargando(false);
    });
    return cancelarSuscripcion;
  }, []); //arreglo de dependencia vacia comprobar solo una vez

  return (
    //utilizamos usuario de useState si tenemos un usuario lo devuelve si no null
    <AuthContext.Provider value={{ usuario: usuario }}>
      {/* los elementos children no cargan si no hay una comprobacion de usuario */}
      {!cargando && children}  
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext, useAuth };