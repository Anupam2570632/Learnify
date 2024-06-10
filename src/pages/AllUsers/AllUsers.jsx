import React, { useState } from "react";
import swal from "sweetalert";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUsers from "../../hooks/useUsers";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import LoadingPage from "../../components/LoadingPage";
import { Button, IconButton, Input } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();

    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const pageSize = 10;

    const { data: learnifyStat_user, isPending: isUserCountPending } = useQuery({
        queryKey: ['learnify-stat-user'],
        queryFn: async () => {
            const res = await axiosPublic.get('/learnify-stat');
            return res.data.userCount;
        }
    });

    const totalPages = Math.ceil(learnifyStat_user / pageSize);
    const [users, refetch, userPending] = useUsers(currentPage, pageSize, search);

    const DefaultPagination = ({ totalPages }) => {
        const getItemProps = (index) => ({
            variant: currentPage === index ? "filled" : "text",
            color: "gray",
            onClick: () => {
                setCurrentPage(index);
                refetch();
            },
        });

        const next = () => {
            if (currentPage === totalPages) return;
            setCurrentPage(currentPage + 1);
            refetch();
        };

        const prev = () => {
            if (currentPage === 1) return;
            setCurrentPage(currentPage - 1);
            refetch();
        };

        const renderPaginationButtons = () => {
            const buttons = [];
            for (let i = 1; i <= totalPages; i++) {
                buttons.push(
                    <IconButton key={i} {...getItemProps(i)}>
                        {i}
                    </IconButton>
                );
            }
            return buttons;
        };

        return (
            <div className="flex items-center justify-center mx-auto w-full gap-4 py-6">
                <Button
                    variant="text"
                    className="flex items-center gap-2"
                    onClick={prev}
                    disabled={currentPage === 1}
                >
                    <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
                </Button>
                <div className="flex items-center gap-2">
                    {renderPaginationButtons()}
                </div>
                <Button
                    variant="text"
                    className="flex items-center gap-2"
                    onClick={next}
                    disabled={currentPage === totalPages}
                >
                    Next
                    <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                </Button>
            </div>
        );
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setSearch(searchTerm);
        refetch();
    };

    if (userPending || isUserCountPending) {
        return <LoadingPage />;
    }

    const handleMakeAdmin = async (email, name) => {
        swal({
            title: `Are you sure you want to make ${name} an admin?`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (willApprove) => {
            if (willApprove) {
                const res = await axiosSecure.patch(`/user/${email}`, { role: 'admin' });
                if (res.data.modifiedCount > 0) {
                    swal(`${name} is now an admin!`, { icon: "success" });
                    refetch();
                }
            }
        });
    };

    return (
        <div>
            <div className="mb-4 max-w-[300px] mx-auto">
                <form onSubmit={handleSearch} className="flex gap-2">
                    <Input 
                        type="text" 
                        label="Search by name..." 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button type="submit">Search</Button>
                </form>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr className="bg-[#002244] text-white">
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.length ===0 && <h1 className="text-2xl font-bold text-red-500 text-center">no users found </h1>
                        }
                        {users.map((user, idx) => (
                            <tr key={idx}>
                                <th>{(currentPage - 1) * pageSize + idx + 1}</th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={user.image} alt="User Avatar" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <th>
                                    <button
                                        disabled={user.role === 'admin'}
                                        onClick={() => handleMakeAdmin(user.email, user.name)}
                                        className={`text-nowrap ${user.role === 'admin' ? 'disabled-btn' : 'bg-cyan-600 text-white'} font-bold px-4 py-2 rounded-full`}
                                    >
                                        Make Admin
                                    </button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="">
                <DefaultPagination totalPages={totalPages} />
            </div>
        </div>
    );
};

export default AllUsers;
