import useClasses from "../../../hooks/useClasses";

const PopularClasses = () => {
    const [classes] = useClasses()
    const sortedClasses = [...classes].sort((a, b) => b.total_enrolment - a.total_enrolment);

    return (
        <div className="my-6 md:my-20 space-y-6 w-11/12 md:w-4/5 mx-auto">
            <h1 className="text-center text-4xl font-black">Popular Classes</h1>
            <div className="carousel carousel-center rounded-box ">
                {
                    sortedClasses.map((oneClass, idx) => <div key={idx} className="relative carousel-item ml-4">
                        <img className="w-[400px] h-[450px] object-cover object-center" src={oneClass.image} alt="Pizza" />
                        <div className="absolute inset-0 bg-black bg-opacity-40">
                            <h1 className="text-xl font-bold text-white">{oneClass.title}</h1>
                            <p className="text-white">Enrolled : {oneClass.total_enrolment}</p>
                        </div>
                    </div>)
                }


            </div>
        </div>
    );
};

export default PopularClasses;