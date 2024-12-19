import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AuctionCard = ({ item }) => {
  const { _id, artist, title, size, stockCode, photoUrl, media, lotId } = item;
  const [bidCount, setBidCount] = useState(0); // State for bid count

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
    <div className="card bg-base-100 sm:w-96 shadow-xl">
      <figure className="px-10 pt-10 h-full flex items-center justify-center cursor-pointer">
        <img src={photoUrl} alt="Art" />
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
          <p className="text-green-500">{bidCount} Bids</p> {/* Display bid count */}
        </div>

        <div className="mt-4">
          <Link to={`/auction/${_id}`} state={{ item }}>
            <button className="btn w-full">View Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuctionCard;
