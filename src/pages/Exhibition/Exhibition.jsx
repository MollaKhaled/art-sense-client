import React, { useEffect, useState } from 'react';
import PopularExhibitionCard from '../PopularExhibitionCard/PopularExhibitionCard';
import Banner from '../Exhibition/Banner';
import LoadingSpinner from '../Shared/LoadingSpinner/LoadingSpinner';


const Exhibition = () => {
  const [exhibition, setExhibition] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    fetch("http://localhost:3000/exhibition")
      .then(res => res.json())
      .then(data => {
        setExhibition(data);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch(() => setLoading(false)); // Handle any fetch errors
  }, []);

  return (
    <div>
      <Banner />
      <div className="my-10">
        {loading ? (
          // Display a loading spinner while data is being fetched
          <div className="flex justify-center items-center h-screen">
            <LoadingSpinner />
          </div>
        ) : exhibition.length > 0 ? (
          // Display exhibitions if data exists
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {exhibition.map((item) => (
              <PopularExhibitionCard key={item._id} item={item} />
            ))}
          </div>
        ) : (
          // Display message if no data is available
          <p className="text-center text-gray-500"><LoadingSpinner /></p>
        )}
      </div>
    </div>
  );
};

export default Exhibition;
