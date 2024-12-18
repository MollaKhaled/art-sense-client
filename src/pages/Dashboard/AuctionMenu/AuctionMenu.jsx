import React from 'react';
import useAuctionMenu from '../../../hooks/useAuctionMenu';
import AuctionMenuCategory from './AuctionMenuCategory/AuctionMenuCategory';

const AuctionMenu = () => {
  const[auctionMenu] = useAuctionMenu();
  const auctionA = auctionMenu.filter(item =>item.auctionCategory === 'ASA1');
  const auctionB = auctionMenu.filter(item =>item.auctionCategory === 'ASA2');
  const auctionC = auctionMenu.filter(item =>item.auctionCategory === 'ASA3');
  const auctionD = auctionMenu.filter(item =>item.auctionCategory === 'ASA4');
  const auctionE = auctionMenu.filter(item =>item.auctionCategory === 'ASA5');
  return (
    <div className='gap-4'>
      <h1 className='text-center font-bold'>AuctionA</h1>
      <AuctionMenuCategory items={auctionA}></AuctionMenuCategory>
      <h1 className='text-center font-bold'>AuctionB</h1>
      <AuctionMenuCategory items={auctionB}></AuctionMenuCategory>
      <h1 className='text-center font-bold'>AuctionC</h1>
      <AuctionMenuCategory items={auctionC}></AuctionMenuCategory>
      <h1 className='text-center font-bold'>AuctionD</h1>
      <AuctionMenuCategory items={auctionD}></AuctionMenuCategory>
      <h1 className='text-center font-bold'>AuctionE</h1>
      <AuctionMenuCategory items={auctionE}></AuctionMenuCategory>
    </div>
  );
};

export default AuctionMenu;