import { FaBars, FaEnvelope, FaHouse, FaPersonRifle, FaShop, FaUserGroup, } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { IoBookSharp } from "react-icons/io5";
import './sidebar.css'
import { FaChalkboardTeacher } from "react-icons/fa";
import { LuBookPlus } from "react-icons/lu";

const SideBar = () => {
    const isAdmin = true
    const isTeacher = false
    const sideLinks = <>

        {
            isAdmin &&
            <>
                <li className="text-white"><NavLink end to={'reservation'}><FaPersonRifle className="text-2xl" /> Profile</NavLink></li>
                <li className="text-white"><NavLink end to={'teacherRequest'}><FaChalkboardTeacher className="text-2xl" /> Teacher Request</NavLink></li>
                <li className="text-white"><NavLink end to={'allClass'}><IoBookSharp className="text-2xl" /> All classes</NavLink></li>
                <li className="text-white"><NavLink end to={'users'}><FaUserGroup className="text-2xl" /> All Users</NavLink></li>

            </>
        }
        {
            isTeacher &&
            <>
                <li className="text-white"><NavLink end to={'teacherProfile'}><FaPersonRifle className="text-2xl" /> Profile</NavLink></li>
                <li className="text-white"><NavLink end to={'addClass'}><LuBookPlus className="text-2xl" /> Add Class</NavLink></li>
                <li className="text-white"><NavLink end to={'myClass'}><IoBookSharp className="text-2xl" /> My Class</NavLink></li>
            </>
        }
        <div className="divider divider-info"></div>
        <li className="text-white"><NavLink end to={'/'}><FaHouse className="text-2xl" /> Home</NavLink></li>
        <li className="text-white"><NavLink end to={'/menu'}><FaBars className="text-2xl" /> Menu</NavLink></li>
        <li className="text-white"><NavLink end to={'/shop/salad'}><FaShop className="text-2xl" /> Shop</NavLink></li>
        <li className="text-white"><NavLink end to={'/contact'}><FaEnvelope className="text-2xl" /> Contact</NavLink></li>

    </>

    return (
        <div className="drawer lg:drawer-open z-10">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col lg:hidden ">
                <label htmlFor="my-drawer-2" className="btn bg-[#002244] text-white w-fit drawer-button lg:hidden"><FaBars /></label>
            </div>
            <div className="drawer-side ">
                <label htmlFor="my-drawer-2" aria-label="c  lose sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-[#002244] space-y-2">
                    <div className="flex flex-col items-start p-4 text-start">
                        <h2 className="text-[18px] font-bold">BISTRO BOSS</h2>
                        <h1 className="tracking-widest">RESTAURANT</h1>
                    </div>

                    {sideLinks}
                </ul>

            </div>
        </div>
    );
};

export default SideBar;