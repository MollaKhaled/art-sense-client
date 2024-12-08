import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import AllInquireRow from './AllInquireRow';
import useCart from '../../../hooks/useCart';
import { Helmet } from 'react-helmet-async';

const AllInquire = () => {
  const { user } = useContext(AuthContext);
  const [inquires, setInquire] = useState([]);
  const [cart, refetch] = useCart();
  useEffect(() => {
    fetch(`http://localhost:3000/inquire`)
      .then(res => res.json())
      .then(data => setInquire(data))
  }, []);
  const handleDelete = id =>{
    const proceed = confirm('Are you sure you want to delete')
    if(proceed){
      fetch(`http://localhost:3000/inquire/${id}`,{
        method:'DELETE'
      })
      .then(res=>res.json())
      .then(data => {
        console.log(data);
        if(data.deletedCount > 0){
          alert('deleted successful')
          const remaining = inquires.filter(inquire => inquire._id !== id);
            setInquire(remaining)
        }
        
      })
        
    }
  }
  return (
  <>
  <Helmet>
        <title>artsense | AllInquire</title>
      </Helmet>
    <div>
      <h2>all inquire:{inquires.length}</h2>
      <div className="overflow-x-auto w-full">
  <table className="table w-full ">
    {/* head */}
    <thead className='bg-gray-500'>
      <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <th>Photo</th>
        <th>Id</th>
        <th>Name</th>
        <th>Email</th>
        <th>phone</th>
        <th>address</th>
        <th>comments</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
        {
          inquires.map(inquire =><AllInquireRow
          key={inquire._id}
          inquire={inquire}
          handleDelete={handleDelete}
          ></AllInquireRow>)
        }
     
    </tbody>
   
  </table>
</div>
    </div>
  </>
  );
};

export default AllInquire;