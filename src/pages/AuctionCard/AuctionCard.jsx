import React, { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import { Link } from 'react-router-dom';


const AuctionCard = ({item}) => {
  const { _id, artist, title, size, stockCode, photoUrl, media,totalBid } = item;

  return (
     <div className="card bg-base-100 sm:w-96 shadow-xl">
    <figure
      className="px-10 pt-10 h-full flex items-center justify-center cursor-pointer"
    >
      <img
        src={photoUrl}
        alt="Art"     
      />
    </figure>

    <div className="card-body text-center p-5">
      <div className="text-center">
        <p className="text-lg font-bold">{artist}</p>
        <p className="text-lg">
          {title} <span className="text-red-500">|</span> {media}
        </p>
        <p className="text-lg">
          {size} <span className="text-red-500">| </span> {stockCode}
        </p>
      
      </div>
     
      <div className='mt-4'>
       <Link to={`/auction/${_id}`} state={{ item }}>
       <button className="btn w-full">
          View Details
        </button>
       </Link>
      </div>
    </div>
  </div>
  );
};

export default AuctionCard;