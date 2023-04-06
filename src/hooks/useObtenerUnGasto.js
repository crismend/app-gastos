import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../Firebase/firebaseConfig";
import {useNavigate} from 'react-router-dom';



const useObtenerUnGasto = (id) => {
  const navigate = useNavigate();
  const [gasto, setGasto] = useState('')

  useEffect(() => {
    const obtenerUnGasto = async() => {
      const documento = await getDoc(doc(db, 'gastos', id));

      if (documento.exists) {
        setGasto(documento);
      } else {
        navigate('/lista')
      }
    }
    obtenerUnGasto();
    
  },[navigate, id])

  return [gasto];
}

export default useObtenerUnGasto;