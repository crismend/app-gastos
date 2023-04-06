import React from "react";
import { Header, Titulo, } from "./../elementos/Header";
import { Helmet } from "react-helmet";
import BtnRegresar from "../elementos/BtnRegresar";
import BarraTotalGastado from "./BarraTotalGastado";
import useObtenerGastosDelMesCategoria from "../hooks/useObtenerGastosDelMesCategorias"
import { ListaDeCategorias, ElementoListaCategorias, Categoria, Valor } from "../elementos/ElementosDeLista"
import IconoCategoria from "../elementos/iconoCategoria"
import convertirAMoneda from "../funciones/convertirAMoneda"

const GastosCategoria = () => {
  const gastosPorCategoria = useObtenerGastosDelMesCategoria();
  // console.log(gastosPorCategoria)

  return (
    <>
      <Helmet>
        <title>Gastos por Categoria</title>
      </Helmet>

      <Header>
        <BtnRegresar />
        <Titulo>Gastos por Categoria</Titulo>
      </Header>

      <ListaDeCategorias>
        {gastosPorCategoria.map((elemento, index) => {
            return (
                <ElementoListaCategorias key={index}>
                    <Categoria>
                      <IconoCategoria id={elemento.categoria}/>
                      {elemento.categoria}
                      </Categoria>
                    <Valor>{convertirAMoneda(elemento.cantidad)}</Valor>
                </ElementoListaCategorias>
              )
        })}
      </ListaDeCategorias>


      <BarraTotalGastado />
    </>
  );
}

export default GastosCategoria;