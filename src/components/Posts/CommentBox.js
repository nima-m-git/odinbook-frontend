import axios from "axios";
import { useState } from "react";

const CommentBox = ({ postId, refresh }) => {
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState([]);

  const handleResult = (result) => {
    setErrors(
      result?.errors
        ? result.errors.map((err) => err.msg)
        : result?.err
        ? [result.err]
        : []
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(`/posts/${postId}`, {
        content: comment,
      })
      .then((res) => handleResult(res))
      .catch((err) => setErrors([...errors, err.response.data.err]));

    setComment("");
    refresh();
  };

  return (
    <form className="comment-box" onSubmit={handleSubmit}>
      <label>
        Reply:
        <textarea
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          rows={1}
          cols={40}
          maxLength={300}
        />
      </label>
      <button className="submit-btn">Submit</button>
      {errors && errors.map((error) => <div className="error">{error}</div>)}
    </form>
  );
};

export { CommentBox };
