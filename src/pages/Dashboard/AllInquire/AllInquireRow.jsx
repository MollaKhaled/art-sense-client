import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';

const AllInquireRow = ({inquire, handleDelete}) => {
  const {_id, artId, customerName, email, phone, address, comments, stockCode} = inquire;
 
  return (
    <tr>
   
    <td>{stockCode}</td>
    <td>{customerName}</td>
    <td>{email}</td>
    <td>{phone}</td>
    <td>{address}</td>
    <td>{comments}</td>
    <td><button onClick={() => handleDelete(_id)} className='btn btn-ghost bg-red-600 text-white'><FaTrashAlt /></button></td>
  </tr>
  );
};

export default AllInquireRow;