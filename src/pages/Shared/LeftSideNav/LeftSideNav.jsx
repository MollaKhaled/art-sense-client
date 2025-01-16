import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const LeftSideNav = () => {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/artists')
      .then(res => res.json())
      .then(data => setArtists(data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className='space-y-6'>
      <h2>All Artists: {artists.length}</h2>
      <div className='ps-4'>
        {artists.map(artist => (
          <p key={artist._id}>
            <NavLink to={`/artists/${artist.id}`}  className='lg:inline-block hover:bg-gray-300 p-2 '>
              {artist.name}
              
            </NavLink >
          </p>
        ))}
      </div>
    </div>
  );
};

export default LeftSideNav;
