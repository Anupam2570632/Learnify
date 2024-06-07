import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [dbUser, setDbUser] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get(`/users?email=${user?.email}`)
            .then(res => setDbUser(res.data));
    }, [user?.email, axiosSecure]);


    return (
        <div className="container mx-auto my-8">
            <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="px-6 py-4">
                    <h1 className="text-3xl font-bold text-gray-900 text-center">Welcome, {user.displayName}!</h1>
                    <p className="mt-2 text-sm text-gray-600 text-center">
                        Below is your personal information. Please review and ensure it is accurate.
                    </p>
                </div>
                <div className="flex flex-col items-center px-6 py-4">
                    <img
                        className="h-24 w-24 rounded-full border-2 border-gray-300"
                        src={user.photoURL || "https://via.placeholder.com/150"}
                        alt="User"
                    />
                    <div className="mt-4 text-center">
                        <p className="text-2xl font-bold text-gray-900">{user.displayName}</p>
                        <p className="text-lg text-gray-700">{dbUser[0]?.role}</p>
                        <p className="mt-2 text-sm text-gray-600">{user.email}</p>
                        <p className="mt-2 text-sm text-gray-600">{user?.phone}</p>
                    </div>
                </div>
                <div className="px-6 py-4">
                    <h2 className="text-xl font-semibold text-gray-800">Contact Information</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        If you have any questions or need further assistance, please reach out to our support team.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
