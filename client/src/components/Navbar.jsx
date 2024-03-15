import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/home_bnw.svg";

const Navbar = () => {
  return (
    <>
      <header>
        <Link className='logo__link' to='/'>
          <img className='mx-auto h-12 w-auto' src={logo} alt='logo' />
        </Link>
        <nav>
          <ul className='flex flex-col sm:text-center sm:font-bold md:flex-row gap-7 md:gap-4 capitalize text-black'>
            <li>
              <a href='#'>Buy</a>
            </li>
            <li>
              <a href='#'>Rent</a>
            </li>
            <li>
              <a href='#'>Visualize</a>
            </li>
          </ul>
        </nav>
        <div className='flex'>
          <Link to='/signin' className='link'>
            Sign In
          </Link>
          <Link to='/signup' className='link'>
            Sign Up
          </Link>
        </div>
      </header>
    </>
  );
};

export default Navbar;
