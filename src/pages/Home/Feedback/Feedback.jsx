import { Swiper, SwiperSlide } from 'swiper/react';
import useFeedback from '../../../hooks/useFeedback'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Autoplay, Navigation } from 'swiper/modules';
import { BiSolidQuoteAltRight } from 'react-icons/bi';

export default function Feedback() {

    const { feedback } = useFeedback();

    return (
        <div className='py-20 max-w-[1500px] w-11/12 space-y-6 md:w-[85%] mx-auto'>
            <h2 className='text-green-400 font-bold italic text-center text-2xl'>Testimonial</h2>
            <h2 className=' text-3xl md:text-5xl font-bold text-center'>What our Student say</h2>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Navigation]}
                className="mySwiper"
            >
                {
                    feedback.map((text, idx) => <SwiperSlide key={idx}>
                        <div className='text-center flex items-center justify-center space-y-6 flex-col'>
                            <h2 className='text-4xl md:text-7xl text-green-400 font-bold'><BiSolidQuoteAltRight /></h2>
                            <h2 className='text-xl font-black underline underline-offset-[7px]'>{text.classTitle}</h2>
                            <p className='max-w-[680px] italic text-xl text-black opacity-80 mx-auto text-center'>{text.feedbackText}</p>
                            <img className='w-20 h-20 object-cover object-center rounded-full' src={text.userImage} alt="" />
                            <h2 className='text-xl font-black'>{text.userName}</h2>
                        </div>
                    </SwiperSlide>)
                }


            </Swiper>
        </div>
    );
}
