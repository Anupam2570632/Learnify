import { FaBars, FaBookAtlas, FaHouse, FaPersonRifle, FaUserGroup, } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { IoBookSharp } from "react-icons/io5";
import './sidebar.css'
import { FaChalkboardTeacher } from "react-icons/fa";
import { LuBookPlus } from "react-icons/lu";
import useAdmin from "../../hooks/useAdmin";
import useTeacher from "../../hooks/useTeacher";

const SideBar = () => {
    const [isAdmin] = useAdmin()
    const [isTeacher] = useTeacher()


    const sideLinks = <>

        <li className="text-white"><NavLink end to={'profile'}><FaPersonRifle className="text-2xl" /> Profile</NavLink></li>
        {
            isAdmin &&
            <>
                <li className="text-white"><NavLink end to={'teacherRequest'}><FaChalkboardTeacher className="text-2xl" /> Teacher Request</NavLink></li>
                <li className="text-white"><NavLink end to={'dashAllClass'}><IoBookSharp className="text-2xl" /> All classes</NavLink></li>
                <li className="text-white"><NavLink end to={'allUsers'}><FaUserGroup className="text-2xl" /> All Users</NavLink></li>

            </>
        }
        {
            isTeacher &&
            <>
                <li className="text-white"><NavLink end to={'addClass'}><LuBookPlus className="text-2xl" /> Add Class</NavLink></li>
                <li className="text-white"><NavLink end to={'myClass'}><IoBookSharp className="text-2xl" /> My Class</NavLink></li>
            </>
        }
        {
            !isAdmin && !isTeacher && <>
                <li className="text-white"><NavLink end to={'myEnrolledClass'}><IoBookSharp className="text-2xl" /> My Enrolled Class</NavLink></li>
            </>
        }
        <div className="divider divider-info"></div>
        <li className="text-white"><NavLink to={'/'}><FaHouse className="text-2xl" /> Home</NavLink></li>
        <li className="text-white"><NavLink to={'/allClasses'}><FaBookAtlas className="text-2xl" /> All Classes</NavLink></li>
        <li className="text-white"><NavLink to={'/tech'}><FaChalkboardTeacher className="text-2xl" /> Tech on learnify</NavLink></li>

    </>

    return (
        <div className="drawer xl:drawer-open z-10">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col xl:hidden ">
                <label htmlFor="my-drawer-2" className="btn bg-black text-white w-fit drawer-button xl:hidden"><FaBars /></label>
            </div>
            <div className="drawer-side ">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-black text-white space-y-2">
                    <div className="flex flex-col items-start p-4 text-start text-2xl font-bold">
                        Learnify
                    </div>

                    {sideLinks}
                </ul>

            </div>
        </div>
    );
};

export default SideBar;