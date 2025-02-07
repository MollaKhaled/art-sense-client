import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ photo }) => {
  const { _id, artistsId, artist, title, media, size, year, stockCode, photoUrl, formattedPrice } = photo
  return (
    <div className="card bg-base-100 sm:w-96">
      <figure className="pt-10  flex items-center justify-center cursor-pointer">
        <img src={photoUrl} alt="Art" />
      </figure>

      <div className="card-body text-center ">
        <div className="text-center">
          <p className="text-lg font-bold">{artist}</p>

          <p className="text-lg ">
            {title} <span className="text-red-500">|</span> {media}
          </p>
          <p className="text-lg">
            {size} <span className="text-red-500">|</span> {stockCode}
          </p>
          {formattedPrice && (
            <p className="text-lg font-bold">{formattedPrice}</p>
          )}

        </div>

        <div className="mt-4">
          <Link>
            <button className="btn w-full">Available</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;