import { useRef, useState, useEffect, useContext } from 'react';
import {Link} from 'react-router-dom'


import axios from 'axios';
const SIGNIN_URL = 'http://localhost:5000/signin';
axios.defaults.withCredentials = true;

const Signin = () => {
    const emailRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [loginStatus, setLoginStatus] = useState(false);

    useEffect(() => {
        emailRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd])

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
            const response = await axios.post(SIGNIN_URL,
                JSON.stringify({ customer_email: email, password: pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            ) .then((response) => {
                if (!response.data.auth) {
                   setLoginStatus(false);
                } else {
                   console.log(response.data);
                   localStorage.setItem("token", response.data.token)
                   setLoginStatus (true);
                }
              });
           
            
            console.log(JSON.stringify(response?.data))
            // const accessToken = response?.data?.accessToken;
            // const roles = response?.data?.roles;
            // setAuth({ email, pwd, roles, accessToken });
            console.log(email, pwd);
            setEmail('');
            setPwd('');
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Signin Failed');
            }
            errRef.current.focus();
        }
    }

   

    return (
        <>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                    <Link to='/' className="link" >Go to Home</Link>
                        {/* <a href="#">Go to Home</a> */}
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            ref={emailRef}
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <button>Sign In</button>
                    </form>
                    <p>
                        Need an Account?<br />
                        <span className="line">
                            <Link to='/signup' className='link' >Sign Up</Link>
                            {/* <a href="#">Sign Up</a> */}
                        </span>
                    </p>
                </section>
            )}
        </>
    )
}

export default Signin