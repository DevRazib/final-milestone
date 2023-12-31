import { createContext, useEffect, useState } from "react";
import {GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from "firebase/auth";
import { app } from "../firebase/firebase.config";


export const AuthContext=createContext(null);
const auth=getAuth(app)

const AuthProviders = ({children}) => {
  const [user, setUser]=useState(null);
  const [loading,setLoading]=useState(true);
  const googleProvider=new GoogleAuthProvider();

  const createUser=(email,password)=>{
    setLoading(true);
    return createUserWithEmailAndPassword(auth,email,password)
  }

//for signIn
  const signIn=(email,password)=>{
    setLoading(true);
    return signInWithEmailAndPassword(auth,email,password);
  }

  //for logOut
  const logOut=()=>{
    setLoading(true);
    return signOut(auth);
  }

  //for user photo 
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
        displayName: name, photoURL: photo
    });
}

//for google sign in

const googleSignIn=()=>{
    setLoading(true)
    return signInWithPopup(auth, googleProvider);
}


  useEffect(()=>{
    const unsubscribe= onAuthStateChanged(auth,currentUser =>{
      setUser(currentUser);
      console.log('current user', currentUser)
      setLoading(false);
    });
    return ()=>{
      return unsubscribe();
    }
  },[])

  const authInfo={
    user,
    loading,
    createUser,
    signIn,
    logOut,
    updateUserProfile,
    googleSignIn,
  }

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider >
  );
};

export default AuthProviders;