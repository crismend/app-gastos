import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components"; //permite animar
import theme from "../tema";


const slideDown = keyframes`
    0% {
        transform: translateY(-1.25rem); /* 20px */
        opacity: 0;
    }
 
    10% {
        transform: translateY(1.25rem);
        opacity: 1;
    }
    
    90% {
        transform: translateY(1.25rem);
        opacity: 1;
    }
 
    100% {
        transform: translateY(1.25rem);
        opacity: 0;
    }
`;

const ContenedorAlerta = styled.div`
    z-index: 1000;   /*aparezca arriba de todo*/
    width: 100%;
    left: 0;
    top: 1.25rem; /* 20px */
    position: fixed;  /*queda fijo en pantalla*/
    display: flex;
    justify-content: center;
    align-items: center;
    animation: ${slideDown} 4s ease forwards;  /*animacion tomada de loskeyframes*/
 
    p {
 
        background: ${(props) => {
    if (props.tipo === 'error') {
      return theme.rojo;
    } else if (props.tipo === 'exito') {
      return theme.verde;
    } else {
      return '#000';
    }
  }};
        color: #fff;
        padding: 1.25rem 2.5rem; /* 20px 40px */
        border-radius: 0.31rem; /* 5px */
        box-shadow: 0px 0px 15px rgba(0,0,0,.1);
        text-align: center;
    }
`;

//contenedor Alerta
const Alerta = ({ tipo, mensaje, estadoAlerta, setEstadoAlerta }) => {
// useEffect solo se ejecuta cuando estadoAlerta, setEstadoAlerta cambien
  useEffect(() => {
    let tiempo;
    if (estadoAlerta === true) {
      tiempo = setTimeout(() => {
        setEstadoAlerta(false);
      }, 3000);
    }
    //clearTimeout se ejecuta si el componente se desmonta, se limpia el tiempo
    //para que no cambie el estado si el componente no esta en pantalla
    return(() => clearTimeout(tiempo))
  }, [estadoAlerta, setEstadoAlerta]);

  return (
    // si estadoAlerta es true entonces mostramos contenedor  si es false no
    <>
      {estadoAlerta &&
        <ContenedorAlerta tipo={tipo}>
          <p>{mensaje}</p>
        </ContenedorAlerta>
      }

    </>

  );
}

export default Alerta;