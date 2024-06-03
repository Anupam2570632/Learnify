import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const TeacherRequest = () => {
    const [requests, setRequests] = useState([])
    const axiosSecure = useAxiosSecure()
    useEffect(() => {
        axiosSecure.get('/teacherRequest')
            .then(res => {
                setRequests(res.data)
            })
    }, [axiosSecure])
    const reject = {
        status: 'rejected'
    }
    const approve = {
        status: 'accepted',
        role: 'teacher'
    }
    const handleMakeApprove = async (id, email) => {
        const res = await axiosSecure.patch(`/teacherRequest/${id}`, approve)
        console.log('approve', res.data)
        const roleRes = await axiosSecure.patch(`/user/${email}`, approve)
        console.log('role change', roleRes)
    }
    const handleMakeReject = async (id) => {
        const res = await axiosSecure.patch(`/teacherRequest/${id}`, reject)
        console.log(res.data)
    }
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="text-white bg-[#002244]">
                            <th>
                                #
                            </th>
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
                        {
                            requests.map((req, idx) => <tr key={idx}>
                                <th>
                                    {idx + 1}
                                </th>
                                <td>
                                    <div className="">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={req.photoURL} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>

                                    </div>
                                </td>
                                <td>
                                    {req.userName}
                                </td>
                                <td>
                                    {req.experience}
                                </td>
                                <td>
                                    {req.title}
                                </td>
                                <td>
                                    {req.category}
                                </td>
                                <td>
                                    {req.status}
                                </td>
                                <th className="flex gap-2">
                                    <button disabled={req.status !== 'pending'} onClick={() => handleMakeApprove(req._id, req.email)} className={`font-bold ${req.status !== 'pending' ? 'disabled-btn' : 'bg-cyan-600 text-white'} px-4 py-2 rounded-full flex-1`}>Approve</button>
                                    <button disabled={req.status !== 'pending'} onClick={() => handleMakeReject(req._id, req.email)} className={`font-bold ${req.status !== 'pending' ? 'disabled-btn' : 'bg-cyan-600 text-white'} px-4 py-2 rounded-full flex-1`}>Reject</button>
                                </th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TeacherRequest;