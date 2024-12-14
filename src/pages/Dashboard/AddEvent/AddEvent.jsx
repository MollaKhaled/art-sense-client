import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';


const img_hosting_token = import.meta.env.VITE_Image_Upload_Token;

const AddEvent = () => {
  const [axiosSecure] = useAxiosSecure()
  const { register, handleSubmit, reset } = useForm();
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`

  const onSubmit = data => {

    const formData = new FormData();
    formData.append('image', data.image[0])

    fetch(img_hosting_url, {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(imgResponse => {
        if (imgResponse.success) { // Correct variable: `imgResponse`
          const imgURL = imgResponse.data.display_url;
          const { title, description, press } = data;
          const newItem = {
            title,
            press,
            description,
            photoUrl: imgURL,
          };
          console.log(newItem);
          axiosSecure.post('/event', newItem)
            .then(data => {
              console.log('After posting photo item', data.data);
              if (data.data.insertedId) {
                reset();
                Swal.fire({
                  position: "top",
                  icon: "success",
                  title: "Item added successfully",
                  showConfirmButton: false,
                  timer: 1500
                });
              }
            });
        }
      });


  };

  return (
    <>
      <Helmet>
        <title>artsense | AddEvent</title>
      </Helmet>
      <div className='w-full p-10'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex'>
            <div className="form-control w-full mb-4 ">
              <div className="label">
                <span className="label-text-alt font-semibold"></span>
              </div>
              <input type="text" placeholder="Title"
                {...register("title", { required: true, maxLength: 120 })}
                className="input input-bordered w-full " />
            </div>
            <div className="form-control w-full ml-4 mb-4 ">
              <div className="label">
                <span className="label-text-alt font-semibold"></span>
              </div>
              <input type="text" placeholder="Press Release"
                {...register("press", { required: true, maxLength: 120 })}
                className="input input-bordered w-full " />
            </div>
          </div>
          <div className="form-control w-full mb-4">
            <div className="label">
              <span className="label-text-alt font-semibold"></span>
            </div>
            <textarea
              placeholder="Description"
              {...register("description", { required: true, maxLength: 500 })}
              className="textarea textarea-bordered w-full h-36"
            ></textarea>
          </div>
          

          <div className="form-control w-full ">
            <div className="label">
              <span className="label-text font-semibold mb-4 ">Item Image*</span>
            </div>
            <input type="file"  {...register("image", { required: true })} className="file-input file-input-bordered w-full " />
          </div>
          <input className='btn btn-sm mt-4 font-semibold' type="submit" value="Add Event" />
        </form>
      </div>
    </>
  );
};

export default AddEvent;