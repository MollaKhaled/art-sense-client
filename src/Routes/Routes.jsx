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
import PrivateRoute from "./PrivateRoute";
import AuctionMenu from "../pages/Dashboard/AuctionMenu/AuctionMenu";
import AllBider from "../pages/Dashboard/AllAuctionNavbar/AllBider/AllBider";


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
        element:<PrivateRoute><AuctionDetails/></PrivateRoute>
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
    element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      {
        path:'addItem',
        element:<AdminRoute><AddItem></AddItem></AdminRoute>,
      },
      {
        path:'users',
        element:<AdminRoute><AllUsers></AllUsers></AdminRoute>,
      },
      {
        path:'allInquire',
        element:<AdminRoute><AllInquire></AllInquire></AdminRoute>
      },
      {
        path:'addEvent',
        element:<AdminRoute><AddEvent/></AdminRoute>
      },
      {
        path:'addAuction',
        element:<AdminRoute><AddAuction/></AdminRoute>
      },
      {
        path:'addExhibitionNavbar',
        element:<AdminRoute><AddExhibitionNavbar/></AdminRoute>
      },
      {
        path:'addAuctionNavbar',
        element:<AdminRoute><AddAuctionNavbar/></AdminRoute>
      },
      {
        path:'allExhibitionNavbar',
        element:<AdminRoute><AllExhibitionNavbar/></AdminRoute>
      },
      {
        path:'allExhibitionNavbar/:id',
        element:<AdminRoute><AllExhibitionNavbar/></AdminRoute>
      },
      {
        path:'allAuctionNavbar',
        element:<AdminRoute><AllAuctionNavbar/></AdminRoute>
      },
      {
        path:'allAuctionNavbar/:id',
        element:<AdminRoute><AllAuctionNavbar/></AdminRoute>
      },
      {
        path:'auctionMenu',
        element:<AdminRoute><AuctionMenu/></AdminRoute>
      },
      {
        path:'bid',
        element:<AdminRoute><AllBider/></AdminRoute>
      },
      
    ]
  }
]);