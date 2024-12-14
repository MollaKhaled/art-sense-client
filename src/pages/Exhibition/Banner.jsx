import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import banner from '../../assets/menu/Banner.jpg'


const Banner = () => {
  return (
     <>
         <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
           <SwiperSlide>
             <img src={banner} alt="Auction Banner" className="w-full h-full object-cover" />
           </SwiperSlide>
         </Swiper>
       </>
  );
};

export default Banner;