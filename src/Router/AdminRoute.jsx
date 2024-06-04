import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import Lottie from "lottie-react";
import loadingImg from '../../public/loading.json'
import useAdmin from "../hooks/useAdmin";


const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const [isAdmin, isAdminLoading] = useAdmin()

    const location = useLocation()

    if (loading || isAdminLoading) {
        return (
            <div className="h-[100vh] max-w-screen flex items-center justify-center">
                <Lottie style={{ height: '150px' }} animationData={loadingImg} loop={true} />
            </div>
        )
    }
    if (user || isAdmin) {
        return children
    }
    return <Navigate to={'/login'} state={location.pathname}></Navigate>
};

export default AdminRoute;