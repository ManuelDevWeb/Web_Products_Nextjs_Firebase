import React from "react";
import { css } from "@emotion/react";

const Error404 = () => {
  return (
    // Styled props
    <h1
      css={css`
        margin-top: 5rem;
        text-align: center;
      `}
    >
      Producto no encontrado!
    </h1>
  );
};

export default Error404;
