import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const AuctionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Hook for programmatic navigation
  const [photos, setPhotos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedBid, setSelectedBid] = useState(null); // State to track the selected bid

  // Fetch photos and item data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const photosRes = await fetch("http://localhost:3000/auction");
        const photosData = await photosRes.json();
        setPhotos(photosData);

        // Set the initial index based on the current item ID
        const initialIndex = photosData.findIndex((photo) => photo._id === id);
        setCurrentIndex(initialIndex !== -1 ? initialIndex : 0);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  // Load selected bid from localStorage when component mounts
  useEffect(() => {
    const storedBid = localStorage.getItem("selectedBid");
    if (storedBid) {
      setSelectedBid(storedBid); // Set the selected bid from localStorage if it exists
    }
  }, []);

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      navigate(`/auction/${photos[prevIndex]._id}`); // Change URL to previous item
    }
  };

  const handleNext = () => {
    if (currentIndex < photos.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      navigate(`/auction/${photos[nextIndex]._id}`); // Change URL to next item
    }
  };

  const handleBidChange = (e) => {
    const newBid = e.target.value;
    setSelectedBid(newBid);

    // Save selected bid to localStorage
    localStorage.setItem("selectedBid", newBid);
  };

  // Generate bid options based on the item's current bid and estimated bid
  const generateBidOptions = (currentBid, estimateBid) => {
    const options = [];
    // Check if estimateBid is a range (e.g., "70000-100000")
    const [minEstimate, maxEstimate] = estimateBid.split("-").map(Number);
    if (currentBid && minEstimate && maxEstimate && currentBid < maxEstimate) {
      for (let bid = currentBid; bid <= maxEstimate; bid += 5000) {
        options.push(bid);
      }
    }
    return options;
  };

  if (photos.length === 0) {
    return <p>Loading auction data...</p>;
  }

  const currentItem = photos[currentIndex];
  const bidOptions = generateBidOptions(currentItem.bid, currentItem.estimateBid);

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 p-4 lg:p-8">
      {/* Previous Button outside Image */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
        <button
          className="bg-gray-200 text-gray-600 p-2 rounded-full hover:bg-gray-300 focus:outline-none disabled:opacity-50"
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          <IoIosArrowBack size={20} />
        </button>
      </div>

      {/* Image Section */}
      <div className="flex-1 relative">
        <img
          src={currentItem.photoUrl}
          alt={currentItem.title}
          className="w-full h-auto rounded-md shadow-lg"
        />
      </div>

      {/* Item Details Section */}
      <div className="flex-1 bg-white p-4 rounded-md shadow-lg">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2">
          {currentItem.artist}
        </h2>
        <p className="text-sm sm:text-base">Title: {currentItem.title}</p>
        <p className="text-sm sm:text-base">Media: {currentItem.media}</p>
        <p className="text-sm sm:text-base">Size: {currentItem.size}</p>
        <p className="text-sm sm:text-base">Stock Code: {currentItem.stockCode}</p>
        <p className="text-sm sm:text-base">
          Current Price: <span className="text-red-500">BDT {currentItem.bid}</span>
        </p>
        <p className="text-sm sm:text-base">Estimate: BDT {currentItem.estimateBid}</p>
        <p className="text-sm sm:text-base">Year: {currentItem.year}</p>
        <p className="text-sm sm:text-base">
          Ending:{" "}
          {currentItem.dates && currentItem.dates[0]?.endDate
            ? new Date(currentItem.dates[0].endDate).toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            : "No end date available"}
        </p>

        {/* Bid Select */}
        <div className="mt-4">
          <label className="block text-sm sm:text-base font-medium mb-2">Choose your maximum bid*</label>
          <select
            className="select select-bordered w-full max-w-xs"
            value={selectedBid || ""}
            onChange={handleBidChange}
          >
           
            {bidOptions.length > 0 ? (
              bidOptions.map((bid, index) => (
                <option key={index} value={bid}>
                  BDT {bid}
                </option>
              ))
            ) : (
              <option>No bid options available</option>
            )}
          </select>
        </div>
      </div>

      {/* Next Button outside Item Details Section */}
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10">
        <button
          className="bg-gray-200 text-gray-600 p-2 rounded-full hover:bg-gray-300 focus:outline-none disabled:opacity-50"
          onClick={handleNext}
          disabled={currentIndex === photos.length - 1}
        >
          <IoIosArrowForward size={20} />
        </button>
      </div>
    </div>
  );
};

export default AuctionDetails;
