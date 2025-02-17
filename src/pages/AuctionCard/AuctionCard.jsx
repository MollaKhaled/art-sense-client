import React from "react";
import { Link } from "react-router-dom";
import useBidCount from "../../hooks/useBidCount";
import useRemainingTime from "../../hooks/useRemainingTime";

const AuctionCard = ({ item }) => {
  const { _id, artist, title, size, stockCode, photoUrl, media, lotId, birth, year, bid } = item;
  const { bidCount, loading } = useBidCount(lotId);
  const remainingTime = useRemainingTime(item.dates?.[0]?.endDate);

  return (
    <div className="card flex flex-col justify-between h-[450px] rounded-lg overflow-hidden">
    {/* Image Container */}
    <figure className="px-10 h-[250px] flex items-center justify-center">
      <img
        src={photoUrl}
        alt="Artwork"
        className="w-full h-full object-contain rounded-sm "
      />
    </figure>

      <div className="card-body text-center p-5 ">
        <div className="text-center text-sm">
          <p className="font-bold">{artist}</p>
          <p className=" text-gray-400">{birth}</p>
          <p className="mt-2">
            {title} <span className="text-red-500">|</span> {media}
          </p>
          <p>
            {size} <span className="text-red-500">|</span> {stockCode}
          </p>
          <div className="mt-2">
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
            <button className="btn w-3/4">BID</button>
          </Link>
        </div>
      </div>

    </div>
  );
};

export default AuctionCard;
