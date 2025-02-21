import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { AuthContext } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";
import BookingModal from "../BookingModal/BookingModal";


const PhotoItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const { _id, artist, title, size, stockCode, photoUrl, media, year } = item;
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const [cart, refetch] = useCart();
  const phoneNumber = "+8801727079377"; // Your WhatsApp number
  const fixedMessage = "Inquire about artwork";

  const handleAddToCart = (photo) => {
    if (user && user.email) {
      const cartItem = {
        photoId: _id,
        email: user.email,
        name: user.name,
        image: photo.photoUrl,
        price: photo.price,
      };
      axiosSecure.post("/carts", cartItem).then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${title} added to your cart`,
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        }
      });
    } else {
      Swal.fire({
        title: "You are not Logged In",
        text: "Please login to add to the cart?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, login!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  const handleWhatsAppClick = () => {
    const message = `${fixedMessage} "${title}" (StockCode - ${stockCode}).`;
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(url, "_blank");
  };

  const openModal = () => {
    setSelectedPhoto(item);
    setIsOpen(true);
  };

  return (

    <div className="card flex flex-col justify-between h-[450px] rounded-lg overflow-hidden">
      {/* Image Container */}
      <figure className="px-10 h-[250px] flex items-center justify-center">
        <img
          onClick={openModal}
          src={photoUrl}
          alt="Artwork"
          className="w-full h-full object-contain rounded-sm "
        />
      </figure>

      <div className="card text-center p-5 text-sm">
        <div className="text-center text-sm">
          <p className=" font-bold">{artist}</p>
          <p>
            {title} <span className="text-red-500">|</span> {media}
          </p>
          <p>
            {size} <span className="text-red-500">| </span> {year}
          </p>
        </div>
        <div className="flex items-center justify-center gap-2 mt-1">
          <button
            onClick={handleWhatsAppClick}
            className="flex items-center gap-1 text-green-600"
          >
            <span className="text-gray-800">{stockCode}</span><span className="text-red-500">| </span> <p>Ask for Price</p>
            <FaWhatsapp />
          </button>
          <span className="text-red-500">|</span>
          <Link to={`/inquire/${_id}/${stockCode}`}>
            <IoMdMail />
          </Link>
        </div>
        <div className='mt-3'>
          <Link>
            <button className="btn w-3/4 ">Available</button>
          </Link>
        </div>
       
      </div>
     
      <div>

      </div>

      {/* Booking Modal */}
      {selectedPhoto && (
        <BookingModal
          isOpen={isOpen}
          closeModal={() => setIsOpen(false)}
          bookingInfo={selectedPhoto}
          refetch={refetch}
        />
      )}
    </div>


  );
};

export default PhotoItem;