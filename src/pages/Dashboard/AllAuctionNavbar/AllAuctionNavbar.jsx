import { useQuery } from '@tanstack/react-query';

import { Helmet } from 'react-helmet-async';
import { FaTrashAlt } from 'react-icons/fa';
import { FaTrash, FaUserShield } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';

const AllAuctionNavbar = () => {
  const [axiosSecure] = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [removes,setRemove] = useState([]);
  const {data: users =[], refetch} = useQuery({ queryKey: ['users'], queryFn: async () => {
      const res = await axiosSecure.get('/AuctionNavbar');
      return res.data;
    }
  });
  const handleDelete = (id) =>{
    const proceed = confirm('Are you sure you want to delete')
    if(proceed){
      fetch(`http://localhost:3000/auctionNavbar/${id}`,{
        method:'DELETE'
      })
      .then(res=>res.json())
      .then(data => {
        console.log(data);
        if(data.deletedCount > 0){
          alert('deleted successful')
          const remaining = removes.filter(remove => remove._id !== id);
          setRemove(remaining)
        }
        
      })
        
    }
  }



  return (
    <div className='w-full'>
      <Helmet>
        <title>artsense | All Auction Navbar</title>
      </Helmet>
      <h3 className='text-3xl font-semibold m-4'>Total Photo:{users.length}</h3>
      <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr className="bg-base-200">
        <th>#</th>
        <th>Image</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
   
   {
      users.map((user, index) => <tr
      key={user._id}
      >
        <th>{index + 1}</th>
        <td>
          <img src={user.photoUrl} alt="" />
        </td>
        <td><button onClick={() => handleDelete(user._id)} className='btn btn-ghost bg-red-600 text-white'><FaTrashAlt /></button></td>
      </tr>)
     }

     
     
    </tbody>
  </table>
</div>
    </div>
  );
};

export default AllAuctionNavbar;