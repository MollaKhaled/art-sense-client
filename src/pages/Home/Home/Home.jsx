import React from 'react';
import PopularPhoto from '../popularPhoto/popularPhoto';
import { Helmet } from 'react-helmet-async';
import LeftSideNav from '../../Shared/LeftSideNav/LeftSideNav';
import PhotoBanner from '../../Shared/PhotoItem/PhotoBanner';

const Home = () => {
  return (
   <>
    <Helmet>
        <title>artsense</title>
      </Helmet>
      <div className="pt-8 pb-8">
    <PhotoBanner/>
    </div>
    <div className='grid grid-cols-1 lg:grid-cols-4 gap-2'>
      <div>
        <LeftSideNav></LeftSideNav>
      </div>
      <div className='col-span-3'>
      <PopularPhoto></PopularPhoto>
      </div>
    </div>
   </>
  );
};

export default Home;