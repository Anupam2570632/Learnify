import Marquee from "react-fast-marquee";
import { AiFillAmazonCircle } from "react-icons/ai";
import { FaFacebook, FaFontAwesome, FaGithub, FaGoogle, FaInstagram, FaLinkedin, FaTwitter, FaWordpress } from "react-icons/fa6";

const Partners = () => {
    return (
        <div className="w-11/12 md:w-4/5 mx-auto py-20">
            <Marquee gradient gradientColor="cyan" className="py-6 overflow-hidden flex items-center">
                <FaGoogle className="text-4xl mr-20"/>
                <FaFacebook className="text-4xl mr-20"/>
                <FaGithub className="text-4xl mr-20"/>
                <FaTwitter className="text-4xl mr-20"/>
                <FaInstagram className="text-4xl mr-20"/>
                <FaLinkedin className="text-4xl mr-20"/>
                <FaWordpress className="text-4xl mr-20"/>
                <AiFillAmazonCircle className="text-4xl mr-20"/>
                <FaFontAwesome className="text-4xl mr-20"/>
            </Marquee>
        </div>
    );
};

export default Partners;