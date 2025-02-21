import React from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import AuctionCategoryCard from './AuctionCategoryCard';


const AuctionCategory = () => {
  const { id } = useParams();
  const artistPhotos = useLoaderData(); // Load data from the loader

  console.log("Loaded artist photos:", artistPhotos); // Debugging: Check the received data

  if (!artistPhotos) {
    return <p>No photos found for this artist.</p>; // Handle empty or missing data
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm mt-12 min-h-screen">
      {
        artistPhotos.length > 0 ? (
          artistPhotos.map(photo => (
            <AuctionCategoryCard key={photo._id} photo={photo} />
          ))
        ) : (
          <p>No photos found for this artist.</p>
        )
      }
    </div>
  );
};

export default AuctionCategory;