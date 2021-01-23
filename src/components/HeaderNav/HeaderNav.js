import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./HeaderNav.scss";

const HeaderNav = ({ logout }) => {
  const [user, setUser] = useState(true);

  useEffect(() => {
    axios
      .get("/users/me")
      .then((res) => setUser(res.data.user))
      .catch((err) => console.log(err.response.data.err));
  }, []);

  return (
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
        <Link className="link" to={`/users/${user._id}`}>
          {user.fullName}
        </Link>
        <div className="link" onClick={logout}>
          Logout
        </div>
      </nav>
    </header>
  );
};

export { HeaderNav };
