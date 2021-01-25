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
    image: null,
  });

  const handleChange = (e) => {
    if (e.target.name == "image") {
      console.log(e.target.files[0]);
    }

    setInputs((old) => ({
      ...old,
      [e.target.name]:
        e.target.name == "image" ? e.target.files[0] : e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({ ...inputs });

    const formData = new FormData();
    for (let input in inputs) {
      formData.append([input], inputs[input]);
    }

    axios
      .post(
        "/signup",
        formData,
        {}
        // {
        //   ...inputs,
        // }
      )
      .then((result) => {
        setMessage(result?.data.message);
        console.log(result);

        if (result?.errors) {
          setErrors([...result?.errors]);
        } else {
          setErrors([]);
          setTimeout(() => closePopup(), 1000);
        }
      })
      .catch((err) => {
        console.log(err.response.data.err || err.response);
        setErrors([...err.response?.data?.errors] || err.response);
      });
  };

  return (
    <form
      className="signup-form"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
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
      <label>
        Profile Picture
        <input type="file" name="image" onChange={handleChange}></input>
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export { Signup };
