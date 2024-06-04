import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import LoadingPage from "../components/LoadingPage";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)

    const location = useLocation()

    if (loading) {
        return (
           <LoadingPage/>
        )
    }
    if (user) {
        return children
    }
    return <Navigate to={'/login'} state={location.pathname}></Navigate>

};

export default PrivateRoute;