import React from 'react';
import { Helmet } from 'react-helmet-async';

const About = () => {
  return (
    <>
      <Helmet>
        <title>artsense | about</title>
      </Helmet>
      <div className="flex flex-wrap md:flex-nowrap gap-6 w-full min-h-screen   mt-52">
  {/* Left Section */}
  <div className="w-full md:w-1/2">
    <div className="text-center md:text-right">
      <h1 className="text-lg">
        <span className="text-red-600 text-xl">a</span>rt
        <span className="text-red-600">s</span>ense
      </h1>
      <h1 className="text-gray-900 ">connecting through art</h1>
    </div>
  </div>
  
  {/* Right Section */}
  <div className="w-full md:w-1/2  md:mt-8">
    <p>
    <span className="text-red-600 text-lg">a</span>rt
        <span className="text-red-600">s</span>ense is an organization dedicated to fostering the creation of contemporary visual art. Numerous barriers hinder an artist's entry into the art world, encompassing logistical challenges and marketing intricacies. We assume responsibility for a comprehensive array of tasks, ranging from negotiating with clients to facilitating pick-up and delivery, thereby offering a seamless system that enables artists to operate on a global scale while remaining situated within their own country. ArtSense provides steadfast support to artists in cultivating their careers. Our overarching goal is to establish and expand a platform that empowers artists to manifest their visions of the future, whether their aspirations involve the sale of their artwork or other pursuits.
    </p>
  </div>
</div>

    </>
  );
};

export default About;
