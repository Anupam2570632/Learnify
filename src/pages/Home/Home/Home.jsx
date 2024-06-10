import Banner from "../Banner/Banner";
import ContactSection from "../Contact/Contact";
import Faq from "../Faq/Faq";
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
            <Faq/>
            <ContactSection/>
        </div>
    );
};

export default Home;