import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog } from "@headlessui/react";
import logo from "../assets/home_bnw.svg";
import { LoginContext } from "../context/LoginContext";

const Navbar = () => {
  const { isLoggedIn, setLoggedIn } = useContext(LoginContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(() => {
    console.log("loggedIn:" + " " + isLoggedIn);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  };
  return (
    <>
      <header>
        <nav className='flex justify-between items-center px-6 py-4'>
          <Link className='logo__link' to='/'>
            <img className='mx-auto h-12 w-auto' src={logo} alt='logo' />
          </Link>
          <div className='lg:hidden'>
            <button
              type='button'
              className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 lg:hidden'
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className='sr-only'>Open main menu</span>
              <FontAwesomeIcon
                icon={faBars}
                className='h-6 w-6'
                aria-hidden='true'
              />
            </button>
          </div>
          <div className='hidden lg:flex'>
            <ul className='flex flex-col gap-8 sm:text-center sm:font-bold md:flex-row capitalize text-black '>
              <li>
                <Link to='/buy'>Buy</Link>
              </li>
              <li>
                <Link to='/rent'> Rent</Link>
              </li>
              <li>
                <Link to='/visualize'>Visualize</Link>
              </li>
            </ul>
          </div>

          {!isLoggedIn ? (
            <Link
              to='/signin'
              className='rounded-lg border-2 border-indigo-500  text-indigo-500 text-lg py-2 px-4 font-bold hover:bg-indigo-500 hover:text-white hidden lg:flex'
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
        </nav>
        <Dialog
          as='div'
          className='lg:hidden'
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <Dialog.Panel className='fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10'>
            <div className='flex items-center justify-between'>
              <Link className='logo__link' to='/'>
                <img className='mx-auto h-12 w-auto' src={logo} alt='logo' />
              </Link>
              <button
                type='button'
                className='-m-2.5 rounded-md p-2.5 text-gray-700'
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className='sr-only'>Close menu</span>
                <FontAwesomeIcon
                  icon={faXmark}
                  className='h-6 w-6'
                  aria-hidden='true'
                />
              </button>
            </div>
            <div className='mt-6 flow-root'>
              <div className='-my-6 divide-y divide-gray-500/10'>
                <div className='space-y-2 py-6'>
                  <ul className='flex flex-col sm:text-center sm:font-bold lg:flex-row gap-8 md:gap-4 capitalize text-black'>
                    <li>
                      <Link to='/buy'>Buy</Link>
                    </li>
                    <li>
                      <Link to='/rent'> Rent</Link>
                    </li>
                    <li>
                      <Link to='/visualize'>Visualize</Link>
                    </li>
                  </ul>
                </div>

                <div className='py-6'>
                  <Link
                    to='/signin'
                    className='rounded-lg border-2 border-indigo-500  text-indigo-500 text-lg py-2 px-4 font-bold hover:bg-indigo-500 hover:text-white hidden lg:flex'
                  >
                    Sign in
                  </Link>
                </div>
                <div className='py-6'>
                  <button
                    className='rounded-lg bg-red-500 text-white text-lg font-bold py-2 px-4 '
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </>
  );
};

export default Navbar;
