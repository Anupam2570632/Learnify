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
import AdminRoute from "./AdminRoute";
import ClassDetails from "../pages/ClassDetails/ClassDetails";
import Payment from "../pages/Payment/Payment";
import MyEnrollClass from "../pages/MyEnrollClass/MyEnrollClass";
import MyOrders from "../pages/MyOrders/MyOrders";
import MyClass from "../pages/MyClass/MyClass";
import UpdateClass from "../pages/UpdateClass/UpdateClass";
import TeacherClassDetails from "../pages/TeacherClassDetails/TeacherClassDetails";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
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
                path: '/tech',
                element: <PrivateRoute><TechOn /></PrivateRoute>
            },
            {
                path: '/classDetails/:id',
                element: <PrivateRoute><ClassDetails /></PrivateRoute>
            },
            {
                path: '/payment/:id',
                element: <Payment />
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
        path: '/downloadPdf',
        element: <PrivateRoute><MyOrders /></PrivateRoute>
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
        children: [
            {
                path: 'teacherRequest',
                element: <PrivateRoute><AdminRoute><TeacherRequest /></AdminRoute></PrivateRoute>
            },
            {
                path: 'allUsers',
                element: <PrivateRoute><AdminRoute><AllUsers /></AdminRoute></PrivateRoute>
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
                element: <PrivateRoute><AdminRoute><DashAllClasses /></AdminRoute></PrivateRoute>
            },
            {
                path: 'myEnrolledClass',
                element: <PrivateRoute><MyEnrollClass /></PrivateRoute>
            },
            {
                path: 'myClass',
                element: <PrivateRoute><MyClass /></PrivateRoute>
            },
            {
                path: 'updateClass/:id',
                element: <PrivateRoute><UpdateClass /></PrivateRoute>
            },
            {
                path:'teacherClassDetails/:id',
                element:<PrivateRoute><TeacherClassDetails/></PrivateRoute>
            }
        ]
    }
]);

export default router;