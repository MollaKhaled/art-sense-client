import React, { useEffect, useState } from "react";
import PhotoItem from "../../Shared/PhotoItem/PhotoItem";




const PopularPhoto = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    fetch('https://art-sense-server.vercel.app/photo')
      .then((res) => res.json())
      .then((data) => {
        setPhotos(data);
        setLoading(false); // Set loading to false after fetching data
      })
      .catch(() => setLoading(false)); // Handle errors and ensure spinner stops
  }, []);

  return (
    <>
    <div className="my-10">
      {loading ? (
        // Show spinner while data is being fetched
        <div className="flex justify-center items-center h-screen">
         <span className="loading loading-spinner text-error"></span>
        </div>
      ) : photos.length > 0 ? (
        // Show photos if available
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
          {photos.map((item) => (
            <PhotoItem className='text-sm' key={item._id} item={item} />
          ))}
        </div>
      ) : (
        // Show message if no photos are available
        <p className="text-center text-gray-500">No photos available at the moment.</p>
      )}
    </div>
    </>
  );
};

export default PopularPhoto;
