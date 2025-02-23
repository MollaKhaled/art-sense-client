import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AuctionSearchCard from './AuctionSearchPageCard';

const AuctionSearchPage = () => {
    const [searchResults, setSearchResults] = useState([]);  // State to hold search results
    const [loading, setLoading] = useState(false);  // State for loading status
    const [error, setError] = useState(null);  // State for error message
    const location = useLocation();  // To access the URL query parameters

    // Helper function to extract URL parameters
    const getQueryParams = () => {
        const params = new URLSearchParams(location.search);
        return {
            query: params.get('query'),
            year: params.get('year'),
            price: params.get('price'),
            media: params.get('media'),
        };
    };

    const { query, year, price, media } = getQueryParams();  // Destructure the query parameters

    console.log('Full URL:', location.search);
    console.log('Query in frontend:', query);
    console.log('Year in frontend:', year);
    console.log('Price in frontend:', price);
    console.log('Media in frontend:', media);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);  // Set loading to true when starting to fetch
            setError(null);  // Clear any previous error messages

            // Initialize URLSearchParams for clean query string construction
            const searchParams = new URLSearchParams();

            // Add the available filters (query, year, price, media)
            if (query) searchParams.append('search', query);
            if (media) searchParams.append("media", media);
            if (year) searchParams.append('year', year);
            if (price) searchParams.append('price', price);

            const searchUrl = `https://art-sense-server.vercel.app/auctionSearchPhotos?${searchParams.toString()}`;

            try {
                const res = await fetch(searchUrl);  // Await the fetch response
                const data = await res.json();  // Parse the response as JSON
                setSearchResults(data);  // Set the fetched data as search results
            } catch (err) {
                console.error('Fetch error:', err);  // Log error for debugging
                setError('Error fetching data.');  // Handle any errors during the fetch
            } finally {
                setLoading(false);  // Set loading to false once the data is fetched or error occurs
            }
        };

        fetchData();  // Call the async function to fetch data

    }, [query, year, price, media]);
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm mt-12 min-h-screen">
            {loading && <p>Loading...</p>} {/* Show loading message while fetching data */}
            {error && <p>{error}</p>} {/* Show error message if any error occurs */}

            {/* Display search results if found, otherwise show 'No results found' */}
            {searchResults.length > 0 ? (
                searchResults.map((photo) => (
                    <AuctionSearchCard key={photo._id} photo={photo} />  // Display each photo's data
                ))
            ) : (
                !loading && <p>No results found for "{query || year || price || media}"</p>  // Show message if no results and not loading
            )}
        </div>
    );
};

export default AuctionSearchPage;
