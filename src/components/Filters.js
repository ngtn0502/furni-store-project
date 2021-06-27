import React from "react";
import styled from "styled-components";
import { useFilterContext } from "../context/filter_context";
import { getUniqueValues, formatPrice } from "../utils/helpers";
import { FaCheck } from "react-icons/fa";

const Filters = () => {
  const { filter, all__products, filterChangeHandler, clearFilterHandler } =
    useFilterContext();
  const {
    name,
    category,
    company,
    color,
    min__price,
    max__price,
    price,
    free__shipping,
  } = filter;
  const categories = getUniqueValues(all__products, "category");
  const companies = getUniqueValues(all__products, "company");
  const colors = getUniqueValues(all__products, "colors");
  return (
    <Wrapper>
      <div className="content">
        {/* Search filter */}
        <form onSubmit={(e) => e.preventDefault()} className="form-control">
          <input
            type="text"
            value={name}
            name="name"
            className="search-input"
            placeholder="search for item"
            onChange={filterChangeHandler}
          />
        </form>
        {/* Category filter */}
        <div className="form-control">
          <h5>category</h5>
          <div>
            {categories.map((value, index) => {
              return (
                <button
                  key={index}
                  onClick={filterChangeHandler}
                  type="button"
                  name="category"
                  className={value === category ? "active" : null}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
        {/* Company filter */}
        <div className="form-control">
          <h5>category</h5>
          <select
            name="company"
            className="company"
            onChange={filterChangeHandler}
            value={company}
          >
            {companies.map((value, index) => {
              return (
                <option key={index} value={value}>
                  {value}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-control">
          <div className="colors">
            {colors.map((value, index) => {
              if (value === "all") {
                return (
                  <button
                    data-value="all"
                    name="color"
                    className={`${
                      color === value ? "all-btn active" : "all-btn"
                    }`}
                    onClick={filterChangeHandler}
                  >
                    all
                  </button>
                );
              }
              return (
                <button
                  key={index}
                  name="color"
                  data-value={`${value}`}
                  className={`${
                    value === color ? "color-btn active" : "color-btn"
                  }`}
                  onClick={filterChangeHandler}
                  style={{ background: value }}
                >
                  {value === color ? <FaCheck></FaCheck> : null}
                </button>
              );
            })}
          </div>
        </div>
        {/* Price filter */}
        <div className="form-control">
          <h5>Price</h5>
          <p>{formatPrice(price)}</p>
          <input
            type="range"
            name="price"
            min={min__price}
            max={max__price}
            value={price}
            onChange={filterChangeHandler}
          />
        </div>
        {/* Shipping filter */}
        <div className="form-control shipping">
          <label htmlFor="shipping">free shipping</label>
          <input
            type="checkbox"
            name="free__shipping"
            id="shipping"
            checked={free__shipping}
            onChange={filterChangeHandler}
          />
        </div>
        {/* Clear filter  */}
        <div className="form-control"></div>
        <button
          type="button"
          className="clear-btn"
          onClick={clearFilterHandler}
        >
          clear filter
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 3rem;
    }
  }
`;

export default Filters;
