const { default: axios } = require("axios");
const { useState } = require("react/cjs/react.development");

const PostForm = ({ refresh }) => {
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState(null);

  const handleResult = (result) => {
    setErrors(
      result?.errors
        ? result.errors.map((err) => err.msg)
        : result?.err
        ? [result.err]
        : []
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`/posts/`, {
        content: message,
      })
      .then((res) => handleResult(res))
      .catch((err) => setErrors([...errors, err]));

    setMessage("");
    refresh();
  };

  return (
    <form className="postForm" onSubmit={handleSubmit}>
      <label>
        Whats on your mind?
        <textarea
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          rows={5}
          // cols={40}
          maxLength={500}
        />
      </label>
      <button className="submit-btn">Submit</button>
      {errors && errors.map((error) => <div className="error">{error}</div>)}
    </form>
  );
};

export default PostForm;
