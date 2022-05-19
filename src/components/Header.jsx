import React from "react";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";

function Header(props) {
  const { isLoggedIn, userInfo } = props;
  return (
    <header>
      <div className="container header_flex">
        <p>
          <Link to="/" className="logo">
            conduit
          </Link>
        </p>

        <ul className="nav_menu">
          <li>
            <NavLink activeClassName="active_header" exact={true} to="/">
              Home
            </NavLink>
          </li>
          {authHeader(isLoggedIn, userInfo)}
        </ul>
      </div>
    </header>
  );
}

function authHeader(isLoggedIn, userInfo) {
  var navLink = "";
  if (isLoggedIn) {
    navLink = (
      <>
        <li>
          <NavLink activeClassName="active_header" to="/new/article">
            New Post
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName="active_header"
            to={`/settings/${userInfo.username}`}
          >
            Settings
          </NavLink>
        </li>

        <li>
          <NavLink
            activeClassName="active_header"
            to={`/user/profile/${userInfo.username}`}
          >
            {userInfo.username}
          </NavLink>
        </li>
      </>
    );
  } else {
    navLink = (
      <>
        <li>
          <NavLink activeClassName="active_header" to="/signin">
            Sign in
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active_header" to="/register">
            Sign up
          </NavLink>
        </li>
      </>
    );
  }

  return navLink;
}

function mapStateToProps(state) {
  if (state.user && state.user.token) {
    return {
      authToken: state.user.token,
      isLoggedIn: true,
      userInfo: state.user,
    };
  } else {
    return { authToken: null, isLoggedIn: false };
  }
}

export default connect(mapStateToProps)(Header);

