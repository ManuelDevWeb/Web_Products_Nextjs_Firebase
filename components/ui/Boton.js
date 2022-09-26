import styled from "@emotion/styled";

// Styled components
const Boton = styled.a`
  font-weight: 700;
  text-transform: uppercase;
  border: 1px solid #d1d1d1;
  padding: 0.8rem 2rem;
  margin-right: 1rem;
  // Recibimos colores por props
  background-color: ${(props) => (props.bgColor ? "#27c8a7" : "#fff")};
  color: ${(props) => (props.bgColor ? "#fff" : "#000")};

  &:last-of-type {
    margin-right: 0;
  }

  &:hover {
    cursor: pointer;
  }
`;

export default Boton;
