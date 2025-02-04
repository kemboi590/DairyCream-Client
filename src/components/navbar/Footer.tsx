import { Link } from 'react-router-dom'
import { FaFacebook, FaTwitter, FaLinkedin, FaSquareInstagram } from "react-icons/fa6";

export const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">DairyCream</h2>
            <p className="text-gray-200">
              DairyCream is a comprehensive dairy management system designed to help farmers boost their productivity by tracking milk production, sales, inventory management, and visualization.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul>
              <li className="mb-2"><Link to="/" className="text-gray-200 hover:text-white">Home</Link></li>
              <li className="mb-2"><Link to="/about" className="text-gray-200 hover:text-white">About</Link></li>
              <li className="mb-2"><Link to="/dashboard" className="text-gray-200 hover:text-white">Dashboard</Link></li>
              <li className="mb-2"><Link to="/contact" className="text-gray-200 hover:text-white">Contact</Link></li>
              <li className="mb-2"><Link to="/register" className="text-gray-200 hover:text-white">Register</Link></li>
              <li className="mb-2"><Link to="/login" className="text-gray-200 hover:text-white">Login</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-white">
                <FaFacebook size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-white">
                <FaTwitter size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-white">
                <FaSquareInstagram size={24} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-white">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-200">
          &copy; {new Date().getFullYear()} DairyCream. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer