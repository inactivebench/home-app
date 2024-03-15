import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/home_bnw.svg";
import { LoginContext } from "../context/LoginContext";

const Navbar = () => {
  const { isLoggedIn, setLoggedIn } = useContext(LoginContext);
  useEffect(() => {
    console.log("loggedIn:" + " " + isLoggedIn);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  };
  return (
    <>
      <header className='flex justify-between items-center px-6 py-4'>
        <Link className='logo__link' to='/'>
          <img className='mx-auto h-12 w-auto' src={logo} alt='logo' />
        </Link>

        <nav>
          <ul className='flex flex-col sm:text-center sm:font-bold md:flex-row gap-7 md:gap-4 capitalize text-black'>
            <li>
              <Link to='/buy'>Buy</Link>
            </li>
            <li>
              <a href='#'>Rent</a>
            </li>
            <li>
              <a href='#'>Visualize</a>
            </li>
          </ul>
        </nav>

        {!isLoggedIn ? (
          <Link
            to='/signin'
            className='rounded-lg border-2 border-indigo-500  text-indigo-500 text-lg py-2 px-4 font-bold hover:bg-indigo-500 hover:text-white'
          >
            Sign in
          </Link>
        ) : (
          <button
            className='rounded-lg bg-red-500 text-white text-lg font-bold py-2 px-4 '
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </header>
    </>
  );
};

export default Navbar;
