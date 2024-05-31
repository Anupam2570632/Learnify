import Feedback from "../Feedback/Feedback";
import Partners from "../Partners/Partners";
import StartTeaching from "../StartTeaching/StartTeaching";

const Home = () => {
    return (
        <div>
            <Partners/>
            <StartTeaching />
            <Feedback/>
        </div>
    );
};

export default Home;