import React, { Fragment, useContext, useEffect } from 'react';
import Header from '../Components/Header/Header.jsx';
import Create from '../Components/Create/Create.jsx';
import { authContext } from '../store/Context.jsx';
import { useNavigate } from 'react-router-dom';

const CreatePage = () => {
  const navigate = useNavigate();
  const user = useContext(authContext);
  useEffect(()=>{
    if (!user.user) {
      navigate('/');
    }
  })
  
  return (
    <>
    <Header />
    <Create/>
    </>
  );
};

export default CreatePage;
