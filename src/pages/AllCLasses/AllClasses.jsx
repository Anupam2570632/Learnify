import { Link } from "react-router-dom";
import useClasses from "../../hooks/useClasses";

const AllClasses = () => {
    const [classes] = useClasses()
    return (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-11/12 md:w-4/5 mx-auto">
            {
                classes.map((aClass, idx) => <div
                    className="max-w-[380px] mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
                    key={idx}
                >
                    <img src={aClass.image} alt={aClass.title} className="w-full h-48 object-cover" />
                    <div className="p-4 space-y-4 flex flex-col">
                        <div className="space-y-4">
                            <h1 className="text-[18px] font-bold text-gray-800">{aClass.title}</h1>
                            <h1 className="text-gray-600">{aClass.name}</h1>
                            <h1 className="text-lg font-semibold text-gray-800">Price : ${aClass.price}</h1>
                            <h1 className="text-gray-600">Enrolled Students: {aClass.total_enrolment == null ? '0' : aClass.total_enrolment}</h1>
                            <div className="divider"></div>
                            <h2 className="italic text-gray-600">
                                {aClass.description.length > 60
                                    ? `${aClass.description.slice(0, 60)}...`
                                    : aClass.description}
                            </h2>
                            <div className="divider"></div>
                        </div>
                        <div className="flex-1 h-full flex items-center justify-center">
                            <Link className="w-full" to={`/classDetails/${aClass._id}`}>
                                <button className="px-4 py-2 rounded-full bg-cyan-600 btn-block text-white font-bold hover:bg-cyan-700">
                                    Enroll
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>)
            }
        </div>
    );
};

export default AllClasses;