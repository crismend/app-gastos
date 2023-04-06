import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Header, Titulo, ContenedorHeader } from '../elementos/Header'
import Boton from '../elementos/Boton'
import { Formulario, Input, ContenedorBoton } from '../elementos/ElementosForm'
import inicioS from '../imagenes/inicioSesion.png'
import styled from "styled-components";
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../Firebase/firebaseConfig";
import { useNavigate } from 'react-router-dom'; //accede a las opciones para redirigir
import Alerta from "../elementos/Alerta";


//imagen
const Img = styled.img`
  display: flex;
  width: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;

  @media(max-width: 60rem){ 
  margin-top: 1.2rem;
  margin-bottom: 1.2rem;
}
`;

const RegistroUsuarios = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [estadoAlerta, setEstadoAlerta] = useState(false)
  const [alerta, setAlerta] = useState({})

  //manejador de inputs de registro
  const handleChange = (e) => {
    switch (e.target.name) {
      case 'email':
        setEmail(e.target.value)
        break;
      case 'password':
        setPassword(e.target.value)
        break;
      case 'password2':
        setPassword2(e.target.value)
        break;
      default:
        break;
    }
  }


  // funcion para manejar y enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault()
    setEstadoAlerta(false);   //aseguramos que el estado como el mensaje sean ocultos 
    setAlerta({});

    //comprovamos del lado del cliente que el correo sea valido
    const expresionRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/
    if (!expresionRegular.test(email)) {
      setEstadoAlerta(true); //se ejecuta cuando el correo no se avalido
      setAlerta({ tipo: 'error', mensaje: 'Por favor ingrese un Correo valido' });
      return;
    }

    if (email === '' || password === '' || password2 === '') {
      setEstadoAlerta(true); //se ejecuta cuando no se rrellenen los datos
      setAlerta({ tipo: 'error', mensaje: 'Por favor rellene todos los campos' });
      return;
    }

    if (password !== password2) {
      setEstadoAlerta(true); //se ejecuta cuando la contraseña no cincida
      setAlerta({ tipo: 'error', mensaje: 'Las contraseñas no coinciden' });
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password)
      navigate('/') //redirige a agregar gasto
    } catch (error) {
      setEstadoAlerta(true);
      let mensaje;
      switch (error.code) {
        case 'auth/invalid-password':
          mensaje = 'La contraseña tiene que ser de al menos 6 caracteres.'
          break;
        case 'auth/email-already-in-use':
          mensaje = 'Ya existe una cuenta con el correo electrónico proporcionado.'
          break;
        case 'auth/invalid-email':
          mensaje = 'El correo electrónico no es válido.'
          break;
        default:
          mensaje = 'Hubo un error al intentar crear la cuenta.'
          break;
      }
      setAlerta({ tipo: 'error', mensaje: mensaje });
    }
  }


  return (
    <>
      <Helmet>
        <title>Crear Cuenta</title>
      </Helmet>

      <Header>
        <ContenedorHeader>
          <Titulo>Crear Cuenta</Titulo>
          <div>
            <Boton to="/iniciar-sesion">Iniciar Sesion</Boton>
          </div>
        </ContenedorHeader>
      </Header>

      <Formulario onSubmit={handleSubmit} >
        <Img src={inicioS} alt='logo' />
        <Input
          type="email"
          name="email"
          placeholder="Correo Electronico"
          value={email}
          onChange={handleChange}
        />

        <Input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={password}
          onChange={handleChange}
        />

        <Input
          type="password"
          name="password2"
          placeholder="Repetir Contraseña"
          value={password2}
          onChange={handleChange}
        />
        {/* BOton es un link con as lo cambiamos a un button */}
        <ContenedorBoton>
          <Boton as="button" primario type="submit">Crear Cuenta</Boton>
        </ContenedorBoton>
      </Formulario>

      <Alerta
        tipo={alerta.tipo}
        mensaje={alerta.mensaje}
        estadoAlerta={estadoAlerta}
        setEstadoAlerta={setEstadoAlerta}
      />
    </>
  );
}

export default RegistroUsuarios;