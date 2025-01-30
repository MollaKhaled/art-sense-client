import React, { useEffect, useState } from 'react';
import PopularExhibitionCard from '../PopularExhibitionCard/PopularExhibitionCard';
import Banner from '../Exhibition/Banner';
import { Helmet } from 'react-helmet-async';

const Exhibition = () => {
  const [exhibition, setExhibition] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    fetch("https://art-sense-server.vercel.app/exhibition")
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch exhibitions');
        }
        return res.json();
      })
      .then(data => {
        setExhibition(data);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        setError(error.message); // Set error message in case of fetch failure
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Helmet>
        <title>artsense | Exhibition</title>
      </Helmet>

      <div className='pt-8'>
        <Banner />
      </div>

      <div className="my-10">
        {loading ? (
          // Display a loading spinner while data is being fetched
          <div className="flex justify-center items-center h-screen">
            <span className="loading loading-spinner text-error"></span>
          </div>
        ) : error ? (
          // Display error message if fetch fails
          <div className="text-center text-red-500">
            <p>Error: {error}</p>
          </div>
        ) : exhibition.length > 0 ? (
          // Display exhibitions if data exists
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
            {exhibition.map((item) => (
              <PopularExhibitionCard key={item._id} item={item} />
            ))}
          </div>
        ) : (
          // Display message if no data is available
          <div className="text-center text-gray-500">
            <p>No exhibitions available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Exhibition;
