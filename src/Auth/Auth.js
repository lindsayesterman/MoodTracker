import React, { useEffect, useState } from "react";
import firebaseConfig from "../firebase.js";
import firebase from "../firebase.js";
import "./Auth.css";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    firebaseConfig.auth().onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;
        firebase.firestore().collection("users").doc(uid).set({
          email: user.email,
        });
      }
      setCurrentUser(user);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
