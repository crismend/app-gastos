import React from "react";
import styled from "styled-components";
import casita from '../imagenes/house-cost.png'

/*hondas inferior*/
// const Svg = styled.svg`
//     height: 50vh;
//     width: 100%;
//     position: fixed; /*posicion fija*/
//     bottom: 0;
//     z-index: 0;
//     path {
//       fill: rgba(130,350,194, .90);
//     }
// `;

/* estilo para los puntos, estructura llamando una funcion*/
/*imagen de fondo*/
const PuntosArriba = styled.img`
    width: 14.5rem;
    height: auto;
    position: fixed;
    z-index: 1;
    top: 2.5rem; /* 40px */
    left: 2.5rem; /* 40px */  
`;
const PuntosAbajo = styled.img`
        width: 14.7rem;
    height: auto;
    position: fixed;
    z-index: 1;
    bottom: 2.5rem; /* 40px */
    right: 2.5rem; /* 40px */
`;

const Fondo = () => {
  return (
    <>
      <PuntosArriba src={casita} alt='casita' />
      {/* honda de waves */}
      {/* <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"
        preserveAspectRatio="none">
        <path
          fillOpacity="1" d="M0,96L60,128C120,160,240,224,360,229.3C480,235,600,181,720,149.3C840,117,960,107,1080,106.7C1200,107,1320,117,1380,122.7L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
      </Svg> */}
      <PuntosAbajo src={casita} alt='casita' />
    </>
  );
}

export default Fondo;