import Lottie from 'lottie-react';
import errorLogo from '../../../public/404logo.json'
import { Link } from 'react-router-dom';
const ErrorPage = () => {
    return (
        <div className='max-h-screen w-[100vw] relative'>
            <Lottie style={{height:'100vh', width:'100%', objectFit:'cover'}} animationData={errorLogo} loop={true} />
            <div className='absolute bottom-40 right-1/2'>
                <Link to={'/'}>
                <button className='px-4 py-2 text-white font-bold rounded-full bg-cyan-600 hover:bg-cyan-800 text-nowrap '>Go To Home</button>
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;