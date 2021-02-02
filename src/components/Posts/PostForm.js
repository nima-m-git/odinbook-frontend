const { default: axios } = require("axios");
const { useState } = require("react/cjs/react.development");

const PostForm = ({ refresh }) => {
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(`/posts/`, {
        content: content,
      })
      .then((res) => setMessage(res.data.msg))
      .catch((err) => setError(err.response.data.err));

    setContent("");
    refresh();
  };

  return (
    <form className="postForm" onSubmit={handleSubmit}>
      <label>
        <textarea
          onChange={(e) => setContent(e.target.value)}
          value={content}
          rows={2}
          maxLength={500}
          placeholder="Whats on your mind?"
        />
      </label>
      <button className="submit-btn">Submit</button>
      {message && <div className="message">{message}</div>}
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export { PostForm };
