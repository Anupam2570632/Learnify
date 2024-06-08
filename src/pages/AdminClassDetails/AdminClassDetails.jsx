import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import LoadingPage from "../../components/LoadingPage";
import Feedback from "../Home/Feedback/Feedback";

const AdminClassDetails = () => {
    const { id } = useParams()
    const axiosPublic = useAxiosPublic()
    const { data: feedback = [], isPending } = useQuery({
        queryKey: ['feedback', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/feedback?id=${id}`)
            return res.data
        }
    })

    if (isPending) {
        return (
            <LoadingPage />
        )
    }
    console.log(feedback)

    if (!feedback.length) {
        return (
            <div className="h-full w-full flex items-center justify-center text-3xl font-bold">
                No feedback on this class!
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 lg:p-14">
            <h2 className="text-2xl font-bold mb-4">Feedback on {feedback[0]?.title}</h2>
            <div className="space-y-4">
                {feedback.map((item) => (
                    <div key={item._id} className="bg-white p-4 rounded-lg shadow-md">
                        <div className="flex items-center mb-2">
                            <FaStar className="text-yellow-500" />
                            <span className="ml-2 text-lg font-semibold">{item.rating}</span>
                        </div>
                        <p className="text-gray-800">{item.description}</p>
                        <div className="mt-2 text-sm text-gray-600">
                            <span>by {item.userName}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminClassDetails;