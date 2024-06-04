import { Outlet } from "react-router-dom";
import SideBar from "../../pages/SideBar/SideBar";

const Dashboard = () => {
    return (
        <div className="flex gap-10 flex-col xl:flex-row font-cinezal">
            <div className="w-full z-20 xl:w-1/4 lg:fixed lg:top-0 xl:h-full">
               <SideBar/>
            </div>
            <div className="w-full xl:w-3/4 xl:ml-[25%]">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;