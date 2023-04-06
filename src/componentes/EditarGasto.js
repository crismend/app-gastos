import React from "react";
import { Header, Titulo, } from "./../elementos/Header";
import { Helmet } from "react-helmet";
import BtnRegresar from "../elementos/BtnRegresar";
import BarraTotalGastado from "./BarraTotalGastado";
import FormularioGasto from "./FormularioGasto";
import { useParams } from "react-router-dom"; //hook para acceder alos parametros de la barra de direcciones
import useObtenerUnGasto from "../hooks/useObtenerUnGasto"

const EditarGasto = () => {

  const {id} = useParams();
  const [gasto] = useObtenerUnGasto(id)

  return ( 
    <>
    <Helmet>
      <title>Editar Gasto</title>
    </Helmet>

    <Header>
      <BtnRegresar ruta="/lista" />
      <Titulo>Editar Gasto  </Titulo>
    </Header>
    <FormularioGasto gasto={gasto} />
    <BarraTotalGastado />
  </>
    );
}

export default EditarGasto;