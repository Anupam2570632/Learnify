import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider/AuthProvider";
import { toast } from "react-toastify";

const axiosSecure = axios.create({
    // baseURL: 'https://a-12-server-alpha.vercel.app/'
    baseURL: 'http://localhost:5000/'
});

const useAxiosSecure = () => {
    const navigate = useNavigate()
    const { logOut } = useContext(AuthContext)

    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        // console.log('request stopped by interceptors', token)
        config.headers.authorization = `Bearer ${token}`
        return config;
    }, function (error) {
        return Promise.reject(error)
    }
    )

    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error)=> {
        const status = error?.response?.status;
        if (status === 401 || status === 403) {
            await logOut()
            .then(()=>{
                toast.success('Sign out successfully')
            })
            navigate('/login');
        }

        return Promise.reject(error)
    })

    return axiosSecure;
};

export default useAxiosSecure;