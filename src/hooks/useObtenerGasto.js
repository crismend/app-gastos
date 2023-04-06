
import { onSnapshot, collection, query, orderBy, where, limit, startAfter } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../Firebase/firebaseConfig";
import { useAuth } from "../contextos/AuthContext"

const useObtenerGasto = () => {

  const { usuario } = useAuth();
  const [gastos, setGastos] = useState([])
  const [ultimoGasto, setUltimoGasto] = useState(null);
  const [hayMasPorCargar, setHayMasPorCargar] = useState(false);

  //funcion para obtener mas gastos
  const obtenerMasGastos = () => {
    const consulta = query(
      collection(db, 'gastos'),
      where('uidUsuario', '==', usuario.uid),
      orderBy('fecha', 'desc'),
      limit(10),
      startAfter(ultimoGasto)  //trae los 10 doc ordenados
    );
    //cargar los otros gastos
    onSnapshot(consulta, (snapshot) => {
      if (snapshot.docs.length > 0) {
        setUltimoGasto(snapshot.docs[snapshot.docs.length - 1]);

        setGastos(gastos.concat(snapshot.docs.map((gasto) => {
          return { ...gasto.data(), id: gasto.id }
        })))
      } else {
        setHayMasPorCargar(false);
      }
    }, error => { console.log(error) });
  }

  //!obteniendo las tareas
  useEffect(() => {
    const consulta = query(
      collection(db, 'gastos'),
      where('uidUsuario', '==', usuario.uid),
      orderBy('fecha', 'desc'),
      limit(10)
    );

    const unsuscribe = onSnapshot(consulta, (snapshot) => {
      if (snapshot.docs.length > 0) {
        setUltimoGasto(snapshot.docs[snapshot.docs.length - 1]);
        setHayMasPorCargar(true);
      } else {
        setHayMasPorCargar(false);
      }
      setGastos(snapshot.docs.map((gasto) => {
        return { ...gasto.data(), id: gasto.id }
      }));
    })
    //limpiamos 
    return unsuscribe;
  }, [usuario])


  //en el return devolvemos un arreglo con los gastos
  return [gastos, obtenerMasGastos, hayMasPorCargar];
}

export default useObtenerGasto;
