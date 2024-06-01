import Banner from "../Banner/Banner";
import Feedback from "../Feedback/Feedback";
import OurFamily from "../OurFamily/OurFamily";
import Partners from "../Partners/Partners";
import PopularClasses from "../PopularClasses/PopularClasses";
import StartTeaching from "../StartTeaching/StartTeaching";

const Home = () => {
    return (
        <div>
            <Banner/>
            <PopularClasses/>
            <StartTeaching />
            <Partners/>
            <OurFamily/>
            <Feedback/>
        </div>
    );
};

export default Home;