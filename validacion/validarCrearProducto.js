const validarCrearProducto = (valores) => {
  let errores = {};

  // Validar el nombre del producto
  if (!valores.nombre) {
    errores.nombre = "El nombre del producto es obligatorio";
  }

  // Validar el nombre de la empresa
  if (!valores.empresa) {
    errores.empresa = "El nombre de la empresa es obligatorio";
  }

  // Validar la URL del producto
  if (!valores.url) {
    errores.url = "La URL del producto es obligatoria";
  } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url)) {
    errores.url = " URL mal formateada o no valida";
  }

  // Validar descripcion
  if (!valores.descripcion) {
    errores.descripcion = "Agrega una descripcion de tu producto";
  }

  return errores;
};

export default validarCrearProducto;
