import React, { useEffect, useState } from "react";
import PhotoItem from "../../Shared/PhotoItem/PhotoItem";

const PopularPhoto = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/photo')
      .then(res => res.json())
      .then(data => setPhotos(data))
      
  }, [])

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 my-10">
      {photos.length > 0 ? (
        photos.map((item) => <PhotoItem key={item._id} item={item} />)
      ) : (
        <p className="text-center text-gray-500">No photos available.</p>
      )}
    </div>
  );
};

export default PopularPhoto;
