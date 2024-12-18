import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

const Banner = () => {
  const [banner, setBanner] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/exhibitionNavbar')
      .then(res => res.json())
      .then(data => setBanner(data));
  }, []);

  return (
    <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
      {banner.map((item, index) => (
        <SwiperSlide key={index}>
          <img
            src={item.photoUrl} // Replace 'photoUrl' with the correct property from your API data
            alt={`Slide ${index + 1}`}
            className="w-full h-auto object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Banner;
