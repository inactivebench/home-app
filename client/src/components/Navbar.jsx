import React from 'react'
import {Link} from 'react-router-dom'
import logo from '../assets/home.svg'



const Navbar = () => {
  return (
    <>
    <header >
        
    <Link className='logo__link' to='/' >
   <img className='logo' src={logo} alt="Home logo" />
    </Link>
      <nav>
        <ul className='flex'>
          <li><a href="#">Buy</a></li>
          <li><a href="#">Rent</a></li>
          <li><a href="#">Visualize</a></li>
        </ul>
      </nav>
      <div className='flex'>
      <Link to='/signin' className='link' >Sign In</Link>
      <Link to='/signup' className='link' >Sign Up</Link>
      </div>

    </header>
    </>
  )
}

export default Navbar