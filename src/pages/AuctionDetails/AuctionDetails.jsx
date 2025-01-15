import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";
import { Helmet } from "react-helmet-async";
import useBidCount from "../../hooks/useBidCount";
import useRemainingTime from "../../hooks/useRemainingTime";



const AuctionDetails = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedBid, setSelectedBid] = useState(null);
  const [loading, setLoading] = useState(true);

  const currentItem = photos[currentIndex];
  const { lotId } = currentItem || {};
  const { bidCount, incrementBidCount, loading: bidCountLoading } = useBidCount(lotId);
  const remainingTime = useRemainingTime(currentItem?.dates?.[0]?.endDate);


  // Fetch photos and item data
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch("http://localhost:3000/auction");
        const data = await response.json();
        setPhotos(data);

        const initialIndex = data.findIndex((photo) => photo._id === id);
        setCurrentIndex(initialIndex !== -1 ? initialIndex : 0);
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    fetchPhotos();
  }, [id]);

  // Load selected bid from localStorage when component mounts
  useEffect(() => {
    const storedBid = localStorage.getItem("selectedBid");
    if (storedBid) {
      setSelectedBid(parseInt(storedBid, 10)); // Parse as integer
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
    // Format the selected bid as 'BDT <amount>'
    const formattedBid = `BDT ${selectedBid.toLocaleString()}`;
    const bidData = {
      bidAmount: formattedBid,
      email: user?.email,
      lotId,
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
        incrementBidCount(); // Update bid count using the hook

        // Reset selectedBid state and localStorage after successful bid
        setSelectedBid(null); // Reset state
        localStorage.removeItem("selectedBid"); // Remove from localStorage
      } else {
        Swal.fire("Error", result.message || "Failed to place bid. Try again!", "error");
      }
    } catch (error) {
      console.error("Error placing bid:", error);
      Swal.fire("Error", "An error occurred. Try again!", "error");
    }
  };

  if (photos.length === 0) {
    return <div className="flex justify-center items-center h-screen">
      <span className="loading loading-spinner text-error"></span>
    </div>;
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
    const newBid = parseInt(e.target.value, 10); // Convert to integer
    setSelectedBid(newBid);
    localStorage.setItem("selectedBid", newBid); // Store in localStorage
  };

  // Generate bid options based on the item's current bid and estimated bid
  const generateBidOptions = (currentBid, estimateBid, selectedBid) => {
    try {
      // Validate estimateBid input
      if (!estimateBid || typeof estimateBid !== "string") {
        console.error("Invalid estimateBid:", estimateBid);
        return [];
      }

      // Remove "BDT" and split the range
      const [minEstimateStr, maxEstimateStr] = estimateBid
        .replace(/BDT/g, "") // Remove "BDT"
        .split("-")
        .map((str) => str.replace(/,/g, "").trim()); // Remove commas and whitespace

      // Convert the cleaned strings to numbers
      const minEstimate = parseFloat(minEstimateStr);
      const maxEstimate = parseFloat(maxEstimateStr);

      // Validate the parsed estimates
      if (
        isNaN(minEstimate) ||
        isNaN(maxEstimate) ||
        minEstimate <= 0 ||
        maxEstimate <= 0 ||
        minEstimate >= maxEstimate
      ) {
        console.error("Invalid parsed estimates:", { minEstimate, maxEstimate });
        return [];
      }

      // Default currentBid to minEstimate if undefined or invalid
      const validCurrentBid = typeof currentBid === "number" && currentBid > 0 ? currentBid : minEstimate;

      // If currentBid exceeds maxEstimate, no bids are valid
      if (validCurrentBid >= maxEstimate) {
        console.warn("Current bid exceeds max estimate:", validCurrentBid);
        return [];
      }

      // Generate bid options
      const increment = 5000;
      const options = [];
      let bid = Math.max(validCurrentBid, minEstimate); // Start from max(currentBid, minEstimate)

      // If selectedBid is held by the local host, prevent it from appearing in the options
      while (bid <= maxEstimate) {
        if (bid !== selectedBid) {
          options.push(bid);
        }
        bid += increment;
      }

      // Check if the selected bid is within the valid range
      if (!options.includes(selectedBid) && selectedBid > 0 && selectedBid <= maxEstimate) {
        options.push(selectedBid); // Add the held bid if it's valid but excluded
      }

      return options;
    } catch (error) {
      console.error("Error in generateBidOptions:", error);
      return [];
    }
  };

  const bidOptions = generateBidOptions(currentItem?.bid, currentItem?.estimateBid, selectedBid);


  return (
    <>
      <Helmet>
        <title>artsense | auction details</title>
      </Helmet>
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
          <div className="">
            <p className="text-sm sm:text-base flex">
              lot id <p className="ml-20 text-red-500">{currentItem.lotId}</p>
            </p>
            <div className="divider"></div>
            <div>
              <p className="text-sm sm:text-base flex ">
                Ending: {" "}
                <p className="ml-14" >
                  {currentItem.dates && currentItem.dates[0]?.endDate
                    ? new Date(currentItem.dates[0].endDate).toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",

                    })
                    : "No end date available"}
                </p>

              </p>
              {remainingTime && (
                <p className="text-sm sm:text-base ml-28 text-gray-500">
                  {remainingTime}
                </p>
              )}
            </div>
            <div className="divider"></div>
            <p className="text-sm sm:text-base flex">Estimate: <p className="ml-12" >{currentItem.estimateBid}</p></p>
            <div className="divider"></div>
            <p className="text-sm sm:text-base flex">
              Open Bid: <p className="text-red-500 ml-8">{currentItem.bid}</p>
            </p>
            <p className="text-sm sm:text-base ">
              <span className="text-green-500 ml-32">{bidCount} Bids</span>
            </p>
          </div>
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
                    BDT {bid.toLocaleString()} {/* Format bid with commas */}
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