import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./Auth";
import firebaseConfig from "../firebase.js";

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <>
      <h1>Home</h1>
      {currentUser ? (
        <>
          <p>You are logged in</p>
          <Link to="/mood/select">Select Mood Now</Link>
          <br />
          <br />
          <button onClick={() => firebaseConfig.auth().signOut()}>
            Sign out
          </button>
        </>
      ) : (
        <p>
          <Link to="/mood/login">Log In</Link> or <Link to="/mood/signup">Sign Up</Link>
        </p>
      )}
    </>
  );
};

export default Home;
