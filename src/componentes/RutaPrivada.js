import React from "react";
import { useAuth } from "../contextos/AuthContext";
import { Navigate } from "react-router-dom";


//para acceder a GastosCategoria lo hacemos con children 
const RutaPrivada = ({children}) => {
  const {usuario} = useAuth()   //sabemos si el usuario ha iniciado sesion o no

  if (usuario) {
    return children;
  } else {
    return <Navigate replace to="/iniciar-sesion"/>
  }
}

export default RutaPrivada;