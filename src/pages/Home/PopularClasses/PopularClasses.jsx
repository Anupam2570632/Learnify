import LoadingPage from "../../../components/LoadingPage";
import useClasses from "../../../hooks/useClasses";

const PopularClasses = () => {
    const status ='accepted'
    const [classes, refetch, classPending] = useClasses(status)
    const sortedClasses = [...classes].sort((a, b) => b.total_enrollment - a.total_enrollment);
    if(classPending){
        return(
            <LoadingPage/>
        )
    }
    // console.log(classes)
    return (
        <div className="my-6 md:my-20 space-y-6 w-11/12 md:w-4/5 mx-auto">
            <h1 className="text-center text-4xl font-black">Popular Classes</h1>
            <div className="carousel carousel-center rounded-box ">
                {
                    sortedClasses.slice(0,6).map((oneClass, idx) => <div key={idx} className="relative carousel-item ml-4">
                        <img className="w-[400px] h-[450px] object-cover object-center" src={oneClass.image} alt="Pizza" />
                        <div className="absolute inset-0 bg-black bg-opacity-40 space-y-4 p-6">
                            <h1 className="text-xl font-bold text-white underline underline-offset-8">{oneClass.title}</h1>
                            <p className="text-white">Enrolled : {oneClass.total_enrollment}</p>
                        </div>
                    </div>)
                }


            </div>
        </div>
    );
};

export default PopularClasses;