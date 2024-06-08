import swal from "sweetalert";
import useClasses from "../../hooks/useClasses";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const DashAllClasses = () => {
    const axiosSecure = useAxiosSecure()
    const [classes, refetch] = useClasses()
    const approve = {
        status: 'accepted'
    }
    const reject = {
        status: 'rejected'
    }
    const handleApprove = async (id) => {
        swal({
            title: "Are you want to approve the class?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    const res = await axiosSecure.patch(`/class/${id}`, approve)
                    console.log(res.data)
                    if (res.data.modifiedCount > 0) {
                        swal("Class Approved!", {
                            icon: "success",
                        });
                        refetch()
                    }
                }
            });
    }
    const handleReject = (id) => {
        swal({
            title: "Are you want to reject the class?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    console.log(id)
                    swal("Class Rejected!", {
                        icon: "success",
                    });
                }
            });
    }
    return (
        <div className="overflow-x-auto p-4 md:p-10">
            <table className="table">
                {/* head */}
                <thead>
                    <tr className="bg-[#002244] text-white">
                        <th>
                            #
                        </th>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Email</th>
                        <th>Short Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        classes.map((aClass, idx) => <tr key={idx}>
                            <th>
                                {idx + 1}
                            </th>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={aClass.image} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>

                                </div>
                            </td>
                            <td>
                                {aClass.title}
                            </td>
                            <td>{aClass.email}</td>
                            <td>{aClass.description.slice(0, 30)}...</td>
                            <th className="flex gap-2">
                                <button onClick={() => handleApprove(aClass._id)} disabled={aClass.status !== 'pending'} className={` font-bold ${aClass.status !== 'pending' ? 'disabled-btn' : 'text-white bg-cyan-600'} px-4 py-2 text-nowrap rounded-full`}>Approve</button>
                                <button onClick={() => handleReject(aClass._id)} disabled={aClass.status !== 'pending'} className={` font-bold ${aClass.status !== 'pending' ? 'disabled-btn' : 'text-white bg-cyan-600'} px-4 py-2 text-nowrap rounded-full`}>Reject</button>
                                <div>
                                    <Link to={`/dashboard/adminClassDetails/${aClass._id}`}>
                                        <button disabled={aClass.status == 'pending'} className={` font-bold ${aClass.status == 'pending' ? 'disabled-btn' : 'text-white bg-cyan-600'} px-4 py-2 text-nowrap rounded-full`}>See Progress</button>
                                    </Link>
                                </div>
                            </th>
                        </tr>)
                    }

                </tbody>
            </table>
        </div>
    );
};

export default DashAllClasses;