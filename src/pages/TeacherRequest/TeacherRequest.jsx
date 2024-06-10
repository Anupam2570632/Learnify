import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingPage from "../../components/LoadingPage";
import useStat from "../../hooks/useStat";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { IconButton } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const TeacherRequest = () => {
    const axiosSecure = useAxiosSecure();
    const [stat] = useStat();
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const totalPages = Math.ceil(stat.requestCount / pageSize);

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [totalPages, currentPage]);

    const { data: requests = [], isFetching, refetch } = useQuery({
        queryKey: ['teacher-requests', currentPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/teacherRequest?page=${currentPage}&size=${pageSize}`);
            return res.data;
        }
    });

    if (isFetching) {
        return <LoadingPage />;
    }

    const reject = {
        status: 'rejected'
    };

    const approve = {
        status: 'accepted',
        role: 'teacher'
    };

    const handleMakeApprove = async (id, email) => {
        const res = await axiosSecure.patch(`/teacherRequest/${id}`, approve);
        const roleRes = await axiosSecure.patch(`/user/${email}`, approve);
        if (roleRes.data.modifiedCount > 0 && res.data.modifiedCount > 0) {
            toast.success('Approve successfully!');
            refetch();
        }
    };

    const handleMakeReject = async (id) => {
        const res = await axiosSecure.patch(`/teacherRequest/${id}`, reject);
        if (res.data.modifiedCount > 0) {
            toast.success('Reject successfully!');
            refetch();
        }
    };

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr className="text-white bg-[#002244]">
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Experience</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((req, idx) => (
                            <tr key={req._id}>
                                <th>{idx + 1 + (currentPage - 1) * pageSize}</th>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={req.photoURL} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                </td>
                                <td>{req.userName}</td>
                                <td>{req.experience}</td>
                                <td>{req.title}</td>
                                <td>{req.category}</td>
                                <td>{req.status}</td>
                                <th className="flex gap-2">
                                    <button
                                        disabled={req.status !== 'pending'}
                                        onClick={() => handleMakeApprove(req._id, req.email)}
                                        className={`font-bold ${req.status !== 'pending' ? 'disabled-btn' : 'bg-cyan-600 text-white'} px-4 py-2 rounded-full flex-1`}
                                    >
                                        Approve
                                    </button>
                                    <button
                                        disabled={req.status !== 'pending'}
                                        onClick={() => handleMakeReject(req._id)}
                                        className={`font-bold ${req.status !== 'pending' ? 'disabled-btn' : 'bg-cyan-600 text-white'} px-4 py-2 rounded-full flex-1`}
                                    >
                                        Reject
                                    </button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex items-center gap-4 justify-center my-10">
                <IconButton
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    <ArrowLeftIcon className="h-6 w-6" />
                </IconButton>
                <p>
                    Page {currentPage} of {totalPages}
                </p>
                <IconButton
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    <ArrowRightIcon className="h-6 w-6" />
                </IconButton>
            </div>
        </div>
    );
};

export default TeacherRequest;
