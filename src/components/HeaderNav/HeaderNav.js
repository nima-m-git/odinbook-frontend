import { Link } from "react-router-dom";

import "./HeaderNav.scss";

const HeaderNav = ({ logout }) => (
  <header className="header">
    <Link to="/">
      <header>
        <h1 className="logo">Facebook</h1>
      </header>
    </Link>
    <nav className="navbar">
      <Link className="link" to="/users">
        Users
      </Link>
      <Link className="link" to="/users/me">
        Me
      </Link>
      <div className="link" onClick={logout}>
        Logout
      </div>
    </nav>
  </header>
);

export { HeaderNav };
