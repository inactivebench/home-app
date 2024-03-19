import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginContext } from "./context/LoginContext";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import Buy from "./pages/Buy";
import Rent from "./pages/Rent";
import Visualize from "./pages/Visualize";

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  return (
    <LoginContext.Provider value={{ isLoggedIn, setLoggedIn }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='signin' element={<Signin />} />
          <Route path='signup' element={<Signup />} />
          <Route path='buy' element={<Buy />} />
          <Route path='rent' element={<Rent />} />
          <Route path='visualize' element={<Visualize />} />
        </Routes>
      </BrowserRouter>
    </LoginContext.Provider>
  );
};

export default App;
