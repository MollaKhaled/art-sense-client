import React from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import CategoryCard from '../CategoryCard/CategoryCard';


const Category = () => {
  const { id } = useParams();
  const artistPhotos = useLoaderData(); // Load data from the loader
  console.log(artistPhotos);
  return (
    <>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {
          artistPhotos.map(photo => <CategoryCard
            key={photo._id}
            photo={photo}
          >
          </CategoryCard>)
        }

      </div>
    </>

  );
};

export default Category;

