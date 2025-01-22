import React from "react";
import { Link } from "react-router-dom";
import useBidCount from "../../hooks/useBidCount";
import useRemainingTime from "../../hooks/useRemainingTime";

const AuctionCard = ({ item }) => {
  const { _id, artist, title, size, stockCode, photoUrl, media, lotId, birth, year, bid } = item;
  const { bidCount, loading } = useBidCount(lotId);
  const remainingTime = useRemainingTime(item.dates?.[0]?.endDate);

  return (
    <div className="card bg-base-100 sm:w-96">
      <figure className="pt-10 h-full flex items-center justify-center cursor-pointer">
        <img src={photoUrl} alt="Art" />
      </figure>

      <div className="card-body text-center p-5">
        <div className="text-center">
          <p className="text-lg font-bold">{artist}</p>
          <p className="text-lg text-gray-400">{birth}</p>
          <p className="text-lg mt-4">
            {title} <span className="text-red-500">|</span> {media}
          </p>
          <p className="text-lg">
            {size} <span className="text-red-500">|</span> {stockCode}
          </p>
          <div className="mt-4">
            <h1 className="text-red-500">{bid}</h1>
            {loading ? (
              <p className="text-green-500 text-center">Loading bids...</p>
            ) : (
              <p className="text-green-500 text-center">{bidCount} Bids</p>
            )}
          </div>
        </div>
        <div>
          {remainingTime && (
            <p className="text-sm sm:text-base text-center ">
              {remainingTime}
            </p>
          )}
        </div>
        <div className="mt-4">
          <Link to={`/auction/${_id}`} state={{ item }}>
            <button className="btn w-full">BID</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuctionCard;
