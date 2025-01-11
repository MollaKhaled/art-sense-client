import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const LeftSideNav = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/photo')
      .then(res => res.json())
      .then(data => setPhotos(data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <h2>All Category: {photos.length}</h2>
      <div className='ps-4'>
        {photos.map(photo => (
          <p key={photo.id}>
            <Link to={`/photo/${photo.artist}`} className='text-decoration-none text-black'>
              {photo.artist}
              
            </Link>
          </p>
        ))}
      </div>
    </div>
  );
};

export default LeftSideNav;
