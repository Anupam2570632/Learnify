import Banner from "../Banner/Banner";
import Feedback from "../Feedback/Feedback";
import OurFamily from "../OurFamily/OurFamily";
import Partners from "../Partners/Partners";
import StartTeaching from "../StartTeaching/StartTeaching";

const Home = () => {
    return (
        <div>
            <Banner/>
            <StartTeaching />
            <Partners/>
            <OurFamily/>
            <Feedback/>
        </div>
    );
};

export default Home;