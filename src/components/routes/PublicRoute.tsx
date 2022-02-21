import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }: any) => {
  const activeUser = localStorage.getItem("user");
  return !activeUser ? children : <Navigate to="/" />;
};
export default PublicRoute;
