import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
const Navbar = () => {
  const { userActive, logout } = useContext(AuthContext);

  const handleLogout = (e: any) => {
    e.preventDefault();
    logout();
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <Link className="navbar-brand" to="/">
        Workout Tracker
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home{" "}
            </Link>
          </li>
          {userActive ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/create">
                  create
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/logout"
                  onClick={(e) => handleLogout(e)}
                >
                  logout
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
