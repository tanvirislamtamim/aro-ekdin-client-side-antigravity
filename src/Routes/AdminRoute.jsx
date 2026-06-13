import React from 'react';
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRole';
import { Navigate, useLocation } from 'react-router';
import LoadingSpinner from '../Layout/LoadingSpinner/LoadingSpinner';

const AdminRoute = ({ children }) => {
    const { user, loading: authLoading } = useAuth();
    const { role, roleLoading } = useUserRole();
    const location = useLocation();


    if (authLoading || roleLoading) {
        return <LoadingSpinner />;
    }


    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (role === 'admin' || role === 'developer') {
        return children;
    }
    return <Navigate to="/dashboard" replace />;
};

export default AdminRoute;