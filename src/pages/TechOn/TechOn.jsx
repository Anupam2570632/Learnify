import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import swal from "sweetalert";

const TechOn = () => {
    const { user } = useContext(AuthContext);
    const [status, setStatus] = useState('');
    const [requestArray, setRequestArray] = useState([]);
    const [triggerFetch, setTriggerFetch] = useState(false); // State variable to trigger useEffect
    // eslint-disable-next-line no-unused-vars
    const { register, formState: { errors }, handleSubmit, setValue } = useForm();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/teacherRequest?email=${user.email}`)
                .then(res => {
                    setRequestArray(res.data);
                    if (res.data.length > 0) {
                        const [req] = res.data;
                        setValue("experience", req.experience);
                        setValue("title", req.title);
                        setValue("category", req.category);
                        setStatus(req.status);
                    }
                })
                .catch(error => console.error('Error fetching teacher request:', error));
        }
    }, [user?.email, setValue, axiosSecure, triggerFetch]); // Add triggerFetch to the dependency array

    const onSubmit = (data) => {
        const teacher = {
            ...data,
            status: 'pending',
            photoURL: user.photoURL
        };

        if (status) {
            const id = requestArray[0]._id;
            axiosSecure.put(`/teacherRequest/${id}`, teacher)
                .then(res => {
                    if (res.data.modifiedCount > 0) {
                        swal("Request sent!", {
                            icon: "success",
                        });
                        setTriggerFetch(!triggerFetch); // Toggle triggerFetch state
                    }
                })
                .catch(error => console.error('Error updating teacher request:', error));
        } else {
            axiosSecure.post('/teacherRequest', teacher)
                .then(res => {
                    if (res.data.insertedId) {
                        swal("Request sent!", {
                            icon: "success",
                        });
                        setTriggerFetch(!triggerFetch); // Toggle triggerFetch state
                    }
                })
                .catch(error => console.error('Error submitting teacher request:', error));
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            {requestArray && requestArray.length > 0 && requestArray[0].status === 'accepted' ? (
                <div>
                    <h1>Your request has been accepted.</h1>
                </div>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                    <h2 className="text-2xl font-bold mb-6 text-center">Want to be a teacher?</h2>

                    <div className="mb-4">
                        <label className="block text-gray-700">Name:</label>
                        <input
                            {...register("userName", { required: true })}
                            readOnly
                            defaultValue={user?.displayName || ''}
                            type="text"
                            placeholder="Your Name"
                            name="userName"
                            className="mt-1 p-2 border border-gray-300 rounded w-full"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Images:</label>
                        <img src={user?.photoURL} alt="User" className="w-24 h-24 rounded-full mx-auto my-4" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Email:</label>
                        <input
                            {...register("email", { required: true })}
                            type="email"
                            name="email"
                            value={user?.email || ''}
                            readOnly
                            className="mt-1 p-2 border border-gray-300 rounded w-full bg-gray-100 cursor-not-allowed"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Experience:</label>
                        <select
                            {...register("experience", { required: true })}
                            name="experience"
                            className="mt-1 p-2 border border-gray-300 rounded w-full"
                        >
                            <option value=''>Experience</option>
                            <option value="beginner">Beginner</option>
                            <option value="experienced">Experienced</option>
                            <option value="mid-level">Mid-level</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Title:</label>
                        <input
                            placeholder="Title"
                            {...register("title", { required: true })}
                            type="text"
                            name="title"
                            className="mt-1 p-2 border border-gray-300 rounded w-full"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700">Category:</label>
                        <select
                            {...register("category", { required: true })}
                            name="category"
                            className="mt-1 p-2 border border-gray-300 rounded w-full"
                        >
                            <option value=''>Category</option>
                            <option value="web development">Web Development</option>
                            <option value="digital marketing">Digital Marketing</option>
                            <option value="graphic design">Graphic Design</option>
                            <option value="data analysis">Data Analysis</option>
                            <option value="project management">Project Management</option>
                        </select>
                    </div>

                    <button
                        disabled={requestArray.length && status !== 'rejected'}
                        type="submit"
                        className={`w-full ${(requestArray.length && status !== 'rejected') ? 'disabled-btn' : 'text-white bg-cyan-600'} rounded-full  py-2`}
                    >
                        {status !== 'rejected' ? 'Submit For Review' : 'Request to Another'}
                    </button>
                </form>
            )}
        </div>
    );
};

export default TechOn;
