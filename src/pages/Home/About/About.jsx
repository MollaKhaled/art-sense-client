import React from 'react';
import { Helmet } from 'react-helmet-async';

const About = () => {
  return (
    <>
      <Helmet>
        <title>artsense | about</title>
      </Helmet>
      <div className="flex flex-wrap md:flex-nowrap gap-3 md:gap-6 w-full lg:min-h-screen mt-20 md:mt-52 text-sm px-4 md:px-0 mb-12">
        {/* Left Section */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end text-center md:text-right">
          <div>
            <h1 className="text-lg">
              <span className="text-red-600 text-xl">a</span>rt
              <span className="text-red-600">s</span>ense
            </h1>
            <h1 className="text-gray-400 mt-1">connecting through art</h1>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 md:mt-8 text-justify-left">
          <container>
            <span className="text-red-600 text-lg">a</span>rt
            <span className="text-red-600">s</span>ense is an organization dedicated to fostering the creation of 
            <br/>contemporary visual art. Numerous barriers hinder an artist's entry into <br/> the art world, encompassing logistical challenges and marketing intricacies.<br/> We assume responsibility for a comprehensive array of tasks,<br/> ranging from negotiating with clients to facilitating pick-up and delivery,<br/> thereby offering a seamless system that enables artists to operate<br/> on a global scale while remaining situated within their own country.<br/>
            <span className="text-red-600">a</span>rt
            <span className="text-red-600">s</span>ense provides steadfast support to artists in cultivating their careers. <br/>Our overarching goal is to establish and expand a platform that empowers<br/> artists to manifest their visions of the future, whether their aspirations<br/> involve the sale of their artwork or other pursuits.
    

          </container>
        </div>
      </div>
    </>
  );
};

export default About;
