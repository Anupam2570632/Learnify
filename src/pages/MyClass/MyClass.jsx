import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingPage from '../../components/LoadingPage.jsx';
import swal from "sweetalert";
import { Link } from "react-router-dom";

const MyClass = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: classes = [], isPending, refetch } = useQuery({
        queryKey: ['user-class', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/classes?email=${user.email}`);
            return res.data;
        }
    });

    if (isPending) {
        return <LoadingPage />;
    }

    const handleDelete = (id) => {
        swal({
            title: "Are you sure  want to delete this class?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    const res = await axiosSecure.delete(`/class/${id}`)
                    // console.log(res.data)
                    if (res.data.deletedCount > 0) {
                        swal("Deleted Successfully!", {
                            icon: "success",
                        });
                        refetch()
                    }
                }
            });
    }
    if (classes.length == 0) {
        return (
            <div className="">
                <h2 className="text-2xl font-bold text-center text-blue-600">
                    You haven&apos;t add any class yet!
                </h2>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 mx-auto xl:grid-cols-3 items-center justify-center gap-6">
            {classes.map((aClass, idx) => (
                <div key={idx} className="max-w-[380px] mx-auto bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                    <img src={aClass.image} alt={aClass.title} className="w-full h-60 object-cover object-center" />
                    <div className="p-4">
                        <h3 className="text-xl font-semibold mb-2">{aClass.title}</h3>
                        <p className="text-gray-600 mb-1"><strong>Name:</strong> {aClass.name}</p>
                        <p className="text-gray-600 mb-1"><strong>Email:</strong> {aClass.email}</p>
                        <p className="text-gray-600 mb-1"><strong>Price:</strong> ${aClass.price}</p>
                        <div className="divider"></div>
                        <p className="text-gray-600 mb-1">
                            <strong>Description:</strong> {aClass.description.length > 100
                                ? aClass.description.substring(0, 100) + '...'
                                : aClass.description}
                        </p>
                        <p className="text-gray-600 mb-4"><strong>Status:</strong> {aClass.status}</p>
                        <div className="divider"></div>
                        <div className="flex justify-between space-x-2">
                            <div className="flex-1">
                                <Link to={`/dashboard/updateClass/${aClass._id}`}>
                                    <button
                                        className="flex-1 px-4 w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                    >
                                        Update
                                    </button>
                                </Link>
                            </div>
                            <button
                                onClick={() => handleDelete(aClass._id)}
                                className="flex-1 w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            >
                                Delete
                            </button>
                            <div className="flex-1">
                                <Link to={`/dashboard/teacherClassDetails/${aClass._id}`}>
                                    <button
                                        disabled={aClass.status !== 'accepted'}
                                        className={`flex-1 w-full px-4 py-2 text-nowrap ${aClass.status !== 'accepted' ? 'disabled-btn' : 'bg-gray-500 text-white  hover:bg-gray-600'} rounded-lg`}
                                    >
                                        See details
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MyClass;
