import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FaWhatsapp } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import useAdmin from "../../hooks/useAdmin";

const ArtworkDetails = () => {
  const { id } = useParams(); // Get artwork ID from the route
  const [artwork, setArtwork] = useState(null);
  const [isAdmin] = useAdmin();
  const fixedMessage = "Inquire about artwork";
  const phoneNumber = "+8801727079377";
  useEffect(() => {
    // Fetch artwork details from the API
    fetch(`https://art-sense-server.vercel.app/photo/${id}`)
      .then((res) => res.json())
      .then((data) => setArtwork(data))
      .catch((err) => console.error("Error fetching artwork:", err));
  }, [id]);

  if (!artwork) {
    return <p className="text-center mt-10">Loading artwork details...</p>;
  }

  const { _id, artist, title, size, stockCode, photoUrl, media, year, details, condition, history, shipping, payment } = artwork;

  const handleWhatsAppClick = () => {
    const message = `${fixedMessage} Id ${stockCode}`;
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(url, "_blank");
  };


  return (
    <>
      <Helmet>
        <title>artsense | Artwork Details</title>
      </Helmet>

      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-32 m-4 md:m-12 px-4 md:px-20 text-sm ">
        {/* Image Section */}
        <div className="flex-1 relative">
          <img src={photoUrl} alt={title} className="w-full h-auto shadow-lg" />
        </div>

        {/* Item Details Section - Positioned at the Bottom */}
        <div className="flex flex-col justify-end text-sm">
          <h2>
            Artwork ID: <span className="text-red-500">{stockCode}</span>
          </h2>
          <div className="divider h-0.5"></div>
          <h2 className="font-semibold mb-2">{artist}</h2>
          <p>{title}</p>
          <p>{media}</p>
          <p>{size}</p>
          <p>{year}</p>
          <div className="divider h-0.5"></div>

          {/* Buttons Section */}
          <div >
            <div className="flex gap-2 mb-3">
              <button
                onClick={handleWhatsAppClick}
                className="gap-1 inline-flex items-center">
                <span>{stockCode}</span>
                <span className="text-red-500">|</span>
                <p className="text-green-500">Ask for Price</p>
                <FaWhatsapp className="text-green-500 " />
              </button>
              <span className="text-red-500">|</span>
              <Link to={`/inquire/${_id}/${stockCode}`} className="inline-flex items-center">
                <IoMdMail />
              </Link>

            </div>
            <div className="items-center mt-4">
              <button className="btn w-full">Available</button>
            </div>
          </div>
        </div>
      </div>

      {/* Notes Section */}
      <div className="text-sm m-4 md:m-12 pt-1">
        <div className="divider h-0.5"></div>
        <h2 className="text-center font-semibold">Notes</h2>
        <div className="divider "></div>
        <div className="flex flex-col md:flex-row gap-4 md:gap-2">
          {/* About Details Section */}
          <div className="w-full md:w-1/2 mx-2">
            <h2 className="font-semibold mb-2">About Details</h2>
            <p className="text-sm">{ }</p>
          </div>

          {/* Additional Details Section */}
          <div className="w-full md:w-1/2">
            <div className="collapse collapse-arrow">
              <input type="checkbox" className="peer" />
              <div className="collapse-title">
                Condition Report
              </div>
              <div className="collapse-content">
                <p>{condition}</p>
              </div>
            </div>
            <div className="divider h-0.5"></div>
            <div className="collapse collapse-arrow">
              <input type="checkbox" className="peer" />
              <div className="collapse-title">
                History and Provenance
              </div>
              <div className="collapse-content">
                <p>{history}</p>
              </div>
            </div>
            <div className="divider h-0.5"></div>
            <div className="collapse collapse-arrow">
              <input type="checkbox" className="peer" />
              <div className="collapse-title">
                Shipping Information
              </div>
              <div className="collapse-content">
                <p>{shipping}</p>
              </div>
            </div>
            <div className="divider h-0.5"></div>
            <div className="collapse collapse-arrow">
              <input type="checkbox" className="peer" />
              <div className="collapse-title">
                Payment and Return Policies
              </div>
              <div className="collapse-content">
                <p>{payment}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default ArtworkDetails;
