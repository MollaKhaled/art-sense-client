import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';

const AllInquireRow = ({inquire, handleDelete}) => {
  const {_id, artId, customerName, email, phone, address, comments} = inquire;
 
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
          <div className="rounded h-12 w-12">
            <img
              src="https://img.daisyui.com/images/profile/demo/2@94.webp"
              alt="Avatar Tailwind CSS Component" />
          </div>
        </div>
      </div>
    </td>
    <td>{_id}</td>
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