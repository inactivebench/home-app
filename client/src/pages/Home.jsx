import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Card from '../components/Card';

const Home = () => {
 
  const [loginStatus, setLoginStatus] = useState(true);
  const handleLogout = ()=>{
    localStorage.removeItem("token")
    setLoginStatus(false)

}
  return (<div>
      <h1>Home Page</h1>
      <Navbar/>
      {!loginStatus?
      <Link to='/signin' className='link' >
      Signin
      </Link>
      : 
      <button className='logout' onClick={handleLogout}>Logout</button>
    }
    <Card/>
    
  </div>
  )
}

export default Home