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
          
                <li><NavLink to='/'><FaHome />Admin Home</NavLink></li>
                <li><NavLink to='/dashboard/addItem'><FaBook /> Add an Items</NavLink></li>
                <li><NavLink to='/dashboard/addAuction'><FaBook /> Add an Auction</NavLink></li>
                <li><NavLink to='/dashboard/addEvent'><FaBook />Add Event</NavLink></li>
                <li><NavLink to='/dashboard/addExhibitionNavbar'><FaBook />Add Exhibition Navbar</NavLink></li>
                <li><NavLink to='/dashboard/addAuctionNavbar'><FaBook />Add Auction Navbar</NavLink></li>
                <li><NavLink to='/dashboard/users'><FaUsers />All Users</NavLink></li>
                <li><NavLink to='/dashboard/allInquire'><FaUsers />all Inquire
                </NavLink></li>
                <li><NavLink to='/dashboard/allExhibitionNavbar'><FaUsers />All Exhibition Navbar</NavLink></li>
                <li><NavLink to='/dashboard/allAuctionNavbar'><FaUsers />All Auction Navbar</NavLink></li>
                <li><NavLink to='/dashboard/auctionMenu'><FaUsers />Auction Menu</NavLink></li>
                <li><NavLink to='/dashboard/bid'><FaUsers />All Bider</NavLink></li>
          </ul>
        </div>
      </div>
    </>

  );
};

export default Dashboard;