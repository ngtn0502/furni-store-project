import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { Navbar, Sidebar, Footer } from "./components";
import { AboutPage, HomePage, ErrorPage, ProductsPage } from "./pages";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <HomePage></HomePage>
        </Route>
        <Route path="/about">
          <AboutPage></AboutPage>
        </Route>
        <Route path="/products/:id">
          <ProductsPage></ProductsPage>
        </Route>
        <Route path="*">
          <ErrorPage></ErrorPage>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
