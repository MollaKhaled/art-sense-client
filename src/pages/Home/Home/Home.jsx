import React from 'react';
import PopularPhoto from '../popularPhoto/popularPhoto';
import { Helmet } from 'react-helmet-async';

const Home = () => {
  return (
   <>
    <Helmet>
        <title>artsense</title>
      </Helmet>
    <div>
      <PopularPhoto></PopularPhoto>
    </div>
   </>
  );
};

export default Home;