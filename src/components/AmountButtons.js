import React from "react";
import { useState } from "react";

import styled from "styled-components";
import { FaPlus, FaMinus } from "react-icons/fa";

const AmountButtons = () => {
  const [amountCart, setAmountCart] = useState(1);

  const plusCartHandler = (e) => {
    setAmountCart((prev) => prev + 1);
  };
  const minusCartHandler = (e) => {
    if (amountCart < 1) {
      return;
    }
    setAmountCart((prev) => prev - 1);
  };
  return (
    <Wrapper>
      <button onClick={plusCartHandler}>
        <FaPlus></FaPlus>
      </button>
      <h2>{amountCart}</h2>
      <button>
        <FaMinus onClick={minusCartHandler}></FaMinus>
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  width: 140px;
  justify-items: center;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  h2 {
    margin-bottom: 0;
  }
  button {
    background: transparent;
    border-color: transparent;
    cursor: pointer;
    padding: 1rem 0;
    width: 2rem;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  h2 {
    margin-bottom: 0;
  }
`;

export default AmountButtons;
