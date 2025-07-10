import React, { useContext } from 'react';
import AuthContext from '../Context/AuthContext';

const useAuth = () => {
    const AuthInfo = useContext(AuthContext);
    return AuthContext;
};

export default useAuth;