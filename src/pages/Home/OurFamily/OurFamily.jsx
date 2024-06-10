import { FaUserCheck, FaUsers } from "react-icons/fa6";
import { PiBookOpenText } from "react-icons/pi";
import useStat from "../../../hooks/useStat";
import LoadingPage from "../../../components/LoadingPage";

const OurFamily = () => {
    const [stat, isPending] = useStat()
    if (isPending) {
        return (
            <LoadingPage />
        )
    }
    console.log(stat)
    return (
        <div className="flex flex-col mt-6 md:mt-20 lg:flex-row gap-8 items-center justify-center w-11/12 md:w-4/5 mx-auto">
            <div className="lg:w-1/2 ">
                <div className="md:flex">
                    <div className="mx-auto w-full border p-6 space-y-4">
                        <FaUsers className="text-5xl mx-auto" />
                        <h2 className="text-3xl font-bold text-center">Total Users</h2>
                        <p className="text-xl font-black text-center">{stat.userCount}</p>
                    </div>
                    <div className="mx-auto w-full border p-6 space-y-4">
                        <PiBookOpenText className="text-5xl mx-auto" />
                        <h2 className="text-3xl font-bold text-center">Total Classes</h2>
                        <p className="text-xl font-black text-center">{stat.allClassCount}</p>
                    </div>
                </div>
                <div className="mx-auto w-full border p-6 space-y-4">
                    <FaUserCheck className="text-5xl mx-auto" />
                    <h2 className="text-3xl font-bold text-center">Total Enrollment</h2>
                    <p className="text-xl font-black text-center">{stat.totalEnrollment}</p>
                </div>
            </div>
            <div className="lg:w-1/2 relative my-6 md:my-20">
                <img src="https://images.unsplash.com/photo-1472289065668-ce650ac443d2?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                <h2 className="absolute flex items-center justify-center text-4xl font-bold text-white inset-0 bg-black bg-opacity-30">Welcome to LEARNIFY</h2>
            </div>
        </div>
    );
};

export default OurFamily;