import { useRef, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/home_bnw.svg";
import axios from "axios";

const SIGNIN_URL = "http://localhost:5000/signin";
axios.defaults.withCredentials = true;

const Signin = () => {
  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  useEffect(() => {
    axios.get("http://localhost:5000/signin").then((response) => {
      console.log(response);
      if (response.data.loggedIn == true) {
        setRole(response.data.user[0].role);
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios
        .post(
          SIGNIN_URL,
          JSON.stringify({ customer_email: email, password: pwd }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        )
        .then((response) => {
          if (!response.data.auth) {
            setLoginStatus(false);
          } else {
            console.log(response.data);
            localStorage.setItem("token", response.data.token);
            setLoginStatus(true);
          }
        });

      console.log(JSON.stringify(response?.data));
      // const accessToken = response?.data?.accessToken;
      // const roles = response?.data?.roles;
      // setAuth({ email, pwd, roles, accessToken });
      console.log(email, pwd);
      setEmail("");
      setPwd("");
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Signin Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
          <p>
            <Link to='/' className='link'>
              Go to Home
            </Link>
          </p>
        </section>
      ) : (
        <div className='flex min-h-full flex-col justify-center px-6 py-12 lg:px-8'>
          <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
            <img className='mx-auto h-12 w-auto' src={logo} alt='logo' />
            <h1 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
              Sign In to your account
            </h1>
          </div>
          <div className='mt-10 p-8 border-2 rounded-lg sm:mx-auto sm:w-full sm:max-w-sm md:max-w-md'>
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live='assertive'
            >
              {errMsg}
            </p>
            <form className='space-y-6' onSubmit={handleSubmit}>
              <label
                htmlFor='email'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Email Address
              </label>
              <input
                type='email'
                id='email'
                ref={emailRef}
                autoComplete='off'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className='block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                required
              />

              <label
                htmlFor='password'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Password
              </label>
              <input
                type='password'
                id='password'
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                className='block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                required
              />
              <button className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                Sign In
              </button>
            </form>
            <p className='mt-10 text-center text-sm text-gray-500'>
              Need an Account ?
              <span className='ml-2'>
                <Link
                  to='/signup'
                  className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
                >
                  Sign Up
                </Link>
                {/* <a href="#">Sign Up</a> */}
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Signin;
