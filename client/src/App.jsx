import React, { useEffect, useState } from "react";
import Signup from "./login-signup/Signup";
import Signin from "./login-signup/Signin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

const App = () => {
  const [item, setItem] = useState("{}");

  useEffect(() => {
    fetch("http://localhost:5000/api")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setItem(data);
      });
  }, []);
  return (
    <div>
      <h2>App</h2>
    </div>
  );
};
export default App;
