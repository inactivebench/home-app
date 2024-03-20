import React, { useState, useEffect, useContext } from "react";
import Hero from "../components/Hero";
import Card from "../components/Card";
import Cta from "../components/Cta";

const Home = () => {
  return (
    <>
      <Hero />
      <Cta />
      <div className='container'>
        <Card />
      </div>
    </>
  );
};

export default Home;
