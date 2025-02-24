import { useState, useEffect } from 'react';

const useArtworkSearchAndFilter = () => {
  const [artists, setArtists] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch artists
  useEffect(() => {
    fetch('http://localhost:3000/artworkArtists')
      .then(res => res.json())
      .then(data => {
        const sortedArtists = Array.isArray(data) 
          ? data.sort((a, b) => a.artist.localeCompare(b.artist)) 
          : [];
        setArtists(sortedArtists);
      })
      .catch(error => {
        console.error("Error fetching artists:", error);
        setError(error);
        setArtists([]);
      })
      .finally(() => setLoading(false));
  }, []);

  // Fetch years
  useEffect(() => {
    fetch('http://localhost:3000/years')
      .then(res => res.json())
      .then(data => {
        const sortedYears = Array.isArray(data) 
          ? data.sort((a, b) => a - b) 
          : [];
        setYears(sortedYears);
      })
      .catch(error => {
        console.error("Error fetching years:", error);
        setYears([]);
      });
  }, []);

  // Fetch prices
  useEffect(() => {
    fetch('http://localhost:3000/prices')
      .then(res => res.json())
      .then(data => {
        const sortedPrices = Array.isArray(data)
          ? data
              .map(price => {
                if (typeof price !== 'string') return null;
                const numericPrice = parseFloat(price.replace(/[^0-9.-]+/g, ''));
                return isNaN(numericPrice) ? null : numericPrice;
              })
              .filter(price => price !== null)
              .sort((a, b) => a - b)
              .map(price => `BDT ${price.toLocaleString()}`)
          : [];
        setPrices(sortedPrices);
      })
      .catch(error => {
        console.error("Error fetching prices:", error);
        setPrices([]);
      });
  }, []);

  return {
    artists,
    searchText,
    setSearchText,
    selectedPrice,
    setSelectedPrice,
    years,
    selectedYear,
    setSelectedYear,
    prices,
    loading,
    error
  };
};

export default useArtworkSearchAndFilter;