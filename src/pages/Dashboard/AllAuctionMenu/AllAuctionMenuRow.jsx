import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';

const AllAuctionMenuRow = ({auction, handleDelete}) => {
  const {_id, artId, customerName, email, phone, address, comments,photoUrl} = auction;
 
  return (
    <tr>
    <th>
      <label>
        <input type="checkbox" className="checkbox" />
      </label>
    </th>
    <td>
      <div className="flex items-center gap-3">
        <div className="avatar">
          <div className="rounded h-36 w-36">
            <img
              src={photoUrl}
              alt="auctionPhoto" />
          </div>
        </div>
      </div>
    </td>
   
   
    
    <td><button onClick={() => handleDelete(_id)} className='btn btn-ghost bg-red-600 text-white'><FaTrashAlt /></button></td>
  </tr>
  );
};

export default AllAuctionMenuRow;