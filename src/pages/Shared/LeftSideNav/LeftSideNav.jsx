import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlus, FaMinus } from "react-icons/fa6";
import { Button } from '@headlessui/react';

const LeftSideNav = () => {
  const [artists, setArtists] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const navigate = useNavigate();
  const [prices, setPrices] = useState([]);


  const [artistOpen, setArtistOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const [yearOpen, setYearOpen] = useState(false);

  // Toggle functions
  const toggleArtistDropdown = () => setArtistOpen(!artistOpen);
  const togglePriceDropdown = () => setPriceOpen(!priceOpen);
  const toggleYearDropdown = () => setYearOpen(!yearOpen);

  useEffect(() => {
    fetch('https://art-sense-server.vercel.app/artists')
      .then(res => res.json())
      .then(data => {
        // Sort alphabetically by artist name
        const sortedArtists = Array.isArray(data) ? data.sort((a, b) => a.artist.localeCompare(b.artist)) : [];
        setArtists(sortedArtists);
      })
      .catch(error => {
        console.log("Error fetching artists:", error);
        setArtists([]);
      });
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
    <div className="space-y-6  p-4 md:p-6">
      {/* Search Section */}
      <section>
        <label className="input input-bordered flex items-center gap-2 w-full">
          <input
            id="search-field"
            type="text"
            className="grow text-sm md:text-base"
            placeholder="Search by Artist or Title..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <FaSearch onClick={handleSearch} className="cursor-pointer" />
        </label>
      </section>

      {/* Filters Section */}
      <div >
        <h1 className="text-lg md:text-xl">Filter by</h1>
        <div className="divider h-0.5"></div>

        {/* Artist Dropdown */}
        <div className="relative text-sm mb-2">
          <Button
           variant="primary"
            onClick={toggleArtistDropdown}
            className=" w-full flex items-center justify-between gap-2"
          >
            <span className="text-sm">Artist</span>
            {artistOpen ? <FaMinus /> : <FaPlus />}
          </Button>
          {artistOpen && (
            <ul className="absolute left-0 w-full min-w-[200px] bg-base-100 rounded-box p-2 shadow-md z-50 text-sm ">
              {artists.map((artist) => (
                <li key={artist._id}>
                  <Link
                    to={`/artists/${artist.artistId}`}
                    className="block p-2 hover:bg-gray-200"
                  >
                    {artist.artist}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Price Dropdown */}
        <div className="relative text-sm mb-2">
          <Button
          variant="primary"
            onClick={togglePriceDropdown}
            className=" w-full flex items-center justify-between gap-2"
          >
            <span>Price</span>
            {priceOpen ? <FaMinus /> : <FaPlus />}
          </Button>
          {priceOpen && (
            <ul className="absolute left-0 w-full min-w-[200px] bg-base-100 rounded-box p-2 shadow-md z-50 text-sm">
              {prices.map((price, index) => (
                <li key={index}>
                  <button
                    value={price}
                    onClick={handlePriceChange}
                    className="block p-2 hover:bg-gray-200"
                  >
                    {price}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Year Dropdown */}
        < div className="relative text-sm mb-2">
          <Button
            variant="primary"
            onClick={toggleYearDropdown}
            className="w-full flex items-center justify-between gap-2"
          >
            <span>Year</span>
            {yearOpen ? <FaMinus /> : <FaPlus />}
          </Button>
          {yearOpen && (
            <ul className="absolute left-0 w-full min-w-[200px] bg-base-100 rounded-box p-2 shadow-md z-50 text-sm">
              {Array.isArray(years) && years.length > 0 ? (
                years.map((year, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleYearChange(year)}
                      className="block p-2 hover:bg-gray-200"
                    >
                      {year}
                    </button>
                  </li>
                ))
              ) : (
                <li className="text-gray-500 text-sm">No years available</li>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>

  );
};

export default LeftSideNav;
