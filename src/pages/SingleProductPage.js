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
  const params = useParams();
  const history = useHistory();
  const {
    fetchSingleProduct,
    singleProducts__isLoading,
    singleProducts__error,
    singleProducts,
  } = useProductsContext();

  useEffect(() => {
    fetchSingleProduct(`${url}${params.id}`);
  }, [params.id]);

  const {
    id,
    name,
    price,
    company,
    description,
    stock,
    images,
    stars,
    reviews,
    colors,
  } = singleProducts;
  useEffect(() => {
    if (singleProducts__error) {
      setTimeout(() => {
        history.push("/");
      }, 3000);
    }
  }, [singleProducts__error]);
  // Handler loading and error
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
        title2={`/products/${params.id}`}
        name2={name}
      ></PageHero>
      <div className="section section-center page">
        <Link to="/products" className="btn">
          Back to products
        </Link>
        <div className="product-center">
          <ProductImages images={images}></ProductImages>
          <section className="content">
            <h2>{name}</h2>
            <Stars stars={stars} reviews={reviews}></Stars>
            <h5 className="price">{formatPrice(price)}</h5>
            <p className="desc">{description}</p>
            <p className="info">
              <span>Available : </span>
              {stock > 0 ? "in stock" : "out of stock"}
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
            {stock > 0 && (
              <AddToCart
                colors={colors}
                stock={stock}
                products={singleProducts}
                id={id}
              ></AddToCart>
            )}
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
