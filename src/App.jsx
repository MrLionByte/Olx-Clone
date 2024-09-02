import React, { useContext, useEffect } from 'react';
import './App.css';
import Home from './Pages/Home.jsx';  
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Pages/Signup.jsx';
import Login from './Pages/Login.jsx';
import { authContext, FirebaseContext } from './store/Context.jsx';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firestore } from './firebase/config.js';
import Create from './Pages/Create.jsx'
import ViewPost from './Pages/ViewPost.jsx';
import Post from './store/postContext.jsx';

function App() {
  const auth = getAuth();
  const {setUser} = useContext(authContext)
  const {firebase} = useContext(FirebaseContext)

  useEffect(() => {
    onAuthStateChanged(auth,(user)=> {
      setUser(user)
    })
  });

  return (
    <div>
      <Post>

      <Router>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/create"  element={<Create />} />
              <Route path="/view-post" element={<ViewPost />} />
          </Routes>
      </Router>

      </Post>
    </div>
  );
}

export default App
