import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: any) => {
  const userActive = localStorage.getItem("user");
  return userActive ? children : <Navigate to="/login" />;
};
export default PrivateRoute;
