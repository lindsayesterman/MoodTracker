import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./Auth";
import firebaseConfig from "../firebase.js";

function signOut(e) {
  firebaseConfig.auth().signOut();
}

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <>
      <h1>Home</h1>
      {currentUser ? (
        <>
          <p>You are logged in</p>
          <Link to="/">Select Mood Now</Link>
          <br />
          <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <p>
          <Link to="/login">Log In</Link> or{" "}
          <Link to="/signup">Sign Up</Link>
        </p>
      )}
    </>
  );
};

export default Home;
