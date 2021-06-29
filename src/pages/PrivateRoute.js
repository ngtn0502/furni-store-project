import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useCartContext } from "../context/cart_context";

function PrivateRoute({ children, ...rest }) {
  const { myUser } = useCartContext();
  return (
    <Route
      {...rest}
      render={() => {
        return myUser ? children : <Redirect to="/"></Redirect>;
      }}
    ></Route>
  );
}

export default PrivateRoute;
