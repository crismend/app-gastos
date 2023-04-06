import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Header, Titulo, ContenedorHeader } from '../elementos/Header'
import Boton from '../elementos/Boton'
import { Formulario, Input, ContenedorBoton } from '../elementos/ElementosForm'
import { ReactComponent as SvgLogin } from '../imagenes/login.svg'
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from "../Firebase/firebaseConfig";
import Alerta from "../elementos/Alerta";

const Svg = styled(SvgLogin)`
  width: 100%;
  max-height: 11rem;
  margin-bottom: 1.25rem;
`

const InicioSesion = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [estadoAlerta, setEstadoAlerta] = useState(false)
  const [alerta, setAlerta] = useState({})

  const andleChange = (e) => {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    } else if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  }

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

    if (email === '' || password === '') {
      setEstadoAlerta(true); //se ejecuta cuando no se rrellenen los datos
      setAlerta({ tipo: 'error', mensaje: 'Por favor rellene todos los campos' });
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/') //redirige a agregar gasto
    } catch (error) {
      setEstadoAlerta(true);

      let mensaje;
      switch (error.code) {
        case 'auth/wrong-password':
          mensaje = 'La contraseña no es correcta.'
          break;
        case 'auth/user-not-found':
          mensaje = 'No se encontro ninguna cuenta con este correo'
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
        <title>Iniciar Sesion</title>
      </Helmet>

      <Header>
        <ContenedorHeader>
          <Titulo>Iniciar Sesion</Titulo>
          <div>
            <Boton to="/crear-cuenta">Registrarse</Boton>
          </div>
        </ContenedorHeader>
      </Header>

      <Formulario onSubmit={handleSubmit}>
        <Svg />
        <Input
          type="email"
          name="email"
          placeholder="Correo Electronico"
          value={email}
          onChange={andleChange}
        />

        <Input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={password}
          onChange={andleChange}
        />

        {/* BOton es un link con as lo cambiamos a un button */}
        <ContenedorBoton>
          <Boton as="button" primario type="submit">Iniciar Sesion</Boton>
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

export default InicioSesion;