import { Link, useNavigate } from 'react-router-dom';
import {AiFillHome} from 'react-icons/ai'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'
import './index.css'

const Header = () => {
  const navigate = useNavigate();

  const onClickLogout = () => {
    Cookies.remove('jwt_token');
    navigate('/login');  
  };

  return (
    <nav className="header-container">
      <ul className="list-container">
        <li className="logo-container">
          <Link to="/" className="nav-link">
             <h1 className='logo'>Syncthreads</h1>
          </Link>
        </li>
        <li className="nav-links-container">
          <Link to="/dashboard" className="nav-link">
            <h1 className="nav-to-name">DashBoard</h1>
            <AiFillHome className="nav-icon" />
          </Link>
        </li>
        <li className="nav-button-container">
          <FiLogOut className="nav-icon" onClick={onClickLogout} />
          <button
            className="logout-button"
            type="button"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Header
