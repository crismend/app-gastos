import React, { useState, useEffect } from "react";
import { ContenedorFiltros, Formulario, Input, InputGrande, ContenedorBoton } from '../elementos/ElementosForm'
import Boton from "../elementos/Boton";
import { ReactComponent as IconoPlus } from "../imagenes/plus.svg";
import SelectCategorias from "./SelectCategorias";
import DatePick from "./DatePicker";
import fromUnixTime from 'date-fns/fromUnixTime'
import getUnixTime from 'date-fns/getUnixTime'
import agregarGasto from "../Firebase/agregarGasto";
import { useAuth } from './../contextos/AuthContext'
import Alerta from '../elementos/Alerta'  //se deben poner 2 estados
import { useNavigate } from "react-router-dom";
import editarGasto from "../Firebase/editarGasto"


const FormularioGasto = ({ gasto }) => {
  const [inputDescripcion, setInputDescripcion] = useState('')
  const [inputCantidad, setInputCantidad] = useState('')
  const [categoria, setCategoria] = useState('hogar')
  const [fecha, setFecha] = useState(new Date())
  const [estadoAlerta, setEstadoAlerta] = useState(false)
  const [alerta, setAlerta] = useState({})

  const { usuario } = useAuth();
  const navigate = useNavigate();

  //comprovamos si hay algun gasto agregado para poder editar
  //de ser asi establesemos todo el state con el valor del gasto
  useEffect(() => {
    //comprovamos que el gasto sea del usuario actual con uid
    if (gasto) {

      if (gasto.data().uidUsuario === usuario.uid) {
        setCategoria(gasto.data().categoria);
        setFecha(fromUnixTime(gasto.data().fecha));
        setInputDescripcion(gasto.data().descripcion)
        setInputCantidad(gasto.data().cantidad)
      } else {
        navigate('/lista')
      }
    }
  }, [gasto, usuario, navigate])



  const handleChange = (e) => {
    if (e.target.name === 'descripcion') {
      setInputDescripcion(e.target.value);
    } else if (e.target.name === 'cantidad') {
      setInputCantidad(e.target.value.replace(/[^0-9.]/g, ''));
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let cantidad = parseFloat(inputCantidad).toFixed(2) //permite extraer decimales
    // console.log(cantidad)

    //comprobamos que haya descripcion y valor y no esten vacios
    if (inputDescripcion !== '' && inputCantidad !== '') {
      if (cantidad) {
        if (gasto) {  
          editarGasto({
            id: gasto.id,
            categoria: categoria,
            descripcion: inputDescripcion,
            cantidad: cantidad,
            fecha: getUnixTime(fecha)
          }).then(() => {
            navigate('/lista')
          }).catch((error) => {
            console.log(error)
          })
        } else {
          agregarGasto({
            categoria: categoria,
            descripcion: inputDescripcion,
            cantidad: cantidad,
            fecha: getUnixTime(fecha),
            uidUsuario: usuario.uid
          })
            //accedemos a la promesa que devolvimos con .then
            .then(() => {
              setCategoria('hogar');
              setInputDescripcion('');
              setInputCantidad('');
              setFecha(new Date());
  
              setEstadoAlerta(true);
              setAlerta({ tipo: 'exito', mensaje: 'El gasto fue agregado correctamente. ' })
            })
            .catch((error) => {
              setEstadoAlerta(true);
              setAlerta({ tipo: 'error', mensaje: 'Hubo un problema al intentar agregar el gasto.' })
            })
        }

      } else {
        setEstadoAlerta(true);
        setAlerta({ tipo: 'error', mensaje: 'El valor no es correcto' })
      }

    } else {
      setEstadoAlerta(true);
      setAlerta({ tipo: 'error', mensaje: 'Por favor relenar todos los campos' })
    }
  }

  return (
    <Formulario onSubmit={handleSubmit}>
      <ContenedorFiltros>
        <SelectCategorias categoria={categoria} setCategoria={setCategoria} />
        <DatePick fecha={fecha} setFecha={setFecha} />
      </ContenedorFiltros>

      <div>
        <Input
          type="text"
          name="descripcion"
          id="descripcion"
          placeholder="DESCRIPCIÓN"
          value={inputDescripcion}
          onChange={handleChange}
        />

        <InputGrande
          type="text"
          name="cantidad"
          id="cantidad"
          placeholder="$0.00"
          value={inputCantidad}
          onChange={handleChange}
        />
      </div>
      <ContenedorBoton>
        <Boton as="button" primario conIcono type="submit">
         {gasto ? 'Editar Gasto' : 'Agregar Gasto'} <IconoPlus />
        </Boton>
      </ContenedorBoton>
      <Alerta
        tipo={alerta.tipo}
        mensaje={alerta.mensaje}
        estadoAlerta={estadoAlerta}
        setEstadoAlerta={setEstadoAlerta}
      />

    </Formulario>
  );
}

export default FormularioGasto;