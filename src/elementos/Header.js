import styled from "styled-components";

const Header = styled.div`
    width: 100%;  /*del ancho*/
    padding: 2.5rem; /* 40px */
    display: flex;
    justify-content: space-between;
    align-items: center;
 
    @media(max-width: 60rem){ /* 950px */
        justify-content: start;
        flex-direction:column-reverse;
        margin-bottom: 1.5rem;
    }
`;

const Titulo = styled.h1`
    font-weight: normal;
    text-transform: uppercase;
    font-size: 2.5rem; /* 40px */
    
 
    @media(max-width: 60rem){ /* 950px */
    margin-top: 3.5rem;
        font-size: 2rem; /* 32px */
    }
`;

const ContenedorHeader = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;

 
    @media(max-width: 60rem){ /* 950px */
        display: flex;
        flex-direction: column-reverse;
        align-items: center;
 
        & > div {
            display: flex;
            margin-bottom: 1.25rem; /* 20px */
            justify-content: end;
        }
    }
`;

const ContenedorBotones = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media(max-width: 480px){  /*opcion de otones en movil*/
        display: flex;
        justify-content:center;
        /* flex-direction: column; */
        align-items: center;
}
`;

export { Header, Titulo, ContenedorHeader, ContenedorBotones };