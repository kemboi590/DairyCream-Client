import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBars } from "react-icons/fa6";
import { MdClose } from "react-icons/md";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className='navbar bg-gray-600  text-white border-b-2'>
      <div className='flex-1'>
        <Link to="/" className='btn btn-ghost normal-case text-xl text-white hidden lg:flex justify-self-start'>
          DairyCream</Link>
      </div>
      <div className='flex-none'>
        <div className='lg:hidden'>
          <button onClick={toggleMenu} className='btn btn-ghost btn-circle text-white'>
            {isOpen ? (
              // this is the close icon
              <MdClose size={24} />
            ) : (
              // this is the hamburger icon
              <FaBars size={24} />
            )}
          </button>
        </div>
        <ul className='menu menu-horizontal px-1 hidden lg:flex'>
          <li className='textarea-lg'> <Link to="/" className='text-white'>Home</Link></li>
          <li className='textarea-lg'><Link to="/about-us" className='text-white'>About</Link></li>
          <li className='textarea-lg'><Link to="/dashboard" className='text-white'>Dashboard</Link></li>
          <li className='textarea-lg'><Link to="/contact-us" className='text-white'>Contact</Link></li>
          <li className='textarea-lg'><Link to="/register" className='text-white'>Register</Link></li>
          <li className='textarea-lg'><Link to="/login" className='text-white'>Login</Link></li>
        </ul>
      </div>


      <div className={`z-10 fixed top-0 left-0 h-full w-64 bg-gray-600 shadow-lg transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:hidden`}>
        <button onClick={toggleMenu} className='btn btn-ghost btn-circle absolute top-4 right-4 text-white'>
          {/* this is the close icon */}
          <MdClose size={24} />
        </button>
        <ul className='menu p-4'>
          <li className='textarea-lg'>
            <Link to="/" onClick={toggleMenu} className='text-white'>Home</Link></li>
          <li className='textarea-lg'><Link to="/about-us" onClick={toggleMenu} className='text-white'>About</Link></li>
          <li className='textarea-lg'><Link to="/dashboard" onClick={toggleMenu} className='text-white'>Dashboard</Link></li>
          <li className='textarea-lg'><Link to="/contact-us" onClick={toggleMenu} className='text-white'>Contact</Link></li>
          <li className='textarea-lg'><Link to="/register" onClick={toggleMenu} className='text-white'>Register</Link></li>
          <li className='textarea-lg'><Link to="/login" onClick={toggleMenu} className='text-white'>Login</Link></li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar