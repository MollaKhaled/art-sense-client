import React from 'react';
import { Link } from 'react-router-dom';

const ExhibitionSearchCard = ({ photo }) => {
  const { _id, artist, title, media, size, stockCode, photoUrl, formattedPrice, year } = photo
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
      <div className="card text-center p-5">
        <div className="text-center ">
          <p className=" font-bold">{artist}</p>
          <p >
            {title} <span className="text-red-500">|</span> {media}
          </p>
          <p>
            {size} <span className="text-red-500">| </span>{year}  <span className="text-red-500"> | {formattedPrice}</span>
          </p>
          <p >
            <span className="text-green-600">{stockCode}</span>
          </p>
          <div className='mt-2'>
            <Link to={`/exhibition/${_id}`}>
              <button className="btn w-3/4 ">View Details</button>
            </Link>
          </div>
        </div>


      </div>




    </div>
  );
};

export default ExhibitionSearchCard;