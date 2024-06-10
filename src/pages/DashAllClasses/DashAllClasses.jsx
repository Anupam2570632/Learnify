import swal from "sweetalert";
import useClasses from "../../hooks/useClasses";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { IconButton } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import useStat from "../../hooks/useStat";
import LoadingPage from "../../components/LoadingPage";

const DashAllClasses = () => {
    const axiosSecure = useAxiosSecure()
    const [stat]= useStat()
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const [classes, refetch, classPending] = useClasses(currentPage, pageSize);


    useEffect(() => {
        refetch();
    }, [currentPage, refetch]); // Refetch data when search or pagination changes

    const totalPages = Math.ceil(stat.allClassCount / 10);



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
                    // console.log(res.data)
                    if (res.data.modifiedCount > 0) {
                        swal("Class Approved!", {
                            icon: "success",
                        });
                        refetch()
                    }
                }
            });
    }
    const handleReject =async (id) => {
        swal({
            title: "Are you want to reject the class?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async(willDelete) => {
                if (willDelete) {
                    const res = await axiosSecure.patch(`/class/${id}`, reject)
                    // console.log(res.data)
                    if (res.data.modifiedCount > 0) {
                        swal("Class Rejected!", {
                            icon: "success",
                        });
                        refetch()
                    }
                    // console.log(id)
                    swal("Class Rejected!", {
                        icon: "success",
                    });
                }
            });
    }

    if(classPending){
        return(
            <LoadingPage/>
        )
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
            <div className="flex items-center gap-4 justify-center my-10">
                <IconButton
                    disabled={currentPage === 1}
                    onClick={() => {
                        setCurrentPage(currentPage - 1);
                    }}
                >
                    <ArrowLeftIcon className="h-6 w-6" />
                </IconButton>
                <p>
                    Page {currentPage} of {totalPages}
                </p>
                <IconButton
                    disabled={currentPage === totalPages}
                    onClick={() => {
                        setCurrentPage(currentPage + 1);
                    }}
                >
                    <ArrowRightIcon className="h-6 w-6" />
                </IconButton>
            </div>
        </div>
    );
};

export default DashAllClasses;