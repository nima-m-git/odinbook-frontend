import axios from "axios";
import { useState } from "react";

import "./Login.scss";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const checkCredentials = (e) => {
    e.preventDefault();

    axios
      .post("/login", {
        email,
        password,
      })
      .then((res) => {
        if (res.token) {
          setToken(res.token);
        }
        setErrors([res?.msg]);
      });
  };

  return (
    <form className="login-form" onSubmit={checkCredentials}>
      <h2 className="form-title">Login</h2>
      {errors.map((error, i) => (
        <div className="error" key={i}>
          - {error}
        </div>
      ))}
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
    </form>
  );
};

export { Login };
