import React, { createContext, useEffect, useState } from 'react';
import app from '../Firebase/Firebase.config';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup} from 'firebase/auth'

export const AuthProvider = createContext();
const auth = getAuth(app);

const AuthContext = ({children}) => {

const [user,setUser] = useState(null);
const [loading,setLoading]= useState(false);
useEffect(()=>{
    const unSubscribe = onAuthStateChanged(auth,currentUser =>{
console.log(currentUser);
setUser(currentUser)
    });
    return  unSubscribe();
},[])



 const createUser = (email,password)=>{
    return createUserWithEmailAndPassword(auth,email,password)
 }
 const loginWithGoogle = (provider)=>{
    return signInWithPopup(auth,provider)
 }

 const signIn = (email,password)=>{
    return signInWithEmailAndPassword(auth,email,password)
 }
 
 const authInfo ={user,
    createUser,
    loginWithGoogle,
    signIn,
    loading
} 
return(
       <div>
        <AuthProvider.Provider value={authInfo}>
            {children}
        </AuthProvider.Provider>
       </div>
    );
};

export default AuthContext;