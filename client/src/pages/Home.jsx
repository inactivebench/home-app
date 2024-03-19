import React, { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Card from "../components/Card";
import Cta from "../components/Cta";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Cta />
      <div className='container'>
        <Card />
      </div>
    </>
  );
};

export default Home;
