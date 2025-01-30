import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SearchCard from '../SearchCard/SearchCard';

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);  // State to hold search results
  const [loading, setLoading] = useState(false);  // State for loading status
  const [error, setError] = useState(null);  // State for error message
  const location = useLocation();  // To access the URL query parameters
  
  // Extract 'query', 'year', and 'price' from URL
  const query = new URLSearchParams(location.search).get('query');
  const year = new URLSearchParams(location.search).get('year');
  const price = new URLSearchParams(location.search).get('price');
  
  console.log('Full URL:', location.search);  // Log the full URL to check if 'price' is present
  console.log('Query in frontend:', query);
  console.log('Year in frontend:', year);
  console.log('Price in frontend:', price);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);  // Set loading to true when starting to fetch
      setError(null);  // Clear any previous error messages

      let searchUrl = `https://art-sense-server.vercel.app/searchPhotos`;

      // Construct the URL based on available filters (query, year, price)
      if (query) {
        searchUrl += `?search=${query}`;
      }
      if (year) {
        searchUrl += query ? `&year=${year}` : `?year=${year}`;
      }
      if (price) {
        searchUrl += query || year ? `&price=${price}` : `?price=${price}`;
      }

      try {
        const res = await fetch(searchUrl);  // Await the fetch response
        const data = await res.json();  // Parse the response as JSON
        setSearchResults(data);  // Set the fetched data as search results
      } catch (err) {
        setError('Error fetching data.');  // Handle any errors during the fetch
      } finally {
        setLoading(false);  // Set loading to false once the data is fetched or error occurs
      }
    };

    fetchData();  // Call the async function to fetch data

  }, [query, year, price]);  // The effect runs whenever the 'query', 'year', or 'price' changes

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 min-h-screen">
      {loading && <p>Loading...</p>} {/* Show loading message while fetching data */}
      {error && <p>{error}</p>} {/* Show error message if any error occurs */}

      {/* Display search results if found, otherwise show 'No results found' */}
      {searchResults.length > 0 ? (
        searchResults.map((photo) => (
          <SearchCard key={photo._id} photo={photo} />  // Display each photo's data
        ))
      ) : (
        !loading && <p>No results found for "{query || year || price}"</p>  // Show message if no results and not loading
      )}
    </div>
  );
};

export default SearchPage;