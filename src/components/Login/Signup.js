import axios from "axios";
import { useState } from "react";

const Signup = ({ closePopup }) => {
  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState(null);
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setInputs((old) => ({
      ...old,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/signup", {
        ...inputs,
      })
      .then((result) => {
        setMessage(result?.data.message);

        if (result?.errors) {
          setErrors([...result?.errors]);
        } else {
          setErrors([]);
          setTimeout(() => closePopup(), 1000);
        }
      })
      .catch((err) => setErrors([...err.response.data.errors]));
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Signup</h2>
      {errors.map((error, i) => (
        <div className="error" key={i}>
          - {error.msg}
        </div>
      ))}
      {message && <div className="message">{message}</div>}
      <label>
        First Name:
        <input
          type="text"
          name="firstName"
          value={inputs.firstName}
          onChange={handleChange}
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          name="lastName"
          value={inputs.lastName}
          onChange={handleChange}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={inputs.email}
          onChange={handleChange}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={inputs.password}
          onChange={handleChange}
        />
      </label>
      <label>
        Confirm Password:
        <input
          type="password"
          name="confirmPassword"
          value={inputs.confirmPassword}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export { Signup };
