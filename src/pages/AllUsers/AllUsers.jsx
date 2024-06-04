import swal from "sweetalert";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUsers from '../../hooks/useUsers'

const AllUsers = () => {
    const axiosSecure = useAxiosSecure()

    const [users, refetch] = useUsers()

    const approve = {
        role: 'admin'
    }
    const handleMkeAdmin = async (email, name) => {
        swal({
            title: `Are you want to make ${name} admin?`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    const res = await axiosSecure.patch(`/user/${email}`, approve)
                    console.log(res.data)
                    if (res.data.modifiedCount > 0) {
                        swal(`${name} is now an admin!`, {
                            icon: "success",
                        });
                        refetch()
                    }
                }
            });
    }



    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="bg-[#002244] text-white">
                            <th>
                                #
                            </th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, idx) => <tr key={idx}>
                                <th>
                                    {idx + 1}
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={user.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>

                                    </div>
                                </td>
                                <td>
                                    {user.name}
                                </td>
                                <td>
                                    {user.email}
                                </td>
                                <th>
                                    <button disabled={user.role == 'admin'} onClick={() => handleMkeAdmin(user.email, user.name)} className={`text-nowrap ${user.role == 'admin' ? 'disabled-btn' : 'bg-cyan-600 text-white'} font-bold px-4 py-2 rounded-full`}>
                                        Make Admin
                                    </button>
                                </th>
                            </tr>)
                        }


                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default AllUsers;