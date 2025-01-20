import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const LeftSideNav = () => {
  const [artists, setArtists] = useState([]);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/artists')
      .then(res => res.json())
      .then(data => setArtists(data))
      .catch(error => console.log(error));
  }, []);

  const handleSearch = () => {
    if (searchText.trim()) {
      console.log('Search Text:', searchText); // Log the search text before encoding
      const encodedSearchText = encodeURIComponent(searchText);
      console.log('Encoded Search Text:', encodedSearchText); // Log the encoded search text
      const searchUrl = `/search?query=${encodedSearchText}`;
      console.log('Navigating to:', searchUrl); // Log the final URL before navigating
      navigate(searchUrl);
    }
  };


  return (
    <div className='space-y-6 '>
      <section className='ml-2'>
        <label className="input input-bordered flex items-center gap-2">
          <input
            id="search-field"
            type="text"
            className="grow"
            placeholder="Search photos..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <FaSearch />
        </label>
        <div className="mt-2 flex justify-center">
          <button onClick={handleSearch} className="btn">Search</button>
        </div>
      </section>
      <div className='ps-4'>
        {artists.map(artist => (
          <p key={artist._id}>
            <li className='flex lg:flex-row flex-col items-center gap-2  '>
              <Link to={`/artists/${artist.id}`} className='lg:inline-block hover:bg-gray-300 m-2 p-2 rounded-lg'>
                {artist.name}
              </Link >
            </li>
          </p>
        ))}
      </div>
    </div>
  );
};

export default LeftSideNav;
