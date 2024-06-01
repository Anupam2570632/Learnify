import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const BannerMessage = () => {


    return (
        <div className="space-y-4 text-black text-start">
            <div className="text-start flex flex-wrap items-center gap-3 text-2xl lg:text-5xl md:text-3xl  text-white font-bold">
                Welcome to
                <h1 to={'/'} className="flex items-center text-green-500 gap-1">Learnify</h1>

            </div>
            <p className="animate__animated animate__backInRight text-[#CCCC] mt-4 max-w-[750px]">
                Join Learnify in transforming education. From seamless class management to enhancing skill learning, let&apos;s make a difference together. Start your journey with us today and help create an empowered community of educators and learners. Together, we can ensure everyone has access to quality education and effective learning tools.
            </p>
            <Link to={'/register'} >
                <button className="font-bold px-4 py-2 bg-cyan-600 flex items-center gap-2 my-4 text-white rounded-full text-nowrap">
                    Sign Up
                    <FaArrowRight />
                </button>
            </Link>
        </div>
    );
};

export default BannerMessage;
