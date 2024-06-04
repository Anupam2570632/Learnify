import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingPage from "../../components/LoadingPage";

const ClassDetails = () => {
    const { id } = useParams()
    const axiosSecure = useAxiosSecure()
    const { data = [], isPending } = useQuery({
        queryKey: ['classDetails', { id }],
        queryFn: async () => {
            const res = await axiosSecure.get(`/classes?id=${id}`)
            return res.data
        }
    })

    if (isPending) {
        <LoadingPage />
    }


    const aClass = data.length > 0 ? data[0] : {};


    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-4 text-center">{aClass.title}</h1>
            <img className="w-full h-64 object-cover rounded-md mb-4" src={aClass.image} alt={aClass.title} />
            <h2 className="text-xl font-semibold mb-2">Teacher: {aClass.name}</h2>
            <p className="text-gray-600 mb-2">Email: {aClass.email}</p>
            <p className="text-lg font-medium text-gray-800 mb-2">Price: ${aClass.price}</p>
            <p className="text-gray-700 mb-4">Description: {aClass.description}</p>
            <div className="w-full text-center">
                <Link to={`/payment/${aClass._id}`} className="mx-auto">
                    <button className="font-bold text-white px-4 py-2 rounded-full bg-cyan-600">PAY</button>
                </Link>
            </div>
        </div>
    );
};

export default ClassDetails;