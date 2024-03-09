import React, { useEffect, useState } from "react";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";



const App = () => {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Home/>}  />
    <Route path='signin' element={<Signin/>}  />
    <Route path='signup' element={<Signup/>}  />
   </Routes>
   </BrowserRouter>
  );
};
export default App;
