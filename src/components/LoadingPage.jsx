import Lottie from "lottie-react";
import loadingImg from '../../public/loading.json'


const LoadingPage = () => {
    return (
        <div className="h-[100vh] max-w-screen flex items-center justify-center">
            <Lottie style={{ height: '150px' }} animationData={loadingImg} loop={true} />
        </div>
    );
};

export default LoadingPage;