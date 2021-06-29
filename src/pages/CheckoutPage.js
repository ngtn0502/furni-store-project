import React from "react";
import styled from "styled-components";
import { PageHero } from "../components";
import paypalLogo from "../assets/paypalLogo.png";
import visaLogo from "../assets/visaLogo.png";
import { useCartContext } from "../context/cart_context";
import { formatPrice } from "../utils/helpers";
const AboutPage = () => {
  const { total__amount } = useCartContext();
  return (
    <main>
      <Wrapper>
        <PageHero title="checkout"></PageHero>
        <div className="section-center page-100">
          <div className="payment">
            <div className="content">
              <img src={paypalLogo} alt="" />
              <div className="check">
                <input type="radio" id="check" name="payment" />
                <label htmlFor="check">
                  Pay {formatPrice(total__amount)} with paypal method
                </label>
              </div>
            </div>
            <div className="content">
              <img src={visaLogo} alt="" />
              <div>
                <input type="radio" id="check2" name="payment" />
                <label htmlFor="check2">
                  Pay {formatPrice(total__amount)} with visa method
                </label>
              </div>
            </div>
          </div>
          <div className="cart__payment">
            <button className="btn">PAY</button>
          </div>
        </div>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.section`
  .cart__payment {
    margin-top: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    button {
      background-color: var(--clr-grey-6);
      font-size: 1.5rem;
      padding: 1.5rem 3.5rem;
    }
  }
  .payment {
    .content {
      margin-bottom: 5rem;
      padding: 2rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      border: 1px solid var(--clr-grey-9);
      text-align: center;
      border-radius: var(--radius);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      div {
        margin-top: 1rem;
        margin-left: 2rem;
        display: flex;
        align-items: center;
      }
      img {
        width: 350px;
        height: 100%;
        object-fit: cover;
      }
      input {
        display: block;
        width: 25px;
        height: 25px;
      }
      label {
        display: block;
        color: var(--clr-grey-5);
        letter-spacing: var(--spacing);
        line-height: 1.25;
        margin-left: 1rem;
        font-size: 1rem;
      }
    }
  }

  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 1250px) {
    .payment {
      margin-top: 5rem;
      display: grid;
      gap: 5rem;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      .content {
        img {
          width: 500px;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
`;
export default AboutPage;
