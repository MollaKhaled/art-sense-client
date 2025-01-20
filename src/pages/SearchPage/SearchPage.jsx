import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SearchCard from '../SearchCard/SearchCard';

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);  // State to hold search results
  const [loading, setLoading] = useState(false);  // State for loading status
  const [error, setError] = useState(null);  // State for error message
  const location = useLocation();  // To access the URL query parameters
  const query = new URLSearchParams(location.search).get('query');  // Extract 'query' from URL
  console.log('Query in frontend:', query);
  useEffect(() => {
    if (query) {
      setLoading(true);  // Set loading to true when the search query is present
      setError(null);  // Clear any previous error messages
  
      // Fetch the search results from the backend
      fetch(`http://localhost:3000/searchPhotos?search=${query}`)
        .then((res) => res.json())
        .then((data) => {
          setSearchResults(data);  // Set the fetched data as search results
          setLoading(false);  // Set loading to false once data is fetched
        })
        .catch((err) => {
          setError('Error fetching data.');  // Handle any errors during the fetch
          setLoading(false);  // Set loading to false even on error
        });
    }
  }, [query]);  // The effect runs whenever the 'query' changes (from the URL)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {loading && <p>Loading...</p>} {/* Show loading message while fetching data */}
      {error && <p>{error}</p>} {/* Show error message if any error occurs */}

      {/* Display search results if found, otherwise show 'No results found' */}
      {searchResults.length > 0 ? (
        searchResults.map((photo) => (
          <SearchCard key={photo._id} photo={photo} />  // Display each photo's data
        ))
      ) : (
        !loading && <p>No results found for "{query}"</p>  // Show message if no results and not loading
      )}
    </div>
  );
};

export default SearchPage;
