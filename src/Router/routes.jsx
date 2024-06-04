import {
    createBrowserRouter,
} from "react-router-dom";
import Root from "../Layout/Root/Root";
import Home from "../pages/Home/Home/Home";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import AllClasses from "../pages/AllCLasses/AllClasses";
import TechOn from "../pages/TechOn/TechOn";
import Dashboard from "../Layout/Dashboard/Dashboard";
import TeacherRequest from "../pages/TeacherRequest/TeacherRequest";
import AllUsers from "../pages/AllUsers/AllUsers";
import Profile from "../pages/Profile/Profile";
import AddClass from "../pages/AddClass/AddClass";
import PrivateRoute from "./PrivateRoute";
import DashAllClasses from "../pages/DashAllClasses/DashAllClasses";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement:<ErrorPage/>,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/allClasses',
                element: <AllClasses />
            },
            {
                path: 'tech',
                element: <PrivateRoute><TechOn /></PrivateRoute>
            }
        ]
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
        children: [
            {
                path: 'teacherRequest',
                element: <PrivateRoute><TeacherRequest /></PrivateRoute>
            },
            {
                path: 'allUsers',
                element: <PrivateRoute><AllUsers /></PrivateRoute>
            },
            {
                path: 'profile',
                element: <PrivateRoute><Profile /></PrivateRoute>
            },
            {
                path: 'addClass',
                element: <PrivateRoute><AddClass /></PrivateRoute>
            },
            {
                path: 'dashAllClass',
                element: <PrivateRoute><DashAllClasses /></PrivateRoute>
            }
        ]
    }
]);

export default router;