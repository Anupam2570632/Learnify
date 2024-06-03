import { Link, NavLink } from "react-router-dom";
import './navbar.css'
import Btn from "../../components/Btn";
import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
import logo from '../../assets/logoLearnify.png'

const NavBar = () => {

    const { user, logOut } = useContext(AuthContext)
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const handleLogOut = () => {
        logOut()
            .then()
            .catch()
    }

    const links = <>
        <li><NavLink className={'text-[18px] font-bold'} to={'/'}>Home</NavLink></li>
        <li><NavLink className={'text-[18px] font-bold'} to={'/allClasses'}>All Classes</NavLink></li>
        <li><NavLink className={'text-[18px] font-bold'} to={'/tech'}>Tech on Learnify</NavLink></li>
    </>
    return (
        <div className="w-full  bg-cyan-600 sticky z-10 top-0 text-white">
            <div className="navbar md:w-4/5 mx-auto">
                <div className="navbar-start">
                    <div className="dropdown m-0">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-[#002244] rounded-box w-52">
                            {links}
                        </ul>
                    </div>
                    <Link className="text-2xl font-black text-white" to={'/'}>
                        <img className="mix-blend-multiply h-10 " src={logo} alt="" />
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end space-x-4">
                    {
                        user ?
                            <>
                                <div className="dropdown dropdown-bottom dropdown-end hover:cursor-pointer">
                                    <div tabIndex={0}>
                                        <div className="avatar">
                                            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                                <img src={user.photoURL} />
                                            </div>
                                        </div>
                                    </div>
                                    <div tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow  rounded-box w-52">
                                        <div className="absolute w-full z-10 flex flex-col gap-2 overflow-auto rounded-md text-xl bg-[#002244] font-bold text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none">
                                            <div
                                                role="menuitem"
                                                className="flex w-full select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start leading-tight outline-none transition-all"
                                            >
                                                {user.displayName}
                                            </div>
                                            <button
                                                role="menuitem"
                                                className="flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                                            >
                                                <Link className="w-full" to={'/dashboard/profile'}>Dashboard</Link>
                                            </button>
                                            <hr className="my-2 border-blue-gray-50" role="menuitem" />
                                            <div
                                                role="menuitem"
                                                className="flex w-full select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start leading-tight outline-none transition-all "
                                            >
                                                <button onClick={handleLogOut} className="px-4 py-2 bg-cyan-600 text-[16px] rounded-full text-white font-bold text-nowrap">Log Out</button>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </>
                            :
                            <>
                                <Link to={'/login'}><Btn text={'Log In'} /></Link>
                                <Link to={'/register'}><Btn text={'Sign Up'} /></Link>
                            </>
                    }
                </div>
            </div>
        </div>
    );
};

export default NavBar;