import React, { useContext, useState, useEffect, createContext } from "react";
import { auth } from "../firebaseConfig";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    user
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};