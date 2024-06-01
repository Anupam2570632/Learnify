// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import BannerMessage from './BannerMessage';

export default function Banner() {
    return (
        <div className='overflow-hidden h-[90vh] flex items-center justify-center'>
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
                loop={true}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide className='h-[100%] w-screen'>
                    <img className='w-[100%] h-[100%] object-cover object-center' src="https://images.unsplash.com/photo-1496065187959-7f07b8353c55?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                    <div className='absolute  pl-[7vw] pr-[15vw] flex items-center justify-center inset-0 bg-black bg-opacity-60 right-0 bottom-0'>
                        <BannerMessage />
                    </div>
                </SwiperSlide>
                <SwiperSlide className='h-[100%] w-screen'>
                    <img className='w-[100%] h-[100%] object-cover object-center' src="https://images.unsplash.com/photo-1624377632657-3902bfd35958?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                    <div className='absolute  pl-[7vw] pr-[15vw] flex items-center justify-center inset-0 bg-black bg-opacity-60 right-0 bottom-0'>
                        <BannerMessage />
                    </div>
                </SwiperSlide>
                <SwiperSlide className='h-[100%] w-screen'>
                    <img className='w-[100%] h-[100%] object-cover object-center' src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                    <div className='absolute  pl-[7vw] pr-[15vw] flex items-center justify-center inset-0 bg-black bg-opacity-60 right-0 bottom-0'>
                        <BannerMessage />
                    </div>
                </SwiperSlide>
                <SwiperSlide className='h-[100%] w-screen'>
                    <img className='w-[100%] h-[100%] object-cover object-center' src="https://plus.unsplash.com/premium_photo-1663089895867-428d148a8663?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                    <div className='absolute  pl-[7vw] pr-[15vw] flex items-center justify-center inset-0 bg-black bg-opacity-60 right-0 bottom-0'>
                        <BannerMessage />
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
}
