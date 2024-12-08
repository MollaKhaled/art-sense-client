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
import PrivateRoute from "./PrivateRoute";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AddItem from "../pages/Dashboard/AddItem/AddItem";
import AdminRoute from "./AdminRoute";
import About from "../pages/Home/About/About";
import Services from "../pages/Home/Services/Services";
import Inquire from "../pages/Home/Inquire/Inquire";
import AllInquire from "../pages/Dashboard/AllInquire/AllInquire";


export const router = createBrowserRouter([
  {
    path: "/",
    element:<Main></Main>,
    children:[
      {
        path:"/",
        element:<Home></Home>,
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
        path:'/about',
        element:<About></About>
      },
      {
        path:'/services',
        element:<Services></Services>
      },
      {
        path:'/inquire/:id',
        element:<Inquire></Inquire>,
        loader:({params}) =>fetch(`http://localhost:3000/photo/${params.id}`)
      },
      {
        path:'/product/:id',
        element:<ProductCard/>
      },
      {
        path:'/users/:id',
        element:<AllUsers></AllUsers>
      },
    ]
  },
  {
    path:'dashboard',
    element:<Dashboard></Dashboard>,
    children: [
      {
        path:'addItem',
        element:<AdminRoute><AddItem></AddItem></AdminRoute>
      },
      {
        path:'users',
        element:<AdminRoute><AllUsers></AllUsers></AdminRoute>
      },
      {
        path:'allInquire',
        element:<AdminRoute><AllInquire></AllInquire></AdminRoute>
      }
    ]
  }
]);