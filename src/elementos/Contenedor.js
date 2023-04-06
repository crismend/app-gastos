import styled from "styled-components";


const Contenedor = styled.div`
    background: #fff;
    width: 90%;
    max-width: 70rem; /*1110px*/
    height: 90vh;
    max-height: 50rem;  /* 800px */
    overflow-y: auto;  /*tener scroll*/
    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
    border-radius: 0.625rem; /* 10px */
    margin: auto;
    display: flex; /* poder usar flex direction colum*/
    flex-direction: column;
    justify-content: space-between; /* espacios los divide entre ellos y los acomoda*/
    position: relative; /* se necesita para el posicion abosolut*/
    z-index: 100;

    
    @media(max-width: 60rem){ /* 950px */
        height: 95vh; 
        max-height: none; /*altura de  lo que se necesite*/
    }
`;

export default Contenedor;