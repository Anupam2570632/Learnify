import { useContext, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingPage from "../../components/LoadingPage";
import { FaCheck, FaTimes } from "react-icons/fa"; // Import React icons
import swal from "sweetalert";
import Rating from 'react-rating-stars-component';
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";

const StudentClassDetails = () => {
    const [description, setDescription] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false); // State for controlling modal visibility
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const [rating, setRating] = useState(0);

    const { data: assignments = [], isPending } = useQuery({
        queryKey: ['assignment', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/assignment/${id}`);
            return res.data;
        }
    });

    const { data: aClass = [], isPending: classPending } = useQuery({
        queryKey: ['class-from', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/classes?id=${id}`);
            return res.data;
        }
    });

    const mutation = useMutation({
        mutationFn: async (newFeedback) => {
            const res = await axiosSecure.post(`/feedback`, newFeedback);
            return res.data;
        },
        onSuccess: () => {
            swal({
                title: "Feedback Submitted Successfully!",
                icon: "success",
                timer: 1500,
            });
            setIsModalOpen(false);
        },
        onError: (error) => {
            swal({
                title: "Error!",
                text: error.message,
                icon: "error",
                timer: 1500,
            });
        },
    });

    const handleSubmission = async (assignmentId) => {
        // console.log("Submitting assignment with ID:", assignmentId);
        const res = await axiosSecure.post(`/submit/${id}`);
        if (res.data.insertedId) {
            swal({
                title: "Assignment Submitted Successfully!",
                icon: "success",
                timer: 1500,
            });
        }
    };

    const handleSave = () => {
        const newFeedback = {
            classId: aClass[0]._id,
            rating,
            description,
            userName: user?.displayName,
            userImage: user.photoURL,
            className: aClass[0].title,
        };
        mutation.mutate(newFeedback);
    };
    const handleRatingChange = (newRating) => {
        setRating(newRating)
    }

    const openModal = () => {
        setIsModalOpen(true);
    };

    const onClose = () => {
        setIsModalOpen(false);
    };

    if (isPending || classPending) {
        return <LoadingPage />;
    }

    return (
        <div>
            <button onClick={openModal} className="bg-blue-600 my-6 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Evaluate Class
            </button>
            {isModalOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    {/* Modal Content */}
                    <div className="flex items-center justify-center min-h-screen px-4 text-center">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            {/* Modal Content */}
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                            Create Teaching Evaluation Report
                                        </h3>
                                        <div className="mt-2">
                                            <div>
                                                {aClass[0].title}
                                            </div>
                                            <div className="w-[350px]">
                                                <textarea
                                                    value={description}
                                                    onChange={(e) => setDescription(e.target.value)}
                                                    placeholder="Description"
                                                    className="resize-none border rounded-md w-full p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                ></textarea>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="flex gap-3 items-center">
                                                    <Rating
                                                        count={5}
                                                        value={rating}
                                                        onChange={handleRatingChange}
                                                        size={24}
                                                        activeColor="#ffd700"
                                                    />
                                                    <p>{rating}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button onClick={handleSave} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                                    Send
                                </button>
                                <button onClick={onClose} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                    <FaTimes className="w-5 h-5 mr-1" />
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div>
                <div>
                    <div className="overflow-x-auto">
                        <table className="table min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Deadline</th>
                                    <th>Submit</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {assignments.map((assignment) => (
                                    <tr key={assignment._id}>
                                        <td>{assignment.title}</td>
                                        <td>{assignment.description}</td>
                                        <td>{assignment.deadline}</td>
                                        <td>
                                            <button onClick={() => handleSubmission(assignment._id)} className="flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-100 rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                                <FaCheck className="w-5 h-5 mr-1" />
                                                Submit
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentClassDetails;
