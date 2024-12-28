import React, { useEffect, useState } from 'react';
import AuctionCard from '../AuctionCard/AuctionCard';
import AuctionBanner from './AuctionBanner';
import { Helmet } from 'react-helmet-async';


const Auction = () => {
  const [auctionPhoto, setAuctionPhoto] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    fetch('http://localhost:3000/auction')
      .then((res) => res.json())
      .then((data) => {
        setAuctionPhoto(data);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch(() => setLoading(false)); // Handle fetch errors gracefully
  }, []);

  return (
    <>
      <Helmet>
        <title>artsense | auction</title>
      </Helmet>
      <div className='pt-8'>
        <AuctionBanner />
      </div>
      <div className="my-10">
        {loading ? (
          // Display spinner while loading
          <div className="flex justify-center items-center h-screen">
            <span className="loading loading-spinner text-error"></span>
          </div>
        ) : auctionPhoto.length > 0 ? (
          // Display auction items if data exists
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
            {auctionPhoto.map((item) => (
              <AuctionCard key={item._id} item={item} />
            ))}
          </div>
        ) : (
          // Display message if no auction items are available
          <p className="text-center text-gray-500"></p>
        )}
      </div>
    </>
  );
};

export default Auction;
