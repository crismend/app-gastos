import React from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import styled from "styled-components";
import theme from "../tema";

//lenguaje
registerLocale('es', es);

//estilos 
const ContenedorInput = styled.div`
    input {
        font-family: 'Work Sans', sans-serif;
        box-sizing: border-box;
        background: ${theme.grisClaro};
        border: none;
        cursor: pointer;
        border-radius: 0.625rem; /* 10px */
        height: 5rem; /* 80px */
        width: 100%;
        padding: 0 1.25rem; /* 20px */
        font-size: 1.5rem; /* 24px */
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        outline: none;
        &:hover {
        background: ${theme.grisClaro2};
     }  
    }
`;

//componente
const DatePick = ({ fecha, setFecha }) => {

  const fechaActual = fecha;


  return (
    <ContenedorInput>
        <DatePicker
        className="datepick "
        selected={fechaActual}
        onChange={date => setFecha(date)}
        dateFormat=" dd 'de' MMMM 'de' yyyy "
        locale='es'
      />
     
    </ContenedorInput>
  );

}



export default DatePick; 