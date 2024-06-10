import { Outlet } from "react-router-dom";
import NavBar from "../../Shared/NavBar/NavBar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../../Shared/Footer/Footer";


const Root = () => {
    return (
        <div className="text-reddit">
            <NavBar />
            <Outlet />
            <Footer />
            <ToastContainer />

        </div>
    );
};

export default Root;