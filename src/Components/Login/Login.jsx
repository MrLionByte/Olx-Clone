import React, { useState,useContext } from 'react';
import { FirebaseContext } from '../../store/Context';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Logo from '../../olx-logo.png';
import './Login.css';
import {useNavigate} from 'react-router-dom'

function Login() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {firebase} = useContext(FirebaseContext);

  const handleLogin = async (e) =>{
    e.preventDefault();
     await signInWithEmailAndPassword(auth,email,password).then(()=>{
      navigate('/');
    }).catch((error)=>{
      alert(error.message)
    })

  }

  const handleSignup = ()=>{
    navigate('/signup')
  }

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
          onChange={(e) => setPassword(e.target.value)}
            className="input"
            type="password"
            id="password"
            name="password"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a onClick={handleSignup}>Signup</a>
      </div>
    </div>
  );
}

export default Login;
