import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from '../Context/AuthContext';

const PrivateRoutes = ({children}) => {
    const location = useLocation();
    const {user,loading} = useContext(AuthProvider);
    if(loading){
        return <progress className="progress progress-error w-56" value="70" max="100"></progress>
    }
    if(user){
        return children;
    }
    return <Navigate to='/login' state={{from:location}} replace></Navigate>
};

export default PrivateRoutes;