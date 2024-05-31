import { Link, NavLink } from "react-router-dom";
import './navbar.css'

const NavBar = () => {

    const links = <>
        <li><NavLink className={'text-[18px] font-bold'} to={'/'}>Home</NavLink></li>
        <li><NavLink className={'text-[18px] font-bold'} to={'/allClasses'}>All Classes</NavLink></li>
        <li><NavLink className={'text-[18px] font-bold'} to={'/tech'}>Tech on Learnify</NavLink></li>
    </>
    return (
        <div className="w-full bg-[#002244] text-white">
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
                    <Link className="text-2xl font-black text-white" to={'/'}>Learnify</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end space-x-4">
                    <Link className="px-4 py-2 text-nowrap bg-cyan-600 text-white rounded-full" to={'/login'}>Log In</Link>
                    <Link className="px-4 py-2 text-nowrap bg-cyan-600 text-white rounded-full" to={'/register'}>Sign Up</Link>
                </div>
            </div>
        </div>
    );
};

export default NavBar;