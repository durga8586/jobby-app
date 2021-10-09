import {Link, withRouter} from 'react-router-dom'

import {AiFillHome} from 'react-icons/ai'
import {FiLogOut} from 'react-icons/fi'
import {FaEnvelope} from 'react-icons/fa'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="nav-container">
      <div className="mobile-nav">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="logo"
            alt="website logo"
          />
        </Link>
        <div className="img-cont">
          <ul className="nav-img-link">
            <li className="nav-link">
              <Link to="/">
                <AiFillHome className="nav-img" />
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/jobs">
                <FaEnvelope className="nav-img" />
              </Link>
            </li>
            <li>
              <button type="button" onClick={onClickLogout} className="butt1">
                <FiLogOut className="nav-img" />
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="lap-nav">
        <div>
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              className="logo"
              alt="website logo"
            />
          </Link>
        </div>
        <div className="nav-lap-links">
          <h1 className="nav-menu-item ">
            <Link to="/" className="nav-link">
              HOME
            </Link>
          </h1>
          <h1 className="nav-menu-item ">
            <Link to="/jobs" className="nav-link">
              JOBS
            </Link>
          </h1>
        </div>
        <button type="button" onClick={onClickLogout} className="butt">
          Logout
        </button>
      </div>
    </div>
  )
}

export default withRouter(Header)
