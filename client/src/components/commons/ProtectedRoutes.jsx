import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../apiUrl/axiosInstance';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const ProtectedRoutes = ({ children }) => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const { logoutToggle } = useSelector(state => state?.login);
    const navigate = useNavigate();

    const handleProtectedRoute = async () => {
        try {
            const { data } = await axiosInstance.get('auth/protected');
            if (data) {
                setIsAuthorized(true);
            }
        } catch (error) {
            if (!error?.response?.data?.success && error?.response?.data?.message === "You have to login first before access this route !!!") {
                toast.error(error?.response?.data?.message, {
                    theme: 'colored',
                });
                navigate('/login');
                return;
            }
            if (!error?.response?.data?.success && error?.response?.data?.message === "renew access token !!!") {
                try {
                    await axiosInstance.get('auth/refresh-token');
                    setIsAuthorized(true);
                } catch (err) {
                    toast.error(error?.response?.data?.message, {
                        theme: 'colored'
                    });
                }
            }
        }
    };

    useEffect(() => {
        handleProtectedRoute();
    }, [logoutToggle]);

    if (!isAuthorized) {
        return null; // Or a loading spinner, if you want to show a loading state
    }

    return <>{children}</>;
};

export default ProtectedRoutes;
