import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingPage from "../../components/LoadingPage";
import { FaCheck, FaStar, FaTimes } from "react-icons/fa"; // Import React icons
import swal from "sweetalert";

const StudentClassDetails = () => {
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false); // State for controlling modal visibility
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    const { data: assignments = [], isPending } = useQuery({
        queryKey: ['assignment', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/assignment/${id}`);
            return res.data;
        }
    });

    const handleSubmission = async (assignmentId) => {
        console.log("Submitting assignment with ID:", assignmentId);

        const res = await axiosSecure.post(`/submit/${id}`)
        if (res.data.insertedId) {
            swal({
                title: "Assignment Submitted Successfully!",
                icon: "success",
                timer: 1500,
            });
        }
    };

    const handleSave = () => {
        //todo
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const onClose = () => {
        setIsModalOpen(false);
    };

    if (isPending) {
        return <LoadingPage />;
    }

    return (
        <div>
            <button onClick={openModal} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                TER
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
                                            <textarea
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                placeholder="Description"
                                                className="resize-none border rounded-md w-full p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            ></textarea>
                                            <div className="flex items-center">
                                                <FaStar className="w-6 h-6 text-yellow-500 mr-2" />
                                                <input
                                                    type="number"
                                                    min="1"
                                                    max="5"
                                                    value={rating}
                                                    onChange={(e) => setRating(e.target.value)}
                                                    className="border rounded-md w-12 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
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
