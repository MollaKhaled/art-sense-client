import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SearchCard from "../SearchCard/SearchCard";

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();

  // Extract query parameters
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query");
  const year = searchParams.get("year");
  const price = searchParams.get("price");
  const media = searchParams.get("media");

  console.log("Full URL:", location.search);
  console.log("Query Params:", { query, year, price, media });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      // Construct URL with valid query parameters
      const params = new URLSearchParams();
      if (query) params.append("search", query);
      if (media) params.append("media", media);
      if (year) params.append("year", year);
      if (price) params.append("price", price);

      const searchUrl = `http://localhost:3000/searchPhotos?${params.toString()}`;

      try {
        const res = await fetch(searchUrl);
        const data = await res.json();
        setSearchResults(data);
      } catch (err) {
        setError("Error fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, year, price, media]);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm mt-12 min-h-screen">
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {searchResults.length > 0 ? (
        searchResults.map((photo) => <SearchCard key={photo._id} photo={photo} />)
      ) : (
        !loading && <p>No results found for "{query || media || year || price}"</p>
      )}
    </div>
  );
};

export default SearchPage;
