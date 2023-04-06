const formatearCantidad = (cantidad) => {
  //accedemos a la funcion de js para formatear a moneda
  //intl metodos internacionales para diferentes formatos
  return new Intl.NumberFormat(
      'en-US',
      {style: 'currency', currency: 'USD', minimumFractionDigits: 2}
    ).format(cantidad);
}
 
export default formatearCantidad;