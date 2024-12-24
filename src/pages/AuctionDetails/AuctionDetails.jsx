import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";
import LoadingSpinner from "../Shared/LoadingSpinner/LoadingSpinner";


const AuctionDetails = () => {
  const { user } = useContext(AuthContext)
  const { id } = useParams();
  const navigate = useNavigate(); // Hook for programmatic navigation
  const [photos, setPhotos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedBid, setSelectedBid] = useState(null); // State to track the selected bid
  const [bidCount, setBidCount] = useState(0);
  const [loading, setLoading] = useState(true);


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

        // Fetch bid count for the current photo using lotId
        const currentLotId = photosData[currentIndex]?.lotId;
        if (currentLotId) {
          const bidCountRes = await fetch(`http://localhost:3000/bid/${currentLotId}/bid-count`);
          const bidCountData = await bidCountRes.json();
          setBidCount(bidCountData.bidCount);  // Set bid count
          setLoading(false);  // Set loading to false once data is fetched
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);
  // Update bid count when the current item changes
  // Fetch bid count when currentIndex changes
  useEffect(() => {
    const fetchBidCount = async () => {
      if (photos.length > 0 && photos[currentIndex]?.lotId) {
        setLoading(true);
        try {
          const currentLotId = photos[currentIndex]?.lotId;
          const bidCountRes = await fetch(
            `http://localhost:3000/bid/${currentLotId}/bid-count`
          );
          const bidCountData = await bidCountRes.json();
          setBidCount(bidCountData.bidCount || 0);
        } catch (error) {
          console.error("Error fetching bid count:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchBidCount();
  }, [currentIndex, photos]);

  // Load selected bid from localStorage when component mounts
  useEffect(() => {
    const storedBid = localStorage.getItem("selectedBid");
    if (storedBid) {
      setSelectedBid(storedBid); // Set the selected bid from localStorage if it exists

    }
  }, []);
  const handlePlaceBid = async () => {
    if (!user) {
      Swal.fire("Warning", "You need to be logged in to place a bid", "warning");
      navigate("/login", { replace: true });
      return;
    }
    if (!selectedBid) {
      Swal.fire("Error", "Please select a bid amount", "error");
      return;
    }

    const bidData = {
      bidAmount: selectedBid,
      email: user?.email,
      lotId: photos[currentIndex]?.lotId,  // Use lotId for the specific photo
    };

    try {
      const response = await fetch("http://localhost:3000/bid", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bidData),
      });

      const result = await response.json();

      if (response.ok && result.insertedId) {
        Swal.fire("Success", "Bid placed successfully!", "success");
        setBidCount(bidCount + 1);  // Increment bid count locally
      } else {
        Swal.fire("Error", result.message || "Failed to place bid. Try again!", "error");
      }
    } catch (error) {
      console.error("Error placing bid:", error);
      Swal.fire("Error", "An error occurred. Try again!", "error");
    }
  };
  if (photos.length === 0) {
    return <p><LoadingSpinner /></p>;
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      navigate(`/auction/${photos[prevIndex]._id}`, { replace: true }); // Change URL to previous item
    }
  };

  const handleNext = () => {
    if (currentIndex < photos.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      navigate(`/auction/${photos[nextIndex]._id}`, { replace: true }); // Change URL to next item
    }
  };

  const handleBidChange = (e) => {
    const newBid = e.target.value;
    setSelectedBid(newBid);

    // // Save selected bid to localStorage
    // localStorage.setItem("selectedBid", newBid);
  };

  // Generate bid options based on the item's current bid and estimated bid
  const generateBidOptions = (currentBid, estimateBid) => {
    if (!currentBid || !estimateBid) {
      return [];
    }

    // Extract minimum and maximum estimates from the string
    const [minEstimate, maxEstimate] = estimateBid.split("-").map(Number);

    if (!minEstimate || !maxEstimate || currentBid >= maxEstimate) {
      return [];
    }

    // Generate bid options with an increment of 5000 or adjust as needed
    const increment = 5000;
    const options = [];
    let bid = Math.max(currentBid, minEstimate);

    while (bid <= maxEstimate) {
      options.push(bid);
      bid += increment;
    }
    return options;
  };


  const currentItem = photos[currentIndex];
  const bidOptions = generateBidOptions(currentItem.bid, currentItem.estimateBid);

  return (
    <>
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
        <div className="flex-1 relative lg:mt-8">
          <img
            src={currentItem.photoUrl}
            alt={currentItem.title}
            className="w-full h-auto shadow-lg"
          />
        </div>

        {/* Item Details Section */}
        <div className="flex-1 p-2 pl-4 rounded-md ">
          <div className="divider"></div>
          <h2 className="text-lg sm:text-xl lg:text-xl font-bold mb-2">
            {currentItem.artist}
          </h2>
          <p className="text-sm sm:text-base text-gray-400">{currentItem.birth}</p>
          <div className="divider"></div>
          <p className="text-sm sm:text-base"> {currentItem.title}</p>
          <p className="text-sm sm:text-base"> {currentItem.media}</p>
          <p className="text-sm sm:text-base"> {currentItem.size}</p>
          <p className="text-sm sm:text-base"> {currentItem.year}</p>


          <div className="divider"></div>
          <p className="text-sm sm:text-base">
            Lot ID: <span className="text-red-500">{currentItem.lotId}</span>
          </p>
          <div className="divider"></div>
          <p className="text-sm sm:text-base ">
            Ending: {" "}
            {currentItem.dates && currentItem.dates[0]?.endDate
              ? new Date(currentItem.dates[0].endDate).toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
               
              })
              : "No end date available"}
          </p>
          <div className="divider"></div>
          <p className="text-sm sm:text-base">Estimate: <span >BDT {currentItem.estimateBid}</span></p>
          <div className="divider"></div>
          <p className="text-sm sm:text-base">
            Current Bid: <span className="text-red-500">BDT {currentItem.bid}</span>
          </p>
          <p className="text-sm sm:text-base ">
            <span className="text-green-500 ml-24">{bidCount} Bids</span>
          </p>
          <div className="divider"></div>
          {/* Bid Select */}
          <div className="mt-4">
            <label className="block text-sm sm:text-base font-medium mb-2 text-red-500">
              Choose your maximum bid*
            </label>
            <select
              className="select select-bordered w-full max-w-xs"
              value={selectedBid || ""}
              onChange={handleBidChange}
            >
              <option value="">Select a bid</option>
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
          <p className="text-sm sm:text-base text-gray-400">*This amount excludes shipping fees</p>
          <div>
            <button className="btn w-1/2 mt-4" onClick={handlePlaceBid}>
              Place Bid
            </button>
          </div>
          <div>
            <button className="btn btn-outline mt-4 w-1/2">ADD TO WATCH LIST</button>
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

        <div></div>
      </div>
      <div className="p-4">
        <div className="divider"></div>
        <h2 className="text-center font-semibold">Lot Details</h2>
        <div className="divider"></div>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          {/* About Details Section */}
          <div className="w-full md:w-1/2">
            <h2 className="font-semibold">About Details</h2>
            <p className="text-sm sm:text-base"> {currentItem.lotDetails}</p>
          </div>

          {/* Additional Details Section */}
          <div className="w-full md:w-1/2">
            <p>Condition Report</p>
            <div className="divider"></div>
            <p>History and Provenance</p>
            <div className="divider"></div>
            <p>Shipping Information</p>
            <div className="divider"></div>
            <p>Payment and Return Policies</p>
          </div>
        </div>
      </div>

    </>

  );
};

export default AuctionDetails;