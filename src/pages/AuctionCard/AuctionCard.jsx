import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../Shared/LoadingSpinner/LoadingSpinner";

const AuctionCard = ({ item }) => {
  const { _id, artist, title, size, stockCode, photoUrl, media, lotId, birth, year,bid } = item;
  const [bidCount, setBidCount] = useState(0); // State for bid count
  const [loading, setLoading] = useState(true);

  // Fetch the bid count when the component mounts
  useEffect(() => {
    const fetchBidCount = async () => {
      try {
        const response = await fetch(`http://localhost:3000/bid/${lotId}/bid-count`);
        const data = await response.json();
        setBidCount(data.bidCount || 0); // Update bid count
      } catch (error) {
        console.error("Error fetching bid count:", error);
      }
    };

    fetchBidCount();
  }, [lotId]);

  return (
    <div className='flex flex-col gap-2 w-full'>
      <div
        className='
          aspect-square 
          w-full 
          relative 
          overflow-hidden    
        '
      >
        <img
          className='
            
            h-full 
            w-full 
            group-hover:scale-150 
            transition
          '
          src={photoUrl}
          alt='photo'
        />
        <div
          className='
          absolute
          top-3
          right-3
        '
        ></div>
      </div>
      <div className="flex items-center gap-2 ">
        <h2 className="text-lg sm:text-xl lg:text-xl font-bold w-1/2">
          {artist}
        </h2>
        <p className="text-sm sm:text-base text-gray-400 w-1/2">({birth})</p>
      </div>


      <div className="text-center">
        <p className="text-sm sm:text-base"> {title}</p>
        <p className="text-sm sm:text-base"> {media}</p>
        <p className="text-sm sm:text-base"> {size}</p>
        
      </div>
      <div className="text-sm sm:text-base text-center">
            <span className="text-red-500" >BDT {bid}</span>
            <div className="text-sm sm:text-base">
                <p className="text-green-500 text-center ">{bidCount} Bids</p>
            </div>
          </div>
          <p className="text-sm sm:text-base text-center">
            Ending: {" "}
            {item.dates && item.dates[0]?.endDate
              ? new Date(item.dates[0].endDate).toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
               
              })
              : "No end date available"}
          </p>


      <div className="mt-4">
        <Link to={`/auction/${_id}`} state={{ item }}>
          <button className="btn w-full">Bids</button>
        </Link>
      </div>
    </div>
  );
};

export default AuctionCard;


