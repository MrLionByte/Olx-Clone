import React, { useEffect, useState, useContext } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/Context';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import {  createUserWithEmailAndPassword,updateProfile  } from 'firebase/auth';

export default function Signup() {

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const { auth,firestore } = useContext(FirebaseContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.trim().length === 0){
      alert("Username must be added")
      return;
    }
    if (phone.trim().length === 0){
      alert("Phone must be added")
      return;
    }
    if (password.trim().length === 0 || password.length < 6){
      alert("password must be added and at least length 6")
      return;
    }
      try {
          const result = await createUserWithEmailAndPassword(auth,email,password);
          await updateProfile(result.user,{displayName:username});

          await addDoc(collection(firestore,'users'),{
            id: result.user.uid,
            username: username,
            phone:  phone
          });
        navigate('/login');
        } catch(error) {
        alert("Error during sign-up, Fill all data ");
      };
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="logo"></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            id="fname"
            name="name"
          />
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            name="email"
          />
          <br />
          <label htmlFor="phone">Phone</label>
          <br />
          <input
            className="input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="number"
            id="phone"
            name="phone"
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            name="password"
          />
          <br />
          <br />
          <button type="submit">Signup</button>
        </form>
        <a href="/login">Login</a>
      </div>
    </div>
  );
}
