import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file


const img_hosting_token = import.meta.env.VITE_Image_Upload_Token;

const AddAuction = () => {
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  // date range handler
  const handleDates = (item) => {
    console.log(item)
    setDates([item.selection]);
  };

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
          const { artist,birth,lotId,lotDetails, title, media, size, year,  stockCode, minEstimateBid, maxEstimateBid, bid, auctionCategory } = data;

          // Combine the range as a single string
          const estimateBid = `${minEstimateBid}-${maxEstimateBid}`;
  
          // Extract individual start and end dates
          const startDate = dates[0].startDate;
          const endDate = dates[0].endDate;
          const newItem = {
            artist, title, media, size,birth,lotId,lotDetails,auctionCategory,
            year: parseFloat(year),
            bid: parseFloat(bid),
            estimateBid, // Store as a string like "20000-50000"
            dates: dates,
            startDate: { startDate },
            endDate: { endDate },

            stockCode, photoUrl: imgURL
          };
          console.log(newItem);
          axiosSecure.post('/auction', newItem)
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
        <title>artsense | AddAuction</title>
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
                <span className="label-text-alt font-semibold">Birth*</span>
              </div>
              <input type="text" placeholder="birth"
                {...register("birth", { required: true, maxLength: 120 })}
                className="input input-bordered w-full " />
            </div>
            <div className="form-control w-full ml-4 mb-4 ">
              <div className="label">
                <span className="label-text-alt font-semibold">Lot ID*</span>
              </div>
              <input type="text" placeholder="Lot Id"
                {...register("lotId", { required: true, maxLength: 120 })}
                className="input input-bordered w-full " />
            </div>
            
          </div>
          <div className="form-control w-full  mb-4 ">
              <div className="label">
                <span className="label-text-alt font-semibold">Lot Details*</span>
              </div>
              <textarea type="text" placeholder="Lot Details"
                {...register("lotDetails", { required: true, maxLength: 500})}
                className="textarea textarea-bordered h-52 " />
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
                <span className="label-text-alt font-semibold">Year*</span>
              </div>
              <input type="number" placeholder="year"
                {...register("year", { required: true, maxLength: 120 })}
                className="input input-bordered w-full " />
            </div>

          </div>
          <div className="form-control w-full mb-4 ">
          <div className="label">
                <span className="label-text-alt font-semibold">bid*</span>
              </div>
              <input type="number" placeholder="bid" {...register("bid", { required: true, maxLength: 120 })} className="input input-bordered w-full " />
                 
            </div>
          <div className="flex">
            <div className="form-control w-full mb-4">
              <div className="label">
                <span className="label-text-alt font-semibold">Minimum Estimate Bid*</span>
              </div>
              <input
                type="number"
                placeholder="Minimum bid"
                {...register("minEstimateBid", { required: true })}
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control w-full ml-4 mb-4">
              <div className="label">
                <span className="label-text-alt font-semibold">Maximum Estimate Bid*</span>
              </div>
              <input
                type="number"
                placeholder="Maximum bid"
                {...register("maxEstimateBid", { required: true })}
                className="input input-bordered w-full"
              />
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
          <div className="form-control w-full mb-4 ">
            <div className="label">
              <span className="label-text-alt font-semibold">Auction Category*</span>
            </div>
            <input type="text" placeholder="Auction Category"
              {...register("auctionCategory", { required: true, maxLength: 120 })}
              className="input input-bordered w-full " />
          </div>
          <div className='space-y-1'>
            <label htmlFor='location' className='block text-gray-600'>
              Select Availability Range
            </label>
            <DateRange
              rangeColors={['#F43F5E']}
              editableDateInputs={true}
              onChange={item => handleDates(item)}
              moveRangeOnFirstSelection={false}
              ranges={dates}
              minDate={(new Date())}

            />
          </div>


          <div className="form-control w-full ">
            <div className="label">
              <span className="label-text font-semibold mb-4 ">Item Image*</span>
            </div>
            <input type="file" {...register("image", { required: true })} className="file-input file-input-bordered w-full " />
          </div>

          <input className='btn btn-sm mt-4 font-semibold' type="submit" value="Add Auction" />
        </form>

      </div>
    </>
  );
};

export default AddAuction;