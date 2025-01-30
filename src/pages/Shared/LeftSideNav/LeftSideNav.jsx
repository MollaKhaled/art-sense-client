import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlus } from "react-icons/fa6";

const LeftSideNav = () => {
  const [artists, setArtists] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const navigate = useNavigate();
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    fetch('https://art-sense-server.vercel.app/artists')
      .then(res => res.json())
      .then(data => setArtists(data))
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    fetch('https://art-sense-server.vercel.app/years')
      .then(res => res.json())
      .then(data => {
        
        const sortedYears = Array.isArray(data) ? data.sort((a, b) => a - b) : [];
        setYears(sortedYears);
      })
      .catch(error => {
        console.log("Error fetching years:", error);
        setYears([]);
      });
  }, []);


  useEffect(() => {
    fetch('https://art-sense-server.vercel.app/prices')
      .then((res) => res.json())
      .then((data) => {
        // Safely process prices
        const sortedPrices = Array.isArray(data)
          ? data
              .map((price) => {
                if (typeof price !== 'string') return null; // Ensure price is a string
                const numericPrice = parseFloat(price.replace(/[^0-9.-]+/g, ''));
                return isNaN(numericPrice) ? null : numericPrice;
              })
              .filter((price) => price !== null) // Remove null or invalid prices
              .sort((a, b) => a - b) // Sort numerically
              .map((price) => `BDT ${price.toLocaleString()}`) // Format back as 'BDT <value>'
          : [];
  
        setPrices(sortedPrices); // Update state with sorted prices
      })
      .catch((error) => {
        console.error('Error fetching prices:', error);
        setPrices([]); // Set an empty array on error
      });
  }, []);
  




  const handleSearch = () => {
    if (searchText.trim()) {
      const encodedSearchText = encodeURIComponent(searchText);
      const searchUrl = `/search?query=${encodedSearchText}`;
      navigate(searchUrl);
    }
  };

  const handlePriceChange = (event) => {
    // Clean the price: Remove 'BDT' and commas
    const cleanPrice = event.target.value.replace(/\s|,/g, '').replace('BDT', '');
    setSelectedPrice(cleanPrice);
    navigate(`/search?price=${cleanPrice}`);  // Send the cleaned price
  };
  
  const handleYearChange = (year) => {
    setSelectedYear(year);
    navigate(`/search?year=${year}`); // Navigate with the selected year
  };

  return (
    <div className='space-y-6'>
      <section className=''>
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

      {/* Artist Dropdown */}
      <div>
        <h1 className='font-semi-bold  mb-2 text-[24px]'>Filter by</h1>
        <div className="divider"></div>
        <div className="dropdown w-full">
          <div
            tabIndex={0}
            role="button"
            className="btn w-full flex items-center justify-between gap-2"
          >
            <span>Artist</span>
            <FaPlus />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-full p-2 shadow"
          >
            {artists.map(artist => (
              <li key={artist._id}>
                <Link
                  to={`/artists/${artist.artistId}`}
                  className="hover:bg-gray-300 p-2 rounded-lg block"
                >
                  {artist.artist}
                
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Price Dropdown */}
      <div>
        <div className="dropdown w-full">
          <div
            tabIndex={0}
            role="button"
            className="btn w-full flex items-center justify-between gap-2"
          >
            <span>Price</span>
            <FaPlus />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-full p-2 shadow"
          >
            {prices.map((price, index) => (
              <li key={index}>
                <button
                  value={price}
                  onClick={handlePriceChange}
                  className="hover:bg-gray-300 p-2 rounded-lg block"
                >
                  {price}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Year Dropdown */}
      <div>
        <div className="dropdown w-full ">
          <div
            tabIndex={0}
            role="button"
            className="btn w-full flex items-center justify-between gap-2"
          >
            <span>Year</span>
            <FaPlus />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-full p-2 shadow"
          >
            {Array.isArray(years) && years.length > 0 ? (
              years.map((year, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleYearChange(year)} // Handle year selection
                    className="hover:bg-gray-300 p-2 rounded-lg block"
                  >
                    {year}
                  </button>
                </li>
              ))
            ) : (
              <li>No years available</li>
            )}
          </ul>
        </div>
      </div>

    </div>
  );
};

export default LeftSideNav;
