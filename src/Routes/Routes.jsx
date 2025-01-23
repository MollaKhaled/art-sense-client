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
import AddNavbar from "../pages/AddNavbar/AddNavbar";
import AllPhotoNavbar from "../pages/AllPhotoNavbar/AllPhotoNavbar";
import ExhibitionDetails from "../pages/ExhibitionDetails/ExhibitionDetails";
import AddExhibition from "../pages/Dashboard/AddExhibition/AddExhibition";
import AllExhibition from "../pages/Dashboard/AllExhibition/AllExhibition";
import AllExhibitionBooked from "../pages/Dashboard/AllExhibitionBooked/AllExhibitionBooked";
import AllPhoto from "../pages/Dashboard/AllPhoto/AllPhoto";
import Category from "../pages/Home/Category/Category";
import TotalPhoto from "../pages/Dashboard/TotalPhoto/TotalPhoto";
import AddTotalPhoto from "../assets/dashboard/AddTotalPhoto/AddTotalPhoto";
import AddArtist from "../pages/Dashboard/AddArtist/AddArtist";
import AllArtists from "../pages/Dashboard/AllArtists/AllArtists";
import SearchPage from "../pages/SearchPage/SearchPage";
import AllServices from "../assets/dashboard/AllServices/AllServices";




export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader: () => fetch('http://localhost:3000/photoCount'),
      },
      {
        path: '/artists/:id',
        element: <Category />,
        loader:({params}) => fetch(`http://localhost:3000/artists/${params.id}`)
        
      },
      
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <SignUp />
      },
      {
        path: '/auction',
        element: <Auction />
      },
      {
        path: '/auction/:id',
        element: <AuctionDetails />
      },
      {
        path: '/exhibition',
        element: <Exhibition />,

      },
      {
        path: '/exhibition/:id',
        element: <ExhibitionDetails />,
        loader: ({ params }) => fetch(`http://localhost:3000/exhibition/${params.id}`)

      },
      {
        path: '/photoCount',
        element: <BookingModal />,


      },
      {
        path: '/about',
        element: <About></About>,
      },
      {
        path: '/services',
        element: <Services></Services>,
      },
      {
        path: '/event',
        element: <Event></Event>,
      },
      {
        path: '/inquire/:id',
        element: <Inquire></Inquire>,
        loader: ({ params }) => fetch(`http://localhost:3000/photo/${params.id}`)
      },
      {
        path: '/product/:id',
        element: <ProductCard />,
      },
      {
        path: '/users/:id',
        element: <AllUsers></AllUsers>,
      },
      {
        path: '/search',
        element: <SearchPage/>
      },
    ]
  },
  {
    path: 'dashboard',
    element: <AdminRoute><Dashboard></Dashboard></AdminRoute>,
    children: [
      {
        path: 'addItem',
        element: <AddItem></AddItem>,
      },
      {
        path: 'addNavbar',
        element: <AddNavbar />
      },
      {
        path: 'allPhoto',
        element: <AllPhoto />
      },
      {
        path: 'allPhotoNavbar',
        element: <AllPhotoNavbar />
      },
      {
        path: 'users',
        element: <AllUsers></AllUsers>,
      },
      {
        path: 'allInquire',
        element: <AllInquire></AllInquire>
      },
      {
        path: 'addEvent',
        element: <AddEvent />
      },
      {
        path: 'addAuction',
        element: <AddAuction />
      },
      {
        path: 'addAuctionNavbar',
        element: <AddAuctionNavbar />
      },
      {
        path: 'addExhibition',
        element: <AddExhibition />
      },

      {
        path: 'addExhibitionNavbar',
        element: <AddExhibitionNavbar />
      },
      {
        path: 'allExhibition',
        element: <AllExhibition />
      },
      {
        path: 'allExhibitionBooked',
        element: <AllExhibitionBooked />
      },


      {
        path: 'allExhibitionNavbar',
        element: <AllExhibitionNavbar />
      },
      {
        path: 'allExhibitionNavbar/:id',
        element: <AllExhibitionNavbar />
      },
      {
        path: 'allAuctionNavbar',
        element: <AllAuctionNavbar />
      },
      {
        path: 'allAuctionNavbar/:id',
        element: <AllAuctionNavbar />
      },
      {
        path: 'auctionMenu',
        element: <AuctionMenu />
      },
      {
        path: 'allAuctionMenu',
        element: <AllAuctionMenu />
      },
      {
        path: 'bid',
        element: <AllBider />
      },
      {
        path: 'totalPhoto',
        element: <TotalPhoto />
      },
      {
        path: 'addTotalPhoto',
        element: <AddTotalPhoto />
      },
      {
        path: 'addArtists',
        element: <AddArtist />
      },
      {
        path: 'allArtists',
        element: <AllArtists />
      },
      {
        path: 'AllService',
        element: <AllServices />
      },

    ]
  }
]);