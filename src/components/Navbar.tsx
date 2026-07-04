import { Link } from 'react-router-dom'
import logo from '../assets/CineGo_Logo.png'


function Navbar() {
  return (
    <nav className="navbar navbar-dark fixed-top">
      <div className="container d-flex align-items-center">
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="CineGo" height="32" />
        </Link>

        <div className="menu-navbar d-flex">
          <Link to="/" className="text-btn-menu text-light me-3 text-decoration-none">
            Início
          </Link>
          <Link to="/favorites" className="text-btn-menu text-light text-decoration-none">
            Favoritos
          </Link>
        </div>

      </div>
    </nav>
  )
}

export default Navbar