import React, { useEffect, useState } from 'react';
import AuctionCard from '../AuctionCard/AuctionCard';
import AuctionBanner from './AuctionBanner';
import { Helmet } from 'react-helmet-async';
import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlus, FaMinus } from "react-icons/fa6";

const Auction = () => {
  const [auctionPhoto, setAuctionPhoto] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
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
    fetch('http://localhost:3000/auction')
      .then((res) => res.json())
      .then((data) => {
        setAuctionPhoto(data);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch(() => setLoading(false)); // Handle fetch errors gracefully
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/auctionArtists')
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
    fetch('http://localhost:3000/auctionYears')
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
    fetch('http://localhost:3000/auctionPrices')
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
      const searchUrl = `/auctionSearch?query=${encodedSearchText}`;
      navigate(searchUrl);
    }
  };

  const handlePriceChange = (event) => {
    // Clean the price: Remove 'BDT' and commas
    const cleanPrice = event.target.value.replace(/\s|,/g, '').replace('BDT', '');
    setSelectedPrice(cleanPrice);
    navigate(`/auctionSearch?price=${cleanPrice}`);  // Send the cleaned price
  };





  const handleYearChange = (year) => {
    setSelectedYear(year);
    navigate(`/auctionSearch?year=${year}`); // Navigate with the selected year
  };

  return (
    <>
      <Helmet>
        <title>artsense | Auction</title>
      </Helmet>

      <div className='pt-8'>
        <AuctionBanner />
      </div>

      <div className="my-10 grid grid-cols-1 lg:grid-cols-4 gap-4 text-sm">
        {/* Left Sidebar (Search & Filter) */}
        <div className="lg:col-span-1 space-y-6 p-4 md:p-6">
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
          <div className="space-y-3 mt-6">
            <h1 className="text-lg md:text-xl mt-2 ">Filter by</h1>
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
                        to={`/auctionArtists/${artist._id}`}
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
        </div>





        {/* Main Content (Auction Items) */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="flex justify-center items-center h-screen">
              <span className="loading loading-spinner text-error"></span>
            </div>
          ) : auctionPhoto.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16 mt-8">
              {auctionPhoto.map((item) => (
                <AuctionCard key={item._id} item={item} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No auctions available at the moment.</p>
          )}
        </div>
      </div>
    </>

  );
};

export default Auction;
