import "./App.css";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "./firebase/firebase.init";
import { useState } from "react";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const gitProvider = new GithubAuthProvider();

function App() {
  const [user, setUser] = useState({});

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleSignOut = () => {
    signOut(auth, provider).then((result) => {
      console.log("siigned out successfully");
      setUser({});
    });
  };

  const handleGithubSignIn = () => {
    signInWithPopup(auth, gitProvider).then((result) => {
      const user = result.user;
      console.log(user);
      setUser(user);
    });
  };
  return (
    <div className="App">
      <h1>Simple firebase authentication</h1>
      <button type="" onClick={handleGoogleSignIn}>
        Google Sign In
      </button>
      <button type="" onClick={handleGithubSignIn}>
        Github Sign In
      </button>
      {!user && (
        <button onClick={handleSignOut} type="">
          Sign Out
        </button>
      )}

      {user ? (
        <div>
          <p>email:{user.email}</p>
          <p>name :{user.displayName}</p>
          <img src={user.photoURL} alt="" />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
