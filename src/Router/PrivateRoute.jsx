import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider/AuthProvider";
import loadingImg from '../../public/loading.json'
import Lottie from "lottie-react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)

    const location = useLocation()

    if (loading) {
        return (
            <div className="h-[100vh] max-w-screen flex items-center justify-center">
                <Lottie style={{ height: '150px' }} animationData={loadingImg} loop={true} />
            </div>
        )
    }
    if (user) {
        return children
    }
    return <Navigate to={'/login'} state={location.pathname}></Navigate>

};

export default PrivateRoute;