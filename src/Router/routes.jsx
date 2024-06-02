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

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
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
                path:'tech',
                element:<TechOn/>
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
        path:'/dashboard',
        element:<Dashboard/>,
        children:[
            {
                path:'home',
                element:<div>home</div>
            },
            {
                path:'teacherRequest',
                element:<TeacherRequest/>
            },
            {
                path:'allUsers', 
                element:<AllUsers/>
            }
        ]
    }
]);

export default router;