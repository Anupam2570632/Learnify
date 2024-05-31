import { Outlet } from "react-router-dom";
import NavBar from "../../Shared/NavBar/NavBar";

const Root = () => {
    return (
        <div className="text-reddit">
            <NavBar/>
            <Outlet/>
        </div>
    );
};

export default Root;