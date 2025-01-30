import { useState, useEffect } from "react";

const useBidCount = (lotId) => {
  const [bidCount, setBidCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBidCount = async () => {
      if (!lotId) return;

      try {
        setLoading(true);
        const response = await fetch(`https://art-sense-server.vercel.app/bid/${lotId}/bid-count`);
        const data = await response.json();
        setBidCount(data.bidCount || 0);
      } catch (error) {
        console.error("Error fetching bid count:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBidCount();
  }, [lotId]);

  const incrementBidCount = () => {
    setBidCount((prevCount) => prevCount + 1);
  };

  return { bidCount, incrementBidCount, loading };
};

export default useBidCount;
