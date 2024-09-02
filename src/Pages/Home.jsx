import React from 'react';

import Header from '../Components/Header/Header.jsx';
import Banner from '../Components/Banner/Banner.jsx';

import Posts from '../Components/Posts/Posts.jsx';
import Footer from '../Components/Footer/Footer.jsx';

function Home(props) {
  return (
    <div className="homeParentDiv">
      <Header />
      <Banner />
      <Posts />
      <Footer />
    </div>
  );
}

export default Home;
 
