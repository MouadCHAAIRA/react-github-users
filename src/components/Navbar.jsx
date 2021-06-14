import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
      <nav className='nav-section'>
        <Link to='/' className='nav-btn'>
          Home
        </Link>

        <Link to='/favorite' className='nav-btn'>
          Favorite
        </Link>
      </nav>
    </>
  )
}

export default Navbar
