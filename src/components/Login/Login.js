import axios from "axios";
import { useState } from "react";

import "./Login.scss";
import { Signup } from "./Signup";

const Login = ({ setHeaders }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [signupPopup, setSignupPopup] = useState(false);

  const checkCredentials = (e) => {
    e.preventDefault();

    axios
      .post("/login", {
        email,
        password,
      })
      .then((res) => {
        setError(res?.data?.message);
        const token = res?.data?.token;
        if (!!token) setHeaders(token);
      })
      .catch((err) => setError(err.response.data.message));
  };

  return (
    <div>
      <form className="login-form" onSubmit={checkCredentials}>
        <h2 className="form-title">Login</h2>
        {error && <div className="error">- {error}</div>}
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
        <div className="signup-btn" onClick={() => setSignupPopup(true)}>
          Sign Up
        </div>
      </form>
      {signupPopup && <Signup closePopup={() => setSignupPopup(false)} />}
    </div>
  );
};

export { Login };
