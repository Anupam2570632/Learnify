import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyEnrollClass = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const { data: classes = [] } = useQuery({
        queryKey: ['user-class', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user-classes/${user?.email}`)
            return res.data
        }
    })


    const ClassCard = ({ title, name, image }) => {
        return (
            <div className="max-w-sm rounded overflow-hidden mx-auto shadow-lg">
                <img className="w-full" src={image} alt={title} />
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{title}</div>
                    <p className="text-gray-700 text-base">By: {name}</p>
                </div>
                <div className="px-6 pt-4 pb-2">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Continue
                    </button>
                </div>
            </div>
        );
    };

    console.log(classes)
    return (
        <div className="container mx-auto px-4 lg:p-14">
            <h1 className="text-3xl font-bold mb-8">Enrolled Classes</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {
                    classes.map((classItem) => (
                        <ClassCard
                            key={classItem._id}
                            title={classItem.title}
                            name={classItem.name}
                            image={classItem.image}
                        />
                    ))
                }
            </div>
        </div>
    );
};

export default MyEnrollClass;