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
  const { _id, artist, title, size, stockCode, photoUrl, media } = item;
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
    const message = `${fixedMessage} for artwork "${title}" (ID: ${_id}).`;
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(url, "_blank");
  };

  const openModal = () => {
    setSelectedPhoto(item);
    setIsOpen(true);
  };

  return (
    <div className="card bg-base-100 shadow-xl w-96 h-96">
      <figure
        className="px-10 pt-10 h-full flex items-center justify-center cursor-pointer"
        onClick={openModal}
      >
        <img
          src={photoUrl}
          alt="Art"
          className="rounded-xl object-contain max-w-full max-h-full"
        />
      </figure>

      <div className="card-body text-center p-5">
        <div className="text-center">
          <p className="text-lg">{artist}</p>
          <p className="text-lg">
            {title} <span className="text-red-500">|</span> {media}
          </p>
          <p className="text-lg">
            {size} <span className="text-red-500">| </span> {stockCode}
          </p>
        </div>
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={handleWhatsAppClick}
            className="flex items-center gap-1 text-green-600"
          >
            <p>Ask for Price</p>
            <FaWhatsapp />
          </button>
          <span>|</span>
          <Link to={`/inquire/${_id}`}>
            <IoMdMail />
          </Link>
        </div>
        <div className="card-actions">
          <button onClick={() => handleAddToCart(item)} className="btn w-full">
            Available
          </button>
        </div>
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
