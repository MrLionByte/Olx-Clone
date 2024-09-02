import {createContext, useState} from 'react';


// export const FirebaseContext = createContext(null);

import { auth, firestore } from '../firebase/config.js';

export const FirebaseContext = createContext(null);

export const FirebaseProvider = ({ children }) => {
  return (
    <FirebaseContext.Provider value={{ auth, firestore }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const authContext = createContext(null);

export default function Context ({children}) {
  const [user,setUser] = useState('Hello');

  return (
    <authContext.Provider value={{user,setUser}}>
      {children}
    </authContext.Provider>
  )
}
