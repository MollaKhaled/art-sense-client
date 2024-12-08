import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FaBook, FaCartShopping, FaUsers, FaUtensils } from "react-icons/fa6";
import { FaCalendarAlt, FaHome, FaShoppingBag, FaUtensilSpoon, FaWallet } from 'react-icons/fa';
import { IoMenu } from 'react-icons/io5';
import { MdContactPhone } from 'react-icons/md';
import { Helmet } from 'react-helmet-async';
import useCart from '../hooks/useCart';
import useAdmin from '../hooks/useAdmin';


const Dashboard = () => {
  const [cart] = useCart();
  // TODO:load data from the server to have dynamic isAdmin based on data
  // const isAdmin = true;
  const [isAdmin] = useAdmin();


  return (
    <>
    <Helmet>
        <title>artsense | Dashboard</title>
      </Helmet>

      <div className="drawer lg:drawer-open ">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content ">
          
          <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
            Open drawer
          </label>
          <Outlet></Outlet>
        </div>
        <div className="drawer-side bg-[#D1A054]">
          <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu  w-80 p-4">
            {
              isAdmin ? <>
                <li><NavLink to='/dashboard/adminhome'><FaHome />Admin Home</NavLink></li>
                <li><NavLink to='/dashboard/addItem'><FaUtensils/> Add an Items</NavLink></li>
                <li><NavLink to='/dashboard/allInquire'><FaWallet />all Inquire
                </NavLink></li>
                <li><NavLink to='dashboard/payment'><FaBook />Manage Bookings</NavLink></li>
                <li><NavLink to='/dashboard/users'><FaUsers />All Users</NavLink></li>
              </> : <>
                <li><NavLink to='/dashboard/userhome'><FaHome />User Home</NavLink></li>
                <li><NavLink to='/dashboard/reservations'><FaCalendarAlt />reservations</NavLink></li>
                <li><NavLink to='/dashboard/mycart'><FaCartShopping></FaCartShopping>My Cart
                <span className="badge badge-secondary">+{cart?.length || 0}</span>
                </NavLink></li>
                <li><NavLink to='dashboard/payment'><FaWallet />Payment History</NavLink></li>
              </>
            }
            
            <div className="divider"></div>
            <li><NavLink to='/'><FaHome />Home</NavLink></li>
            <li><NavLink to='/menu'><IoMenu />Our Menu</NavLink></li>
            <li><NavLink to='/order/salad'><FaShoppingBag />Order Food</NavLink></li>
            <li><NavLink to='/contact'><MdContactPhone />Contact</NavLink></li>
          </ul>
        </div>
      </div>
    </>

  );
};

export default Dashboard;