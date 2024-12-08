import { useParams } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import { useContext } from "react";
import Swal from "sweetalert2";
import useCart from "../../../hooks/useCart";
import { Helmet } from "react-helmet-async";

const Inquire = () => {
  const { id, photoUrl } = useParams();
  const { user } = useContext(AuthContext);
  const [cart, refetch] = useCart();
  const handleBookService = (event) => {
    event.preventDefault();
    const form = event.target;
    const id = form.id.value;
    const name = form.name.value;
    const email = user?.email;
    const phone = form.phone.value;
    const address = form.address.value;
    const comments = form.comments.value;
    const inquire = {
      artId: id,
      customerName: name,
      email,
      phone,
      address,
      comments,
    }
    console.log(inquire);
    fetch(`https://art-sense-server.vercel.app/inquire`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(inquire)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.insertedId) {

          Swal.fire({
            position: "center",
            icon: "success",
            title: `Inquire Moving forward`,
            showConfirmButton: false,
            timer: 1500,
          });
          form.reset();
          refetch();
        }



        else {
          Swal.fire({
            title: "You are not Logged In",
            text: "Please login for Inquire !",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, login!",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate('/login', { state: { from: location } });
            }
          });
        }
      })
  }
  return (
    <>
      <Helmet>
        <title>artsense | All Inquire</title>
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">

        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
          <form onSubmit={handleBookService} className="card-body p-6 sm:p-8 md:p-10">
            <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-gray-700">
              Book Service: {id}
            </h2>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-semibold text-gray-600">*Id</span>
              </label>
              <input
                type="text"
                name="id"
                placeholder="Id"
                className="input input-bordered"
                defaultValue={id}
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text font-semibold text-gray-600">*Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text font-semibold text-gray-600">*Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text font-semibold text-gray-600">*Phone</span>
                  </label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text font-semibold text-gray-600">Address</span>
                  </label>
                  <textarea
                    name="address"
                    placeholder="Address"
                    className="textarea textarea-bordered h-28 resize-none"
                    required
                  ></textarea>
                </div>
              </div>
              {/* Right Column */}
              <div>
                <div className="form-control h-full ">
                  <label className="label ">
                    <span className="label-text font-semibold text-gray-600">Comments</span>
                  </label>
                  <textarea
                    name="comments"
                    placeholder="Comments"
                    className="textarea textarea-bordered h-full resize-none"
                    required
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <input
                className="btn btn-error text-white font-bold py-1 px-3 rounded text-xs w-auto"
                type="submit"
                value="Submit"
              />
            </div>
          </form>
        </div>
      </div>
    </>

  );
};

export default Inquire;