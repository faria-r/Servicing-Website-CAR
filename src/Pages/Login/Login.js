import { GoogleAuthProvider } from "firebase/auth";
import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import img from "../../assets/images/login/login.svg";
import { AuthProvider } from "../../Context/AuthContext";
import SocialLogin from '../Shared/SocialLogin'

const Login = () => {
  const { loginWithGoogle, signIn } = useContext(AuthProvider);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/';

  const googleAuth = new GoogleAuthProvider();

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    signIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        const currentuser = {
          email:user.email,


        }
        console.log(currentuser)

        //get jwt token

        fetch('https://genius-car-server-coral-chi.vercel.app/jwt',{
          method:"POST",
          headers:{
            'content-type':'application/json'
          },
          body:JSON.stringify(currentuser)
        })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          //local storage is not the best place to store jwt
          localStorage.setItem('car-token',data.token)
            navigate(from,{replace:true})
          
        })
        form.reset();
      
      })
      .catch((e) => console.log(e));
  };

  const handleLogInWithGoogle = (event) => {
    event.preventDefault();

    loginWithGoogle(googleAuth)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((e) => console.log(e));
  };
  return (
    <div>
      <div className="hero my-20 p-5">
        <div className="hero-content grid  md:grid-cols-2 w-full">
          <div className="text-center lg:text-left">
            <img src={img} alt="" className="w-3/4" />
          </div>
          <div className="card p-5 flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <h1 className="text-5xl text-center font-bold">Login now!</h1>
            <form onSubmit={handleLogin} className="form-control">
              <div className="card-body p-0 ">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="text"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <input
                  className="btn btn-outline mb-3 btn-primary"
                  type="submit"
                  value="Login"
                />
                <input
                  onClick={handleLogInWithGoogle}
                  className="btn btn-outline btn-warning"
                  type="submit"
                  value="Login With Google"
                />
              </div>
            </form>
            <p className="py-5">
              Don't have a Account?{" "}
              <Link
                className="text-orange-600 font-bold text-xl"
                to="/register"
              >
                Register
              </Link>
            </p>

     <SocialLogin></SocialLogin>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
