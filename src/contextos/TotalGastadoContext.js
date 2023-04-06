import React,{useState,useEffect, useContext} from "react";
import useObtenerGastosDelMes from "../hooks/useObtenerGastosDelMes";


const  TotalGalstadoContext = React.createContext();

const useTotalDelMes = () => useContext(TotalGalstadoContext);

const TotalGastadoProvider = ({children}) => {
  const [total, setTotal] = useState(0)
  const gastos = useObtenerGastosDelMes();

  useEffect(() => {
    let acumulado = 0;

    gastos.forEach((gasto) => {
       acumulado += gasto.cantidad
    })
    setTotal(acumulado)
  }, [gastos])

  return(
      <TotalGalstadoContext.Provider value={{total: total}}> 
        {children}
      </TotalGalstadoContext.Provider>
    )
}


export {TotalGastadoProvider, useTotalDelMes}