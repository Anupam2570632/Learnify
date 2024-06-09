import { Link } from "react-router-dom";
import Btn from "../../../components/Btn";

const StartTeaching = () => {
    return (
        <div className="flex flex-col-reverse md:flex-row-reverse gap-6 items-center justify-center w-11/12 md:w-4/5 mx-auto mt-10 md:mt-20">
            <div className="md:w-1/2 space-y-4 ">
                <h2 className="text-3xl font-bold text-[#131313]">Become an Instructor</h2>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates numquam, recusandae deleniti, minus rerum aspernatur voluptatum eligendi illum impedit maiores, nulla iusto distinctio veritatis!</p>
                <div>
                    <Link to={'/tech'}>
                        <Btn text={'Start Teaching Today'} />
                    </Link>
                </div>
            </div >
            <div className="bg-white md:w-1/2">
                <img className=" mix-blend-multiply" src="https://images.pexels.com/photos/3771074/pexels-photo-3771074.jpeg" alt="" />
            </div>
        </div>
    );
};

export default StartTeaching;