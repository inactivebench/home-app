import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../assets/home_bnw.svg";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const CONTACT_REGEX = /^\d{1,10}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const SIGNUP_URL = "http://localhost:5000/api/users/signup";

const Signup = () => {
  const firstNameRef = useRef();
  const errRef = useRef();

  const [firstName, setFirstName] = useState("");
  const [validFirstName, setValidFirstName] = useState(false);
  const [firstNameFocus, setFirstNameFocus] = useState(false);

  const [lastName, setLastName] = useState("");
  const [validLastName, setValidLastName] = useState(false);
  const [lastNameFocus, setLastNameFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [contact, setContact] = useState("");
  const [validContact, setValidContact] = useState(false);
  const [contactFocus, setContactFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    firstNameRef.current.focus();
  }, []);

  useEffect(() => {
    setValidFirstName(USER_REGEX.test(firstName));
    setValidLastName(USER_REGEX.test(lastName));
  }, [firstName, lastName]);
  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
    setValidContact(CONTACT_REGEX.test(contact));
  }, [email, contact]);
  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [firstName, lastName, email, contact, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = EMAIL_REGEX.test(email);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(
        SIGNUP_URL,
        JSON.stringify({
          customer_fname: firstName,
          customer_lname: lastName,
          customer_email: email,
          password: pwd,
          phone_number: contact,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      // TODO: remove console.logs before deployment
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response))
      console.log(email, firstName, lastName, contact, pwd);
      setSuccess(true);
      //clear state and controlled inputs
      setFirstName("");
      setLastName("");
      setEmail("");
      setContact("");
      setPwd("");
      setMatchPwd("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <Link to='/signin' className='link'>
              Sign In
            </Link>
          </p>
        </section>
      ) : (
        <div className='flex min-h-full flex-col justify-center px-6 py-12 lg:px-8'>
          <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
            <img className='mx-auto h-12 w-auto' src={logo} alt='logo' />
            <h1 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
              Sign up to create your account
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
              {/* {firstname} */}
              <label
                htmlFor='firstname'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                First name:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validFirstName ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validFirstName || !firstName ? "hide" : "invalid"}
                />
              </label>
              <input
                type='text'
                id='firstname'
                ref={firstNameRef}
                autoComplete='off'
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                className='block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                required
                aria-invalid={validFirstName ? "false" : "true"}
                onFocus={() => setFirstNameFocus(true)}
                onBlur={() => setFirstNameFocus(false)}
              />

              {/* {lastname} */}
              <label
                htmlFor='lastname'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Last name:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validLastName ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validLastName || !lastName ? "hide" : "invalid"}
                />
              </label>
              <input
                type='text'
                id='lastname'
                autoComplete='off'
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                className='block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                required
                aria-invalid={validLastName ? "false" : "true"}
                onFocus={() => setLastNameFocus(true)}
                onBlur={() => setLastNameFocus(false)}
              />

              {/* {email} */}
              <label
                htmlFor='email'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Email:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validEmail ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validEmail || !email ? "hide" : "invalid"}
                />
              </label>
              <input
                type='email'
                id='email'
                aria-describedby='emailnote'
                autoComplete='off'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className='block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                required
                aria-invalid={validEmail ? "false" : "true"}
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
              />
              <p
                id='emailnote'
                className={
                  contactFocus && !validEmail ? "instructions" : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Please, enter a valid email!
              </p>

              {/* {phone number} */}
              <label
                htmlFor='contact'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Contact:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validContact ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validContact || !contact ? "hide" : "invalid"}
                />
              </label>
              <input
                type='text'
                id='contact'
                autoComplete='off'
                onChange={(e) => setContact(e.target.value)}
                value={contact}
                className='block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                required
                aria-invalid={validContact ? "false" : "true"}
                onFocus={() => setContactFocus(true)}
                onBlur={() => setContactFocus(false)}
              />
              {/* {password} */}

              <label
                htmlFor='password'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Password:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validPwd ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validPwd || !pwd ? "hide" : "invalid"}
                />
              </label>
              <input
                type='password'
                id='password'
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                className='block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                required
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby='pwdnote'
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
              />
              <p
                id='pwdnote'
                className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                8 to 24 characters.
                <br />
                Must include uppercase and lowercase letters, a number and a
                special character.
                <br />
                Allowed special characters:{" "}
                <span aria-label='exclamation mark'>!</span>{" "}
                <span aria-label='at symbol'>@</span>{" "}
                <span aria-label='hashtag'>#</span>{" "}
                <span aria-label='dollar sign'>$</span>{" "}
                <span aria-label='percent'>%</span>
              </p>

              {/* {confirm password} */}

              <label
                htmlFor='confirm_pwd'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Confirm Password:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validMatch && matchPwd ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validMatch || !matchPwd ? "hide" : "invalid"}
                />
              </label>
              <input
                type='password'
                id='confirm_pwd'
                onChange={(e) => setMatchPwd(e.target.value)}
                value={matchPwd}
                className='block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                required
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby='confirmnote'
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              />
              <p
                id='confirmnote'
                className={
                  matchFocus && !validMatch ? "instructions" : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Must match the first password input field.
              </p>

              <button
                className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                disabled={
                  !validFirstName ||
                  !validLastName ||
                  !validEmail ||
                  !validContact ||
                  !validPwd ||
                  !validMatch
                    ? true
                    : false
                }
              >
                Sign Up
              </button>
            </form>
            <p className='mt-10 text-center text-sm text-gray-500'>
              Already registered ?
              <span className='ml-2'>
                <Link
                  to='/signin'
                  className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
                >
                  Sign In
                </Link>
                {/* <a href="#">Sign In</a> */}
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Signup;
