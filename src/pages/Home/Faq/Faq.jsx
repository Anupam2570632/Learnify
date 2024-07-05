import Lottie from 'lottie-react';
import faq from '../../../../public/faq.json'
const Faq = () => {
    return (
        <div className="flex gap-6 border max-w-[1500px] rounded-md my-10 min-h-[530px] flex-col lg:flex-row items-center justify-between w-11/12 md:w-[85%] mx-auto">
            <div className="lg:w-1/2">
                <Lottie style={{ height: '500px' }} animationData={faq} />
            </div>
            <div className="lg:w-1/2 p-6">
                <div className="collapse collapse-plus  rounded-none border border-blue-200">
                    <input type="radio" name="my-accordion-3" defaultChecked />
                    <div className="collapse-title text-xl font-medium">
                        Who can use the Community Food Sharing and Surplus Reduction Platform?                    </div>
                    <div className="collapse-content">
                        <p>Learnify is for anyone interested in learning or teaching technological subjects such as web development, software, digital marketing, and programming. It's ideal for students, educators, professionals, and lifelong learners seeking to enhance their tech skills.</p>
                    </div>
                </div>
                <div className="collapse collapse-plus  rounded-none border border-blue-200">
                    <input type="radio" name="my-accordion-3" />
                    <div className="collapse-title text-xl font-medium">
                        How do I register as a user on the platform?
                    </div>
                    <div className="collapse-content">
                        <p>To register on the platform, simply navigate to the registration page and fill out the required fields, including your name, email, password,contact number, and optional photo URL. Once registered, you'll have access to features such as enroll class, give teacher request.</p>
                    </div>
                </div>
                <div className="collapse collapse-plus  rounded-none border border-blue-200">
                    <input type="radio" name="my-accordion-3" />
                    <div className="collapse-title text-xl font-medium">
                        Can I add class through the platform?                    </div>
                    <div className="collapse-content">
                        <p>Yes, you can contribute class by using the "Add Class" feature. Simply provide details about the class, including its title, image, price, and description. Your class will be visible to other users when admin approve the class request.</p>
                    </div>
                </div>
                <div className="collapse collapse-plus  rounded-none border border-blue-200">
                    <input type="radio" name="my-accordion-3" />
                    <div className="collapse-title text-xl font-medium">
                        How can I enroll a class from the platform?                   </div>
                    <div className="collapse-content">
                        <p>If you want to enroll any class resources, you can browse all classes on the platform and click on the specific class enroll button than pay the required price using card.</p>
                    </div>
                </div>
                <div className="collapse collapse-plus  rounded-none border border-blue-200">
                    <input type="radio" name="my-accordion-3" />
                    <div className="collapse-title text-xl font-medium">
                        Is my personal information protected on the platform?
                    </div>
                    <div className="collapse-content">
                        <p> Yes, we take the security and privacy of our users seriously. Your personal information, including your name and email address, is kept confidential and used only for platform-related purposes. We utilize secure authentication methods to ensure that only authorized users can access their accounts and interact with the platform's features.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Faq;