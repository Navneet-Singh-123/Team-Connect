import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {logout} from '../../actions/auth';

const Navbar = ({auth: {isAuthenticated, loading, user}, logout}) => {


    const authLinks = (
      <ul>
        <li>
          <Link to="/posts">
            <i class="far fa-comments"></i>{' '}
            <span className='hide-sm'>Posts</span>
          </Link>
        </li>
        <li>
          <Link to="/profiles">
            <i className='fas fa-users' />{' '}
            <span className='hide-sm'>Members</span>
          </Link>
        </li>
        <li>
          <Link to="/myTeams">
            <i class="fas fa-layer-group"></i>{' '}
            <span className='hide-sm'>My Teams</span>
          </Link>
        </li>
        <li>
          <Link to="/dashboard">
            <i className='fas fa-user' />{' '}
            <span className='hide-sm'>Dashboard</span>
          </Link>
        </li>
        <li>
          <a onClick={logout} href='#!'>
            <i className='fas fa-sign-out-alt' />{' '}
            <span className='hide-sm'>Logout</span>
          </a>
        </li>
      </ul>
    )
    const authLinks2 = (
      <ul>
        <li>
          <Link to="/dashboard">
            <i className='fas fa-user' />{' '}
            <span className='hide-sm'>Dashboard</span>
          </Link>
        </li>
        <li>
          <a onClick={logout} href='#!'>
            <i className='fas fa-sign-out-alt' />{' '}
            <span className='hide-sm'>Logout</span>
          </a>
        </li>
      </ul>
    )


    const guestLinks = (
      <ul>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    )

    return (
    <nav className="navbar bg-dark">
        <h1>
          <Link to="/"><i className="fas fa-code"></i> TeamConnector</Link>
        </h1>
        {!loading &&  user && user.code!=="" && (
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        )}
        {!loading &&  user && user.code==="" && (
          <Fragment>{isAuthenticated ? authLinks2 : guestLinks}</Fragment>
        )}
    </nav>
    )
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, {logout})(Navbar);