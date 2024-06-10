import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import Btn from "../../components/Btn";

const MyEnrollClass = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const { data: classes = [] } = useQuery({
        queryKey: ['user-class', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user-classes/${user?.email}`)
            return res.data
        },
        enabled: !!user?.email
    })



    const ClassCard = ({ id, title, name, image }) => {
        return (
            <div className="max-w-sm rounded overflow-hidden mx-auto shadow-lg">
                <img className="w-full h-[200px] object-cover object-center" src={image} alt={title} />
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{title}</div>
                    <p className="text-gray-700 text-base">By: {name}</p>
                </div>
                <div className="px-6 pt-4 pb-2">
                    <Link to={`/dashboard/studentClassContinue/${id}`}>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Continue
                        </button>
                    </Link>
                </div>
            </div>
        );
    };

    // console.log(classes)
    if (classes.length == 0) {
        return (
            <div className="w-full">
                <h2 className="text-2xl font-bold text-center text-blue-600">
                    You haven&apos;t buy any class yet!
                </h2>
                <div className="w-full flex py-6 items-center justify-center">
                    <Link to={'/allClasses'}>
                        <Btn text={'See All Classes'}/>
                    </Link>
                </div>
            </div>
        )
    }
    return (
        <div className="container mx-auto px-4 lg:p-14">
            <div className="flex my-4 items-center justify-between">
                <h1 className="text-3xl font-bold mb-8">Enrolled Classes</h1>
                <div>
                    <Link to={'/downloadPdf'}>
                        <button className="px-4 py-2 bg-cyan-600 text-white font-bold text-nowrap">Download Invoice</button>
                    </Link>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {
                    classes.map((classItem) => (
                        <ClassCard
                            key={classItem._id}
                            id={classItem._id}
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