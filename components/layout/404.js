import React from "react";
import { css } from "@emotion/react";

const Error404 = () => {
  return (
    // Styled props
    <h1
      css={css`
        margin-top: 1rem;
        text-align: center;
      `}
    >
      No se puede mostrar!
    </h1>
  );
};

export default Error404;
