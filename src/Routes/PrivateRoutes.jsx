import React from 'react';
import useAuth from '../Hooks/useAuth';
import Loading from '../Pages/Loading/Loader';
import { Navigate, useLocation } from 'react-router';

const PrivateRoutes = ({children}) => {
    const location = useLocation();
    const {user, loading} = useAuth();
    if (loading) {
        return <Loading></Loading>
    }
    
    if (!user) {
       return  <Navigate to='/login' state={location.pathname}></Navigate>
    }
    return children;
};

export default PrivateRoutes;