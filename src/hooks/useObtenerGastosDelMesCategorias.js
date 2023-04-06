import  { useState, useEffect } from "react";
import useObtenerGastosDelMes from "./useObtenerGastosDelMes";

const useObtenerGastosDelMesCategoria = () => {
  const [gastosPorCategoria, setgastosPorCategoria] = useState([]);
  const gastos = useObtenerGastosDelMes()

  useEffect(() => {
      //devuelve un objeto que contiene la suma de cada categoria
  const sumaDeGastos = gastos.reduce((objetoResultante, objetoActual) => { 
    const categoriaActual = objetoActual.categoria;
    const cantidadActual = objetoActual.cantidad;

    objetoResultante[categoriaActual] += cantidadActual;

    return objetoResultante

  }, {
    'comida': 0,
    'cuentas y pagos': 0,
    'hogar': 0,
    'transporte': 0,
    'ropa': 0,
    'salud e higiene': 0,
    'compras': 0,
    'diversion': 0,
  });

 setgastosPorCategoria(Object.keys(sumaDeGastos).map((elemento) => {
  return {categoria: elemento, cantidad: sumaDeGastos[elemento]}
})) 
    
  },[gastos, setgastosPorCategoria])

  return gastosPorCategoria;
}

export default useObtenerGastosDelMesCategoria;
