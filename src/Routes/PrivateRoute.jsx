import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    // Show a loading spinner or progress bar while checking authentication
    return <progress className="progress w-56"></progress>;
  }

  if (user?.email) {
    // Render the child components if the user is authenticated
    return children;
  }

  // Redirect to login with the current location stored in state
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
