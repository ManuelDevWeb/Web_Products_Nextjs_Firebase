import { useState, useEffect } from "react";

const useValidacion = (stateInicial, validar, functSubmit) => {
  // Valores que el usuario ingresa en los inputs del formulario
  const [valores, setValores] = useState(stateInicial);
  // Errores
  const [errores, setErrores] = useState({});
  // Cuando el usuario hace submit pasa a true
  const [submitForm, setSubmitForm] = useState(false);

  // useEffect que se ejecuta cada que cambie el valor de errores
  useEffect(() => {
    // Validando si submitForm es true
    if (submitForm) {
      const noErrores = Object.keys(errores).length === 0;

      // Validando si no hay errores
      if (noErrores) {
        // Ejecutamos la funcion funcSumit que el usuario nos envia desde el componente
        functSubmit();
      }

      setSubmitForm(false);
    }
  }, [errores]);

  // Funcion que se ejecuta conforme el usuario escribe algo
  const handleChange = (e) => {
    // Vamos guardando los valores de los inputs en el state
    setValores({
      ...valores,
      [e.target.name]: e.target.value,
    });
  };

  // Funcion que se ejecuta cuando el usuario hace submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Ejecutamos la function validar que el usuario nos envia desde el componente
    const erroresValidacion = validar(valores);
    setErrores(erroresValidacion);

    setSubmitForm(true);
  };

  // Funcion que se ejecuta cuando el usuario se sale del input
  const handleBlur = () => {
    // Ejecutamos la funcion validar que el usuario nos envia desde el componente
    const erroresValidacion = validar(valores);
    setErrores(erroresValidacion);
  };

  return {
    valores,
    errores,
    submitForm,
    handleSubmit,
    handleChange,
    handleBlur,
  };
};

export default useValidacion;
