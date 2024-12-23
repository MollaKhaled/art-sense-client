import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import LoadingSpinner from "../pages/Shared/LoadingSpinner/LoadingSpinner";


const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin();
  const location = useLocation();

  if (loading || isAdminLoading) {
    return <LoadingSpinner/>
  }
  if (user && isAdmin) {
    return children;
  }
  return <Navigate to='/' state={{ from: location }} replace={true}></Navigate>
};

export default AdminRoute;