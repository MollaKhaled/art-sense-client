import React from 'react';
import { Helmet } from 'react-helmet-async';

const About = () => {
  return (
    <>
     <Helmet>
        <title>artsense | about</title>
      </Helmet>
      <div className="container mx-auto flex flex-col justify-center items-center min-h-screen text-center p-8 bg-gray-50">
  <div className='text-right'>
  <h1 className="text-lg">
    <span className="text-red-600">a</span>rt
    <span className="text-red-600">s</span>ense
  </h1>
  <h1 className=" text-gray-700">connecting through art</h1>
  </div>
  <p className="mt-8 m-36 px-36 text-gray-800 text-left">
    ArtSense is an organization dedicated  to fostering the creation of contemporary visual art. Numerous barriers hinder an artist's entry into the art world, encompassing logistical challenges and marketing intricacies. We assume responsibility for a comprehensive array of tasks, ranging from negotiating with clients to facilitating pick-up and delivery, thereby offering a seamless system that enables artists to operate on a global scale while remaining situated within their own country. ArtSense provides steadfast support to artists in cultivating their careers. Our overarching goal is to establish and expand a platform that empowers artists to manifest their visions of the future, whether their aspirations involve the sale of their artwork or other pursuits.
  </p>
</div>



    </>
  );
};

export default About;
