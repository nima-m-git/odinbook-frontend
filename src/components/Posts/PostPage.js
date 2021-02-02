import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react/cjs/react.development";

import { Post } from "./Post";
import "./Posts.scss";

const PostPage = () => {
  const [post, setPost] = useState();
  const [error, setError] = useState(null);
  const { postId } = useParams();

  const getPost = () => {
    axios
      .get(`/posts/${postId}`)
      .then((res) => {
        setPost(res.post);
        setError(res?.err);
      })
      .catch((err) => setError(err));
  };

  useEffect(() => {
    getPost();
  });

  return (
    <div className="post-container">
      {error && <div className="error">{error}</div>}
      {post.map((post) => (
        <Post {...{ post }} refresh={getPost} />
      ))}
    </div>
  );
};

export { PostPage };
