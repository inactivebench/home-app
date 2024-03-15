import React, { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Card from "../components/Card";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Card />
    </div>
  );
};

export default Home;
