import React,{useContext} from 'react';
import { useNavigate } from 'react-router-dom';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo.jsx';
import Search from '../../assets/Search.jsx';
import Arrow from '../../assets/Arrow.jsx';
import SellButton from '../../assets/SellButton.jsx';
import SellButtonPlus from '../../assets/SellButtonPlus.jsx';
import { authContext, FirebaseContext } from '../../store/Context.jsx';

import { getAuth, signOut } from "firebase/auth";

function Header() {
  const navigate = useNavigate();
  const auth = getAuth();
  const {user} = useContext(authContext);
  const {firebase} = useContext(FirebaseContext);

  const handleLogin = () => {
    navigate('/login')
  }

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">

          <span>{user ? `Welcome ${user.displayName}` : <button onClick={handleLogin} >Login</button> }</span>         
          <hr />
  
        </div>

      {user && <span className='logout' onClick={()=>{
          signOut(auth);
          navigate('/login');
      }}>LOGOUT</span>}  

        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
