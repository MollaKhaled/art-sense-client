import { useQuery } from '@tanstack/react-query';

import { Helmet } from 'react-helmet-async';
import { FaTrashAlt } from 'react-icons/fa';

import Swal from 'sweetalert2';

import { useContext, useState } from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const AllBider = () => {
  const [axiosSecure] = useAxiosSecure();

  const [removes, setRemove] = useState([]);
  const { data: bid = [], refetch } = useQuery({
    queryKey: ['bid'],
    queryFn: async () => {
      const res = await axiosSecure.get('/bid');
      return res.data;
    },
  });

  // Sort the bid array by lotId in ascending order
  const sortedBid = [...bid].sort((a, b) => a.lotId - b.lotId);

  const handleDelete = (id) => {
    const proceed = confirm('Are you sure you want to delete');
    if (proceed) {
      fetch(`http://localhost:3000/bid/${id}`, {
        method: 'DELETE',
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.deletedCount > 0) {
            alert('deleted successful');
            const remaining = removes.filter((remove) => remove._id !== id);
            setRemove(remaining);
          }
        });
    }
  };

  return (
    <div className="w-full">
      <Helmet>
        <title>artsense | All Users</title>
      </Helmet>
      <h3 className="text-3xl font-semibold m-4">Total Bider: {bid.length}</h3>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-base-200">
              <th>#</th>
              <th>Lot ID</th>
              <th>Price</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedBid.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.lotId}</td>
                <td className="font-bold">BDT {user.bidAmount}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="btn btn-ghost bg-red-600 text-white"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBider;
