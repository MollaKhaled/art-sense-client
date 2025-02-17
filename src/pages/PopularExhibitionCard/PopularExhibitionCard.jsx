import React, { useState } from 'react';
import ExhibitionModal from '../Shared/ExhibitionModal/ExhibitionModal';
import useCart from '../../hooks/useCart';
import { Link } from 'react-router-dom';


const PopularExhibitionCard = ({ item }) => {
  const { _id, artist, title, size, stockCode, photoUrl, media, price, formattedPrice } = item;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [cart, refetch] = useCart();

  const openModal = () => {
    setSelectedPhoto(item);
    setIsOpen(true);
  };
  return (
    <div className="card flex flex-col justify-between h-[450px] rounded-lg overflow-hidden text-sm">
    {/* Image Container */}
    <figure className="px-10 h-[250px] flex items-center justify-center">
      <img
      onClick={openModal}
        src={photoUrl}
        alt="Artwork"
        className="w-full h-full object-contain rounded-sm "
      />
    </figure>

      <div className="card-body text-center p-5 text-sm">
        <div className="text-center text-sm">
          <p className=" font-bold">{artist}</p>

          <p >
            {title} <span className="text-red-500">|</span> {media}
          </p>
          {formattedPrice && (
            <p> {size}  <span className="text-red-500">| {formattedPrice}</span></p>
          )}

          <p className='text-green-500 mt-2 text-center'>
            {stockCode}
          </p>

          <div className='mt-2'>
          <Link to={`/exhibition/${_id}`} state={{ item }}>
            <button className="btn w-3/4 ">View Details</button>
          </Link>
        </div>

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