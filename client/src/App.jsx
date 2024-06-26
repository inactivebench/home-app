import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginContext } from "./context/LoginContext";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import Listing from "./pages/Listing";
import Visualize from "./pages/Visualize";

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <LoginContext.Provider value={{ isLoggedIn, setLoggedIn }}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='signin' element={<Signin />} />
          <Route path='signup' element={<Signup />} />
          <Route path='profile' element={<Profile />} />
          <Route path='search' element={<Search />} />
          <Route path='listing/:listingId' element={<Listing />} />
          <Route path='visualize' element={<Visualize />} />
        </Routes>
      </BrowserRouter>
    </LoginContext.Provider>
  );
};

export default App;
