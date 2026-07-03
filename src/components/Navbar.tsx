import { Link } from 'react-router-dom'
import logo from '../assets/CineGo_Logo.png'

function Navbar() {
  return (
    <nav className="navbar navbar-dark fixed-top">
      <div className="container d-flex align-items-center">
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="CineGo" height="32" />
        </Link>

        <div className="position-absolute top-50 start-50 translate-middle d-flex">
          <Link to="/" className="text-light me-3 text-decoration-none">
            Início
          </Link>
          <Link to="/favorites" className="text-light text-decoration-none">
            Favoritos
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar