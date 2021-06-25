import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useProductsContext } from "../context/main_context";
import { single_product_url as url } from "../utils/constants";
import { formatPrice } from "../utils/helpers";
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from "../components";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SingleProductPage = () => {
  const {
    featureProductHandler,
    singleProducts__isLoading,
    singleProducts__error,
    singleProducts,
  } = useProductsContext();

  const { id, name, price, company, description, stock } = singleProducts;
  console.log(singleProducts);

  if (singleProducts__isLoading) {
    return <Loading></Loading>;
  }
  if (singleProducts__error) {
    return <Error></Error>;
  }

  return (
    <Wrapper>
      <PageHero
        title="products"
        title2={`/products/${id}`}
        name2={name}
      ></PageHero>
      <div className="section section-center page">
        <Link to="/products" className="btn">
          Back to products
        </Link>
        <div className="product-center">
          <ProductImages key={id} {...singleProducts}></ProductImages>
          <section className="content">
            <h2>{name}</h2>
            <Stars id={id}></Stars>
            <h5 className="price">{formatPrice(price)}</h5>
            <p className="desc">{description}</p>
            <p className="info">
              <span>Available : </span>
              {stock ? "in stock" : "out of stock"}
            </p>
            <p className="info">
              <span>SKU :</span>
              {id}
            </p>
            <p className="info">
              <span>Brand :</span>
              {company}
            </p>
            <hr />
            <AddToCart></AddToCart>
          </section>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage;
