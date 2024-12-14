import React, { useEffect, useState } from 'react';
import AuctionCard from '../AuctionCard/AuctionCard';
import AuctionBanner from './AuctionBanner';

const Auction = () => {
  const [auctionPhoto, setAuctionPhoto] = useState([]);
    useEffect (() => {
      fetch('http://localhost:3000/auction')
      .then(res =>res.json())
      .then(data => setAuctionPhoto(data))
  
    }, []);
    return (
      <>
      <div><AuctionBanner></AuctionBanner></div>
       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 my-10">
        {auctionPhoto.length > 0 ? (
          auctionPhoto.map((item) => <AuctionCard 
          key={item._id} 
          item={item}
          
           />)
        ) : (
          <p className="text-center text-gray-500">No photos available.</p>
        )}
      </div>
      </>
     
    );
};

export default Auction;