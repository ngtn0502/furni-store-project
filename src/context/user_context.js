import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext, useEffect, useState, useReducer } from "react";

const UserContext = React.createContext();

export const UserProvider = (props) => {
  const { isAuthenticated, logout, user, isLoading, loginWithRedirect } =
    useAuth0();
  const [myUser, setMyUser] = useState(null);
  useEffect(() => {
    if (isAuthenticated) {
      setMyUser(user);
    } else {
      setMyUser(false);
    }
  }, [isAuthenticated]);
  return (
    <UserContext.Provider
      value={{
        logout,
        myUser,
        loginWithRedirect,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
