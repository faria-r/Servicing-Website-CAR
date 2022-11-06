import React, { useContext } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import img from '../../assets/images/login/login.svg'
import { AuthProvider } from '../../Context/AuthContext';
import { setAuthToken } from "../../API/auth";

const Register = () => {
const {createUser} = useContext(AuthProvider);
const navigate = useNavigate();
    const handleSignUP = event =>{
        event.preventDefault();
        const form = event.target;
        const name= form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        createUser(email,password)
        .then(result => {
          const user = result.user;
          console.log(user); 
        setAuthToken(user)
          navigate('/')
        })
        .catch(e=>console.log(e))
        console.log(name)
    }
    return (
        <div>
            <div className="hero my-20 p-5">
  <div className="hero-content grid  md:grid-cols-2 w-full">
    <div className="text-center lg:text-left">
     
    <img src={img} alt="" className='w-3/4'  />
    </div>
    <div className="card p-5 flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
    <h1 className="text-5xl text-center font-bold">Sign Up now!</h1>
        <form onSubmit={handleSignUP}  className="form-control">
      <div className="card-body p-0">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" name="name" placeholder="Your Name" className="input input-bordered" />
        </div>
      <div className="card-body p-0">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name="email"placeholder="email" className="input input-bordered"required/>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name='password' placeholder="password" className="input input-bordered" />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
            <input className='btn btn-outline btn-primary' type="submit" value="Sign Up" />
        </div>
      </form>
      <p className='py-5'>
    Already have a Account? <Link className='text-orange-600 font-bold text-xl' to='/login'>LogIn</Link>
      </p>
    </div>
  </div>
</div>
        </div>
    );
};

export default Register;