import {
  createBrowserRouter,

} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import PhotoDetails from "../pages/Home/PhotoDetails/PhotoDetails";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import ProductCard from "../pages/ProductCard/ProductCard";
import Dashboard from "../Layout/Dashboard";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AddItem from "../pages/Dashboard/AddItem/AddItem";
import AdminRoute from "./AdminRoute";
import About from "../pages/Home/About/About";
import Services from "../pages/Home/Services/Services";
import Inquire from "../pages/Home/Inquire/Inquire";
import AllInquire from "../pages/Dashboard/AllInquire/AllInquire";
import Exhibition from "../pages/Exhibition/Exhibition";
import ExhibitionModal from "../pages/Shared/ExhibitionModal/ExhibitionModal";
import BookingModal from "../pages/Shared/BookingModal/BookingModal";
import AddEvent from "../pages/Dashboard/AddEvent/AddEvent";
import Event from "../pages/Home/Event/Event";
import Auction from "../pages/Auction/Auction";
import AuctionDetails from "../pages/AuctionDetails/AuctionDetails";
import AddAuction from "../pages/Dashboard/AddAuction/AddAuction";
import AddExhibitionNavbar from "../pages/Dashboard/AddExhibitionNavbar/AddExhibitionNavbar";
import AddAuctionNavbar from "../pages/Dashboard/AddAuctionNavbar/AddAuctionNavbar";
import AllExhibitionNavbar from "../pages/Dashboard/AllExhibitionNavbar/AllExhibitionNavbar";
import AllAuctionNavbar from "../pages/Dashboard/AllAuctionNavbar/AllAuctionNavbar";
import AuctionMenu from "../pages/Dashboard/AuctionMenu/AuctionMenu";
import AllBider from "../pages/Dashboard/AllAuctionNavbar/AllBider/AllBider";
import AllAuctionMenu from "../pages/Dashboard/AllAuctionMenu/AllAuctionMenu";


export const router = createBrowserRouter([
  {
    path: "/",
    element:<Main></Main>,
    children:[
      {
        path:"/",
        element:<Home></Home>,
        loader:() =>fetch('http://localhost:3000/photoCount'),
      },
      {
        path:'/login',
        element:<Login/>
      },
      {
        path:'/signup',
        element:<SignUp/>
      },
      {
        path:'/auction',
        element:<Auction/>
      },
      {
        path:'/auction/:id',
        element:<AuctionDetails/>
      },
      {
        path:'/exhibition',
        element:<Exhibition/>,
        
      },
      {
        path:'/photoCount',
        element:<BookingModal/>,
       

      },
      {
        path:'/about',
        element:<About></About>,
      },
      {
        path:'/services',
        element:<Services></Services>,
      },
      {
        path:'/event',
        element:<Event></Event>,
      },
      {
        path:'/inquire/:id',
        element:<Inquire></Inquire>,
        loader:({params}) =>fetch(`http://localhost:3000/photo/${params.id}`)
      },
      {
        path:'/product/:id',
        element:<ProductCard/>,
      },
      {
        path:'/users/:id',
        element:<AllUsers></AllUsers>,
      },
    ]
  },
  {
    path:'dashboard',
    element:<AdminRoute><Dashboard></Dashboard></AdminRoute>,
    children: [
      {
        path:'addItem',
        element:<AddItem></AddItem>,
      },
      {
        path:'users',
        element:<AllUsers></AllUsers>,
      },
      {
        path:'allInquire',
        element:<AllInquire></AllInquire>
      },
      {
        path:'addEvent',
        element:<AddEvent/>
      },
      {
        path:'addAuction',
        element:<AddAuction/>
      },
      {
        path:'addExhibitionNavbar',
        element:<AddExhibitionNavbar/>
      },
      {
        path:'addAuctionNavbar',
        element:<AddAuctionNavbar/>
      },
      {
        path:'allExhibitionNavbar',
        element:<AllExhibitionNavbar/>
      },
      {
        path:'allExhibitionNavbar/:id',
        element:<AllExhibitionNavbar/>
      },
      {
        path:'allAuctionNavbar',
        element:<AllAuctionNavbar/>
      },
      {
        path:'allAuctionNavbar/:id',
        element:<AllAuctionNavbar/>
      },
      {
        path:'auctionMenu',
        element:<AuctionMenu/>
      },
      {
        path:'allAuctionMenu',
        element:<AllAuctionMenu/>
      },
      {
        path:'bid',
        element:<AllBider/>
      },
      
    ]
  }
]);