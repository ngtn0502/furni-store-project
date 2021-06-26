import React from "react";
import { useFilterContext } from "../context/filter_context";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductList = () => {
  const { filtered__products: products, view__type } = useFilterContext();
  // Check whether products is empty array or not
  if (products.length < 1) {
    return (
      <h5 style={{ textTransform: "none" }}>
        Sorry, there is no product match your condition!
      </h5>
    );
  }

  return (
    <>
      {view__type && <GridView products={products}></GridView>}
      {!view__type && <ListView products={products}></ListView>}
    </>
  );
};

export default ProductList;
