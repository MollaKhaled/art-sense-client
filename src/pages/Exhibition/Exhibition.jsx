import React, { useEffect, useState } from 'react';
import PopularExhibitionCard from '../PopularExhibitionCard/PopularExhibitionCard';
import Banner from '../Exhibition/Banner';

const Exhibition = ({item}) => {
  const [exhibition, setExhibition] = useState([]);
 
  useEffect(() => {
    fetch("http://localhost:3000/exhibition")
      .then(res => res.json())
      .then(data => setExhibition(data))
  }, [])
  return (
    <div>
      <Banner/>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 my-10">
      {exhibition.length > 0 ? (
        exhibition.map((item) => <PopularExhibitionCard key={item._id} item={item} />)
      ) : (
        <p className="text-center text-gray-500">No photos available.</p>
      )}
    </div>
    </div>
  );
};

export default Exhibition;