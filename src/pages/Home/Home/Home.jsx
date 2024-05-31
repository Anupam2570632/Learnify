import Feedback from "../Feedback/Feedback";
import OurFamily from "../OurFamily/OurFamily";
import Partners from "../Partners/Partners";
import StartTeaching from "../StartTeaching/StartTeaching";

const Home = () => {
    return (
        <div>
            <StartTeaching />
            <Partners/>
            <OurFamily/>
            <Feedback/>
        </div>
    );
};

export default Home;