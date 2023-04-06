import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";

//estilos boton
const Btn = styled.button`
    display: block;
    width: 3.12rem; /* 50px */
    height: 3.12rem; /* 50px */
    line-height: 3.12rem; /* 50px */
    text-align: center;
    margin-right: 1.25rem; /* 20px */
    border: none;
    background: #000;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.31rem; /* 5px */
    cursor: pointer;
 
    @media(max-width: 60rem){ /* 950px */
        width: 2.5rem; /* 40px */
        height: 2.5rem; /* 40px */
        line-height: 2.5rem; /* 40px */
    }
`;

//estilos icono
const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    width: 50%;
    height: auto;
    fill: #fff;
`;

//onClick: regresar en pagina
const BtnRegresar = ({ ruta  = '/'}) => {
  const navigate = useNavigate();  //llamado al hook Navigate
  // se pasa navigate a la funcion del onClick y se le pasa la ruta a enviar (como prop)
  return (
    <Btn onClick={() => navigate(ruta)}><StyledFontAwesomeIcon icon={faArrowLeft} /></Btn>
  );
}

export default BtnRegresar;