import { useParams, useNavigate, useLocation, useLoaderData } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import useCart from "../../hooks/useCart";

const ExhibitionForm = () => {
  const loadedExhibitionData = useLoaderData();

  // Destructure price and discount from the loaded data
  const { artworkId} = loadedExhibitionData;
  const [cart, refetch] = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const handleBookExhibitionProduct = (event) => {
    event.preventDefault();
    setLoading(true);
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const address = form.address.value;

    const bookedExhibition = {
       id:artworkId,
      customerName: name,
      email,
      phone,
      address,
    };

    fetch(`http://localhost:3000/bookedExhibition`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(bookedExhibition),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `Booked Successfully`,
            showConfirmButton: false,
            timer: 1500,
          });
          form.reset();
          refetch();
        } else {
          Swal.fire({
            title: "You are not Logged In",
            text: "Please login to inquire!",
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
      })
      .catch((error) => {
        console.error("Error booking exhibition:", error);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Failed to book the exhibition.",
          text: "Please try again later.",
          showConfirmButton: true,
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Helmet>
        <title>Book Exhibition | ArtSense</title>
      </Helmet>
      <div className="items-center justify-center">
        <div className="w-full max-w-4xl bg-white rounded-lg overflow-hidden">
          <form onSubmit={handleBookExhibitionProduct}>
            <div className="form-control mb-4">
              <input
                type="text"
                name="name"
                placeholder="*Name"
                className="input input-bordered border-black"
                required
              />
            </div>
            <div className="form-control mb-4">
              <input
                type="email"
                name="email"
                placeholder="*Email"
                className="input input-bordered border-black"
                required
              />
            </div>
            <div className="form-control mb-4">
              <input
                type="text"
                name="phone"
                placeholder="*Phone"
                className="input input-bordered border-black"
                required
              />
            </div>
            <div className="form-control mb-4">
              <textarea
                name="address"
                placeholder="*Address"
                className="textarea textarea-bordered h-28 resize-none border-black"
                required
              ></textarea>
            </div>
            <div>
              <button
                className={`btn w-full font-semibold py-2 px-4 mb-2 rounded border-black ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                type="submit"
                disabled={loading}
              >
                {loading ? "Booking..." : "Book"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ExhibitionForm;
