import AsyncStorage from "@react-native-async-storage/async-storage";

import { createContext, useState } from "react";

export const AuthContext = createContext({
  token: "",
  uid: "",
  isAuthenticated: false,
  authenticate: (token) => {},
  storeUserId: (uid) => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [userId, setUserId] = useState();

  function authenticate(token) {
    setAuthToken(token);
    AsyncStorage.setItem("token", token);
  }

  function storeUserId(uid) {
    setUserId(uid);
    AsyncStorage.setItem("uid", uid);
  }

  function logout() {
    setAuthToken(null);
    setUserId(null);
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("uid");
  }

  const value = {
    token: authToken,
    uid: userId,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    storeUserId: storeUserId,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
