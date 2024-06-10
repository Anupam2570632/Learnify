import { FiMail, FiPhone } from "react-icons/fi";

const ContactSection = () => {
    return (
        <div className="w-11/12 md:w-4/5 mx-auto py-10 my-6 bg-cyan-200 rounded-lg text-center">
            <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
            <div className="flex items-center justify-center space-x-6">
                <div className="flex items-center">
                    <FiMail className="text-2xl mr-2 text-gray-600" />
                    <p className="text-lg">abc@gmail.com</p>
                </div>
                <div className="flex items-center">
                    <FiPhone className="text-2xl mr-2 text-gray-600" />
                    <p className="text-lg">012345678910</p>
                </div>
            </div>
            <p className="mt-4 text-lg text-gray-600">Address: Dhaka, Bangladesh, 4500</p>
        </div>
    );
};

export default ContactSection;
