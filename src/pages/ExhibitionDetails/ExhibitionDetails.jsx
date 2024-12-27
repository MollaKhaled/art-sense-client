import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLoaderData } from 'react-router-dom';
import ExhibitionForm from '../ExhibitionForm/ExhibitionForm';

// Utility function to convert numbers to words
const numberToWords = (num) => {
  const a = [
    '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
    'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen',
    'eighteen', 'nineteen',
  ];
  const b = [
    '', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety',
  ];
  const inWords = (n) => {
    if (n < 20) return a[n];
    if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? ' ' + a[n % 10] : '');
    if (n < 1000) return a[Math.floor(n / 100)] + ' hundred' + (n % 100 ? ' and ' + inWords(n % 100) : '');
    if (n < 1000000) return inWords(Math.floor(n / 1000)) + ' thousand' + (n % 1000 ? ' ' + inWords(n % 1000) : '');
    return inWords(Math.floor(n / 1000000)) + ' million' + (n % 1000000 ? ' ' + inWords(n % 1000000) : '');
  };
  return num === 0 ? 'zero' : inWords(num);
};

const ExhibitionDetails = () => {
  const loadedExhibitionData = useLoaderData();

  // Destructure price and discount from the loaded data
  const { price = 0, discount = 0, photoUrl, title, artworkId, artist, media, size, year, lotDetails } = loadedExhibitionData;

  // Calculate grand total
  const grandTotal = price - discount;
  const grandTotalInWords = numberToWords(grandTotal);

  return (
    <>
      <Helmet>
        <title>artsense | Exhibition details</title>
      </Helmet>
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 p-4 lg:p-8">
        {/* Image Section */}
        <div className="flex-1 relative lg:mt-8">
          <img
            src={photoUrl}
            alt={title}
            className="w-full h-auto shadow-lg"
          />
        </div>
        {/* Item Details Section */}
        <div>
          <h2>artwork id <span className='text-red-500'>{artworkId}</span></h2>
          <div className="divider" style={{ backgroundColor: 'black', height: '1px' }}></div>
          <h2 className="text-lg sm:text-xl lg:text-xl font-bold mb-2">{artist}</h2>
          <p className="text-sm sm:text-base">{title}</p>
          <p className="text-sm sm:text-base">{media}</p>
          <p className="text-sm sm:text-base">{size}</p>
          <p className="text-sm sm:text-base">{year}</p>
          
          {/* Pricing Section */}
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm sm:text-base">
              <span>Amount</span>
              <span>{price}</span>
            </div>
            <div className="divider" style={{ backgroundColor: 'black', height: '1px' }}></div>
           
            <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm sm:text-base font-bold">
              <span>Sub Total</span>
              <span>{price}</span>
            </div>
            </div>
            <div className="flex justify-between text-sm sm:text-base">
              <span>Special Honor</span>
              <span>{discount}</span>
            </div>
            
            <div className="flex justify-between text-sm sm:text-base font-bold">
              <span>Grand Total BDT</span>
              <span>{grandTotal}</span>
            </div>
            <div className="text-sm sm:text-base ">
              <span>In Words: </span>
              <span className='font-bold'>{grandTotalInWords.toUpperCase()}</span> BDT only
            </div>
          </div>

          {/* Booking Form */}
          <div className="mt-6">
            <h2 className='text-black mb-2 font-semibold'>Booking Form</h2>
            <ExhibitionForm />
          </div>
        </div>
      </div>
      
      {/* Notes Section */}
      <div className="p-4">
        <div className="divider" style={{ backgroundColor: 'black', height: '1px' }}></div>
        <h2 className="text-center font-semibold">Notes</h2>
        <div className="divider" style={{ backgroundColor: 'black', height: '1px' }}></div>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          {/* About Details Section */}
          <div className="w-full md:w-1/2">
            <h2 className="font-semibold">About Details</h2>
            <p className="text-sm sm:text-base">{lotDetails}</p>
          </div>

          {/* Additional Details Section */}
          <div className="w-full md:w-1/2">
            <p>Condition Report</p>
            <div className="divider" style={{ backgroundColor: 'black', height: '1px' }}></div>
            <p>History and Provenance</p>
            <div className="divider" style={{ backgroundColor: 'black', height: '1px' }}></div>
            <p>Shipping Information</p>
            <div className="divider" style={{ backgroundColor: 'black', height: '1px' }}></div>
            <p>Payment and Return Policies</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExhibitionDetails;
