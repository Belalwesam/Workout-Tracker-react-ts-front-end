import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; //components
import Navbar from "./components/partials/Navbar";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import Home from "./components/pages/Home";
import PrivateRoute from "./components/routes/PrivateRoute";
import PublicRoute from "./components/routes/PublicRoute";
import AuthContextProvider from "./context/AuthContext";
import Create from "./components/pages/Create";
import WorkoutsContextProvider from "./context/WorkoutsContext";
import View from "./components/pages/View";
function App() {
  return (
    <>
      <BrowserRouter>
        <AuthContextProvider>
          <Navbar />
          <Routes>
            <Route
              path="/create"
              element={
                <PrivateRoute>
                  <WorkoutsContextProvider>
                    <Create />
                  </WorkoutsContextProvider>
                </PrivateRoute>
              }
            />
            <Route path="/" element={<Home />} />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route path="/view-workout/:id" element={<View />} />
            <Route
              path="*"
              element={
                <h1 className="text-center mt-5">
                  Page not found , 404 error.
                </h1>
              }
            />
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </>
  );
}
export default App;
