import React, { useContext, useEffect, useState } from 'react';
import Heart from '../../assets/Heart.jsx';
import './Post.css';
import { FirebaseContext } from '../../store/Context.jsx';
import { firestore } from '../../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { PostContext } from '../../store/postContext.jsx';
import { useNavigate } from 'react-router-dom';


function Posts() {
  const [products, setProducts] = useState([]);
  const {setPostDetails} = useContext(PostContext)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(firestore, 'products');
        const snapshot = await getDocs(productsCollection);
        const allPosts = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id
        }));
        setProducts(allPosts);
      } catch (error) {
        console.error("Error fetching posts: ", error);
      }
    };

    fetchProducts();
  }, []);

  const handleClick = (product) => {
    setPostDetails(product);
    navigate(`/view-post?id=${product.id}`);
  };

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map(product => {
            return (
              <div className="card" key={product.id}
                onClick={() => handleClick(product)}>
                <div className="favorite">
                  <Heart></Heart>
                </div>
                <div className="image">
                  <img src={product.url} alt="" />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {product.price}</p>
                  <span className="kilometer">{product.category}</span>
                  <p className="name">{product.name}</p>
                </div>
                <div className="date">
                  <span>{product.created_at}</span>
                </div>
              </div>
            );
          })}

        </div>
      </div>
      {/* <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">

          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>

        </div>
      </div> */}
    </div>
  );
}

export default Posts;
