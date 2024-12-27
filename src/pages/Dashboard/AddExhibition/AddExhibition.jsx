import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';


const img_hosting_token = import.meta.env.VITE_Image_Upload_Token;

const AddExhibition = () => {
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
          const { artist, title, media, size, year, price, stockCode,discount,artworkId } = data;
          const newItem = {
            artworkId , artist, title, media, size,
            year: parseFloat(year),
            price: parseFloat(price),
            discount: parseFloat(discount),
            stockCode, photoUrl: imgURL
          };
          console.log(newItem);
          axiosSecure.post('/exhibition', newItem)
            .then(data => {
              console.log('After posting photo item', data.data);
              if (data.data.insertedId) {
                reset();
                Swal.fire({
                  position: "top",
                  icon: "success",
                  title: "Exhibition Item added successfully",
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
        <title>artsense | AddExhibition</title>
      </Helmet>
      <div className='w-full p-10'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex'>
            <div className="form-control w-full mb-4 ">
              <div className="label">
                <span className="label-text-alt font-semibold">Artist*</span>
              </div>
              <input type="text" placeholder="Artist"
                {...register("artist", { required: true, maxLength: 120 })}
                className="input input-bordered w-full " />
            </div>
            <div className="form-control w-full ml-4 mb-4 ">
              <div className="label">
                <span className="label-text-alt font-semibold">Title*</span>
              </div>
              <input type="text" placeholder="title"
                {...register("title", { required: true, maxLength: 120 })}
                className="input input-bordered w-full " />
            </div>
          </div>
          <div className='flex'>
            <div className="form-control w-full mb-4 ">
              <div className="label">
                <span className="label-text-alt font-semibold">Media*</span>
              </div>
              <input type="text" placeholder="media"
                {...register("media", { required: true, maxLength: 120 })}
                className="input input-bordered w-full " />
            </div>
            <div className="form-control w-full ml-4 mb-4 ">
              <div className="label">
                <span className="label-text-alt font-semibold">Size*</span>
              </div>
              <input type="text" placeholder="size"
                {...register("size", { required: true, maxLength: 120 })}
                className="input input-bordered w-full " />
            </div>
          </div>
          <div className='flex'>
            <div className="form-control w-full mb-4 ">
              <div className="label">
                <span className="label-text-alt font-semibold">Price*</span>
              </div>
              <input type="number" placeholder="price"
                {...register("price", { required: true, maxLength: 120 })}
                className="input input-bordered w-full " />
            </div>
            <div className="form-control w-full ml-4 mb-4 ">
              <div className="label">
                <span className="label-text-alt font-semibold">Special discount*</span>
              </div>
              <input type="number" placeholder="special discount"
                {...register("discount", { required: true, maxLength: 120 })}
                className="input input-bordered w-full " />
            </div>
          </div>
          <div className='flex'>
            <div className="form-control w-full mb-4 ">
              <div className="label">
                <span className="label-text-alt font-semibold">Artwork id*</span>
              </div>
              <input type="number" placeholder="Artwork id"
                {...register("artworkId", { required: true, maxLength: 120 })}
                className="input input-bordered w-full " />
            </div>
            <div className="form-control w-full ml-4 mb-4 ">
              <div className="label">
                <span className="label-text-alt font-semibold">Year*</span>
              </div>
              <input type="text" placeholder="year"
                {...register("year", { required: true, maxLength: 120 })}
                className="input input-bordered w-full " />
            </div>
          </div>
          <div className="form-control w-full mb-4 ">
            <div className="label">
              <span className="label-text-alt font-semibold">StockCode*</span>
            </div>
            <input type="text" placeholder="stockCode"
              {...register("stockCode", { required: true, maxLength: 120 })}
              className="input input-bordered w-full " />
          </div>
          <div className="form-control w-full ">
            <div className="label">
              <span className="label-text font-semibold mb-4 ">Item Image*</span>
            </div>
            <input type="file" {...register("image", { required: true })} className="file-input file-input-bordered w-full " />
          </div>
          <input className='btn btn-sm mt-4 font-semibold' type="submit" value="Add Item" />
        </form>
      </div>
    </>
  );
};

export default AddExhibition;