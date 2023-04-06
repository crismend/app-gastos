import React from "react";
import { Helmet } from "react-helmet";
import { Header, Titulo, ContenedorHeader, ContenedorBotones } from './elementos/Header'
import Boton from "./elementos/Boton";
import BotonCerrarSesion from "./elementos/BotonCerrarSesion";
import FormularioGasto from "./componentes/FormularioGasto";
import BarraTotalGastado from "./componentes/BarraTotalGastado";

const App = () => {
  return (
    <>
      <Helmet>
        <title>Agregar gasto</title>
      </Helmet>

      <Header>
        <ContenedorHeader>
          <Titulo>Agregar Gasto</Titulo>
        </ContenedorHeader>
        {/* Botones Header */}
        <ContenedorBotones>
          <Boton to="/categorias">Categorias</Boton>
          <Boton to="/lista"> Gastos</Boton>
          <BotonCerrarSesion />
        </ContenedorBotones>
      </Header>

      <FormularioGasto />

      <BarraTotalGastado />
    </>
  );
}

export default App;