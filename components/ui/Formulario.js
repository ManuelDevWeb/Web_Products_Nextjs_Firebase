import styled from "@emotion/styled";

// Styled components
const Formulario = styled.form`
  max-width: 600px;
  width: 95%;
  margin: 5rem auto 0 auto;
`;

const Campo = styled.div`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;

  label {
    // Crece o no, encoger o no y width
    flex: 0 0 150px;
    font-size: 1.2rem;
  }

  input {
    // Toma el espacio restante
    flex: 1;
    padding: 1rem;
  }
`;

const InputSubmit = styled.input`
  background-color: var(--verde);
  width: 100%;
  padding: 1rem;
  text-align: center;
  color: #fff;
  text-transform: uppercase;
  border: none;
  font-family: "PT Sans", sans-serif;
  font-weight: 700;

  &:hover {
    cursor: pointer;
  }
`;

const Error = styled.p`
  background-color: red;
  padding: 0.5rem;
  font-family: "PT Sans", sans-serif;
  font-weight: 700;
  color: #fff;
  text-align: center;
  text-transform: uppercase;
`;

export { Formulario, Campo, InputSubmit, Error };
