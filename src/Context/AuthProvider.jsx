import React from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/Firebas.init';
import { PiPassword } from 'react-icons/pi';

const AuthProvider = ({children}) => {

  

    const createUser = (email, password)=>{
        return createUserWithEmailAndPassword(auth, email, password)
    }
      const userInfo = {
        createUser
    }

    return (
        <AuthContext value={userInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;