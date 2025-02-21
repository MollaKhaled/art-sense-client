import React, { useEffect, useState } from 'react';
import PopularExhibitionCard from '../PopularExhibitionCard/PopularExhibitionCard';
import Banner from '../Exhibition/Banner';
import { Helmet } from 'react-helmet-async';
import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlus, FaMinus } from "react-icons/fa6";

const Exhibition = () => {
  const [exhibition, setExhibition] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [artists, setArtists] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState("");
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [prices, setPrices] = useState([]);
  const [artistOpen, setArtistOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const [yearOpen, setYearOpen] = useState(false);

  // Toggle functions
  const toggleArtistDropdown = () => setArtistOpen(!artistOpen);
  const togglePriceDropdown = () => setPriceOpen(!priceOpen);
  const toggleYearDropdown = () => setYearOpen(!yearOpen);

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

  useEffect(() => {
    fetch('http://localhost:3000/exhibitionArtists') // Update to correct endpoint
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
    fetch('http://localhost:3000/exhibitionYears')
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
    fetch('http://localhost:3000/exhibitionPrices')
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
      const searchUrl = `/exhibitionSearch?query=${encodedSearchText}`;
      navigate(searchUrl);
    }
  };

  const handlePriceChange = (event) => {
    // Clean the price: Remove 'BDT' and commas
    const cleanPrice = event.target.value.replace(/\s|,/g, '').replace('BDT', '');
    setSelectedPrice(cleanPrice);
    navigate(`/exhibitionSearch?price=${cleanPrice}`);  // Send the cleaned price
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
    navigate(`/exhibitionSearch?year=${year}`); // Navigate with the selected year
  };

  return (
    <>
      <Helmet>
        <title>artsense | Exhibition</title>
      </Helmet>

      <div className="pt-8 pb-8">
        <Banner />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 text-sm ">
        {/* Left Sidebar (Search & Filter) */}
        <div className="lg:col-span-1 space-y-6 p-4 md:p-6">
          <section>
            <label className="input input-bordered flex items-center gap-2 w-full">
              <input
                id="search-field"
                type="text"
                className="grow text-sm md:text-base"
                placeholder="Search photos..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <FaSearch onClick={handleSearch} className="cursor-pointer" />
            </label>
            {/* Filters Section */}
            <div className="space-y-3 mt-6 ">
              <h1 className="text-lg md:text-xl mt-2">Filter by</h1>
              <div className="divider"></div>

              {/* Artist Dropdown */}
              <div className="relative text-sm">
                <button
                  onClick={toggleArtistDropdown}
                  className="btn w-full flex items-center justify-between gap-2"
                >
                  <span >Artist</span>
                  {artistOpen ? <FaMinus /> : <FaPlus />}
                </button>
                {artistOpen && (
                  <ul className="absolute left-0 w-full min-w-[200px] bg-base-100 rounded-box p-2 shadow-md z-50 text-sm">
                    {artists.map((artist) => (
                      <li key={artist._id}>
                        <Link
                          to={`/exhibitionArtists/${artist._id}`}
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
              <div className="relative">
                <button
                  onClick={togglePriceDropdown}
                  className="btn w-full flex items-center justify-between gap-2"
                >
                  <span>Price</span>
                  {priceOpen ? <FaMinus /> : <FaPlus />}
                </button>
                {priceOpen && (
                  <ul className="absolute left-0 w-full min-w-[200px] bg-base-100 rounded-box p-2 shadow-md z-50">
                    {prices.map((price, index) => (
                      <li key={index}>
                        <button
                          value={price}
                          onClick={handlePriceChange}
                          className="hover:bg-gray-300 p-2 rounded-lg block text-sm md:text-base"
                        >
                          {price}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Year Dropdown */}
              <div className="relative">
                <button
                  onClick={toggleYearDropdown}
                  className="btn w-full flex items-center justify-between gap-2"
                >
                  <span>Year</span>
                  {yearOpen ? <FaMinus /> : <FaPlus />}
                </button>
                {yearOpen && (
                  <ul className="absolute left-0 w-full min-w-[200px] bg-base-100 rounded-box p-2 shadow-md z-50">
                    {Array.isArray(years) && years.length > 0 ? (
                      years.map((year, index) => (
                        <li key={index}>
                          <button
                            onClick={() => handleYearChange(year)}
                            className="hover:bg-gray-300 p-2 rounded-lg block text-sm md:text-base"
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
          </section>
        </div>

        {/* Main Content (Exhibition Cards) */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="flex justify-center items-center h-screen">
              <span className="loading loading-spinner text-error"></span>
            </div>
          ) : error ? (
            <div className="text-center text-red-500">
              <p>Error: {error}</p>
            </div>
          ) : exhibition.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 text-sm">
              {exhibition.map((item) => (
                <PopularExhibitionCard key={item._id} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500">
              <p>No exhibitions available at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </>


  );
};

export default Exhibition;
