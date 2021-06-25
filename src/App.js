import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";
import {
  AboutPage,
  HomePage,
  ErrorPage,
  ProductsPage,
  SingleProductPage,
  CartPage,
} from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Sidebar></Sidebar>
      <Switch>
        <Route path="/" exact>
          <HomePage></HomePage>
        </Route>
        <Route path="/about">
          <AboutPage></AboutPage>
        </Route>
        <Route path="/cart">
          <CartPage></CartPage>
        </Route>
        <Route path="/products" exact>
          <ProductsPage></ProductsPage>
        </Route>
        <Route path="/products/:id">
          <SingleProductPage></SingleProductPage>
        </Route>
        <Route path="*">
          <ErrorPage></ErrorPage>
        </Route>
      </Switch>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
