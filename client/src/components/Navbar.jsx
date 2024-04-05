import React, { useContext, useEffect, useState, Fragment } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, Menu, Transition } from "@headlessui/react";
import logo from "../assets/home_bnw.svg";
import { useDispatch } from "react-redux";
import {
  signOutUserStart,
  signOutUserFailure,
  signOutUserSuccess,
} from "../redux/user/userSlice";
// import { LoginContext } from "../context/LoginContext";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  // const { isLoggedIn, setLoggedIn } = useContext(LoginContext);
  const { currentUser } = useSelector((state) => state.user);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   setLoggedIn(false);
  // };
  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      dispatch(signOutUserSuccess());
      navigate("/");
    } catch (error) {
      dispatch(signOutUserFailure());
    }
  };
  return (
    <>
      <header className='bg-white border-b border-slate-300'>
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
                <Link to='/search'>Buy</Link>
              </li>
              <li>
                <Link to='/search'> Rent</Link>
              </li>
              <li>
                <Link to='/visualize'>Visualize</Link>
              </li>
            </ul>
          </div>

          {!currentUser ? (
            <div className='hidden lg:flex gap-2'>
              <Link
                to='/signin'
                className='  text-black text-lg py-2 px-4 font-bold transition ease-in-out delay-150  hover:translate-y-1 hover:scale-110  duration-300  hidden lg:flex'
              >
                Sign in
              </Link>
              <Link
                to='/signup'
                className='rounded-lg border-2 border-indigo-500  text-indigo-500 text-lg py-2 px-4 font-bold hover:bg-indigo-500 hover:text-white hidden lg:flex'
              >
                Sign up
              </Link>
            </div>
          ) : (
            <Menu
              as='div'
              className='hidden relative lg:inline-block text-left'
            >
              <div>
                <Menu.Button className='inline-flex w-full justify-center gap-x-1.5 rounded-full bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'>
                  <CgProfile className='h-6 w-6' />
                  <RiArrowDropDownLine
                    className='-mr-1 h-5 w-5 text-gray-400'
                    aria-hidden='true'
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
              >
                <Menu.Items className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                  <div className='py-1'>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to='/profile'
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          My Profile
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          type='submit'
                          onClick={handleSignOut}
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-red-500",
                            "block w-full px-4 py-2 text-left text-base"
                          )}
                        >
                          Sign out
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
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
                      <Link to='/search'>Buy</Link>
                    </li>
                    <li>
                      <Link to='/search'> Rent</Link>
                    </li>
                    <li>
                      <Link to='/visualize'>Visualize</Link>
                    </li>
                  </ul>
                </div>

                <div className='py-6'>
                  {!currentUser ? (
                    <Link
                      to='/signin'
                      className='rounded-lg border-2 border-indigo-500  text-indigo-500 text-lg py-2 px-4 font-bold hover:bg-indigo-500 hover:text-white hidden lg:flex'
                    >
                      Sign in
                    </Link>
                  ) : (
                    <button
                      className=' text-red-500 text-lg font-bold py-2 px-4 '
                      onClick={handleSignOut}
                    >
                      Sign out
                    </button>
                  )}
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
