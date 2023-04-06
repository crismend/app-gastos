import {db} from './firebaseConfig'
import { collection, addDoc } from "firebase/firestore";


//funcion para enviar los elementos a la base de datos
const agregarGasto = ({ categoria, descripcion, cantidad, fecha, uidUsuario }) => {
   return addDoc(collection(db, "gastos"), { //devuelve una promesa, retornamos para poder ejecutar el codigo para poner en blanco todo 
    categoria: categoria,
    descripcion: descripcion,
    cantidad: Number(cantidad),
    fecha: fecha, 
    uidUsuario: uidUsuario
  });
}


export default agregarGasto;