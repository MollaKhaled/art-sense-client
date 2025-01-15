import React, { useState } from 'react';
import ExhibitionModal from '../Shared/ExhibitionModal/ExhibitionModal';
import useCart from '../../hooks/useCart';
import { Link } from 'react-router-dom';


const PopularExhibitionCard = ({item}) => {
  const { _id, artist, title, size, stockCode, photoUrl, media, price, formattedPrice } = item;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [cart, refetch] = useCart();

  const openModal = () => {
    setSelectedPhoto(item);
    setIsOpen(true);
  };
  return (
    <div className="card bg-base-100 sm:w-96 ">
      <figure
        className=" pt-10 h-full flex items-center justify-center cursor-pointer"
        onClick={openModal}
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
            {size} <span className="text-red-500">|  </span> {stockCode}
          </p>
          <h1 className="text-red-500">{formattedPrice}</h1>
        </div>
        <div className="flex items-center justify-center gap-2">
         
        </div>
        <div >
        <Link to={`/exhibition/${_id}`} state={{ item }}>
          <button className="btn w-full">View Details</button>
        </Link>
        </div>
      </div>
          {/* Booking Modal */}
          {selectedPhoto && (
        <ExhibitionModal
          isOpen={isOpen}
          closeModal={() => setIsOpen(false)}
          bookingInfo={selectedPhoto}
          refetch={refetch}
        />
      )}
    
    </div>
  );
};

export default PopularExhibitionCard;