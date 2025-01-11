import React from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import PhotoItem from '../../Shared/PhotoItem/PhotoItem';

const Category = () => {
  const { id,artist } = useParams(); 
  const categoryPhotos = useLoaderData(); // Load data from the loader
  console.log(categoryPhotos);
  return (
    <div>
      <h2>This is category: {artist}</h2>
      
    </div>
  );
};

export default Category;

