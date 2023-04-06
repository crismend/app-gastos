import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import WebFont from 'webfontloader';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
//elementos
import Contenedor from './elementos/Contenedor';
import Fondo from './elementos/Fondo';
//comoponentes
import EditarGasto from './componentes/EditarGasto'
import GastosCategoria from './componentes/GastosCategoria'
import InicioSesion from './componentes/InicioSesion'
import ListaDeGastos from './componentes/ListaDeGastos'
import RegistroUsuarios from './componentes/RegistroUsuarios'
import RutaPrivada from './componentes/RutaPrivada';
//helmet
import { Helmet } from "react-helmet";
import favicon from './imagenes/logo.png'
//estado global authContext
import { AuthProvider } from './contextos/AuthContext';
import { TotalGastadoProvider } from './contextos/TotalGastadoContext';

//fuentes
WebFont.load({
  google: {
    //Work+Sans:wght@400;500;700
    //Roboto+Slab:wght@400;500;700
    families: ['Roboto Slab: 400, 500, 700', 'sans-serif']
  }
});

//rutas
const Index = () => {
  return (
    <>
      <Helmet>
        <link rel='shortcut icon' href={favicon} type='image/x-icon' />
      </Helmet>

      <AuthProvider>
        <TotalGastadoProvider>
          <BrowserRouter>
            <Contenedor>
              <Routes>
                <Route path='/iniciar-sesion' element={<InicioSesion />} />
                <Route path='/crear-cuenta' element={<RegistroUsuarios />} />

                <Route path='/categorias' element={
                  <RutaPrivada>
                    <GastosCategoria />
                  </RutaPrivada>
                } />
                <Route path='/lista' element={
                  <RutaPrivada >
                    <ListaDeGastos />
                  </RutaPrivada>
                } />
                <Route path='/editar/:id' element={
                  <RutaPrivada >
                    <EditarGasto />
                  </RutaPrivada>
                } />
                <Route path='/' element={
                  <RutaPrivada >
                    <App />
                  </RutaPrivada>
                } />
              </Routes>
            </Contenedor>
          </BrowserRouter>
        </TotalGastadoProvider>
      </AuthProvider>
      <Fondo />
    </>

  );
}



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Index />);



