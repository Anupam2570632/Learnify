import Marquee from "react-fast-marquee";
import { AiFillAmazonCircle } from "react-icons/ai";
import { FaFacebook, FaFontAwesome, FaGithub, FaGoogle, FaInstagram, FaLinkedin, FaTwitter, FaWordpress } from "react-icons/fa6";

const Partners = () => {
    return (
        <div className="w-11/12 md:w-4/5 mx-auto pt-20">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Partners</h2>
            <Marquee gradient gradientColor="cyan" className="py-10 flex items-center justify-center">
                <div className="flex items-center space-x-10 ml-6">
                    <div className="flex flex-col items-center">
                        <FaGoogle className="text-4xl mb-2"/>
                        <p className="text-lg text-center">Google</p>
                        <p className="text-sm text-gray-600 w-48 text-center">Providing access to Google Cloud Platform for Learnify courses.</p>
                    </div>
                </div>
                <div className="flex items-center space-x-10 ml-6">
                    <div className="flex flex-col items-center">
                        <FaFacebook className="text-4xl mb-2"/>
                        <p className="text-lg text-center">Facebook</p>
                        <p className="text-sm text-gray-600 w-48 text-center">Collaborating with Learnify to offer social learning experiences.</p>
                    </div>
                </div>
                <div className="flex items-center space-x-10 ml-6">
                    <div className="flex flex-col items-center">
                        <FaGithub className="text-4xl mb-2"/>
                        <p className="text-lg text-center">GitHub</p>
                        <p className="text-sm text-gray-600 w-48 text-center">Supporting Learnify's open-source initiatives and projects.</p>
                    </div>
                </div>
                <div className="flex items-center space-x-10 ml-6">
                    <div className="flex flex-col items-center">
                        <FaTwitter className="text-4xl mb-2"/>
                        <p className="text-lg text-center">Twitter</p>
                        <p className="text-sm text-gray-600 w-48 text-center">Sharing Learnify's latest updates and educational content.</p>
                    </div>
                </div>
                <div className="flex items-center space-x-10 ml-6">
                    <div className="flex flex-col items-center">
                        <FaInstagram className="text-4xl mb-2"/>
                        <p className="text-lg text-center">Instagram</p>
                        <p className="text-sm text-gray-600 w-48 text-center">Showcasing student achievements and Learnify events.</p>
                    </div>
                </div>
                <div className="flex items-center space-x-10 ml-6">
                    <div className="flex flex-col items-center">
                        <FaLinkedin className="text-4xl mb-2"/>
                        <p className="text-lg text-center">LinkedIn</p>
                        <p className="text-sm text-gray-600 w-48 text-center">Connecting Learnify with professionals and industry leaders.</p>
                    </div>
                </div>
                <div className="flex items-center space-x-10 ml-6">
                    <div className="flex flex-col items-center">
                        <FaWordpress className="text-4xl mb-2"/>
                        <p className="text-lg text-center">WordPress</p>
                        <p className="text-sm text-gray-600 w-48 text-center">Hosting Learnify's blog and educational resources.</p>
                    </div>
                </div>
                <div className="flex items-center space-x-10 ml-6">
                    <div className="flex flex-col items-center">
                        <AiFillAmazonCircle className="text-4xl mb-2"/>
                        <p className="text-lg text-center">Amazon</p>
                        <p className="text-sm text-gray-600 w-48 text-center">Supporting Learnify's cloud infrastructure and services.</p>
                    </div>
                </div>
                <div className="flex items-center space-x-10 ml-6">
                    <div className="flex flex-col items-center">
                        <FaFontAwesome className="text-4xl mb-2"/>
                        <p className="text-lg text-center">Font Awesome</p>
                        <p className="text-sm text-gray-600 w-48 text-center">Providing icons for Learnify's user interface.</p>
                    </div>
                </div>
            </Marquee>
        </div>
    );
};

export default Partners;
