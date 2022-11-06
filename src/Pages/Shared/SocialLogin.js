import { GoogleAuthProvider } from "firebase/auth";
import React, { useContext } from "react";
import { setAuthToken } from "../../API/auth";
import { AuthProvider } from "../../Context/AuthContext";

const SocialLogin = () => {
  const { loginWithGoogle } = useContext(AuthProvider);
  const googleAuth = new GoogleAuthProvider();
  const handleLogInWithGoogle = (event) => {
    event.preventDefault();

    loginWithGoogle(googleAuth)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setAuthToken(user);

      })
      .catch((e) => console.log(e));
  };
  return (
    <div>
      <p className="text-center">Social Login</p>
      <p className="text-center">
        <button onClick={handleLogInWithGoogle} className="btn btn-ghost">
          Google
        </button>
      </p>
    </div>
  );
};

export default SocialLogin;
