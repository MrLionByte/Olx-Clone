import React, { useContext, useState } from 'react';
import './Create.css';
import { FirebaseContext, authContext } from '../../store/Context.jsx';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';


const Create = () => {
    const { auth, firebase } = useContext(FirebaseContext);
    const navigate = useNavigate();
    const { user } = useContext(authContext);
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const date = new Date();
    const db = getFirestore();

    const handleSubmit = () => {
        if (!image) {
            alert("Please select an image to upload.");
            return;
        }
    
        const storage = getStorage();
        const imageRef = ref(storage, `images/${image.name}`);
        const uploadTask = uploadBytesResumable(imageRef, image);
    
        uploadTask.on(
            'state_changed',
            null,
            (error) => {
                alert(`Image upload failed. ${error.message}`);
            },
            async () => {
                try {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    await addDoc(collection(db, 'products'), {
                        name,
                        category,
                        price,
                        url: downloadURL,
                        user_id: user.displayName,
                        created_at: date.toDateString(),
                    });
                    navigate('/');
                } catch (error) {
                    alert(`Failed to add document. ${error.message}`);
                }
            }
        );
    };
    

    return (
        <>
            <div className="create-container">
                <card>
                    <div className="centerDiv">
                        <label htmlFor="fname">Name</label>
                        <br />
                        <input
                            className="input"
                            type="text"
                            id="fname"
                            name="Name"
                            onChange={(e) => setName(e.target.value)}
                        />
                        <br />
                        <label htmlFor="fname">Category</label>
                        <br />
                        <input
                            onChange={(e) => setCategory(e.target.value)}
                            className="input"
                            type="text"
                            id="fname"
                            name="category"
                        />
                        <br />
                        <label htmlFor="fname">Price</label>
                        <br />
                        <input 
                            className="input" 
                            type="number" 
                            id="fname" 
                            name="Price" 
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <br />
                        <br />
                        <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>
                        <br />
                        <input 
                            type="file" 
                            onChange={(e) => setImage(e.target.files[0])} 
                        />
                        <br />
                        <button 
                            onClick={handleSubmit} 
                            className="uploadBtn"
                        >
                            Submit
                        </button>
                    </div>
                </card>
            </div>
        </>
    );
};

export default Create;