import React, { useEffect, useState } from 'react';
import './View.css';
import { useLocation } from 'react-router-dom';
import { firestore } from '../../firebase/config';
import { collection, doc, getDoc, query, where, getDocs } from 'firebase/firestore';

function ViewPost() {
  const [postDetails, setPostDetails] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const productId = queryParams.get('id');

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        if (!productId) return;

        const productDoc = doc(firestore, 'products', productId);
        const productSnapshot = await getDoc(productDoc);
        
        if (productSnapshot.exists()) {
          const productData = productSnapshot.data();
          setPostDetails(productData);
          console.log(productData.user_id)

          const fetchUserFromUid = async (uid) => {
            try {
              const usersCollection = collection(firestore, 'users');
              const q = query(usersCollection, where('uid', '==', uid));
              const querySnapshot = await getDocs(q);
              
              if (!querySnapshot.empty) {
                querySnapshot.forEach((doc) => {
                  setUserDetails(doc.data());
                });
              } else {
                console.error('No user found with the given UID.');
              }
            } catch (error) {
              console.error('Error fetching user data: ', error);
            }
          };

          if (productData.user_id) {
            await fetchUserFromUid(productData.user_id);
          }
        } else {
          console.error('Product not found.');
        }
      } catch (error) {
        console.error('Error fetching product data: ', error);
      }
    };

    fetchPostDetails();
  }, [productId]);

  if (!postDetails) {
    return <div>Loading...</div>;
  }

  console.log("USER DEtails :", postDetails);

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt={postDetails.name}
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price}</p>
          <span>{postDetails.category}</span>
          <p>{postDetails.name}</p>
          <span>{postDetails.created_at}</span>
        </div>

        
          <div className="contactDetails">
            <p>Seller details</p>
            <p>{postDetails.user_id}</p>
            {/* <p>{userDetails.phone}</p> */}
          </div>
      </div>
    </div>
  );
}

export default ViewPost;
