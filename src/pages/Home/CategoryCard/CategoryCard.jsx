import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ photo }) => {
  const { _id, artistsId, artist, title, media, size, year, stockCode, photoUrl, formattedPrice } = photo
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

      <div className="card-body text-center p-5">
        <div className="text-center ">
          <p className=" font-bold">{artist}</p>
          <p >
            {title} <span className="text-red-500">|</span> {media}
          </p>
          <p>
            {size} <span className="text-red-500">| </span> {stockCode}
          </p>
          <div className="mt-2" >
            <Link >
              <button className="btn w-3/4 ">Available</button>
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
};

export default CategoryCard;