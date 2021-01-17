import axios from "axios";
import { useEffect } from "react";
import { useState } from "react/cjs/react.development";

import { PostForm } from "./PostForm";
import { Post } from "./Post";

const PostIndex = () => {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState(null);

  const getPosts = () => {
    axios
      .get("/posts")
      .then((res) => {
        setPosts(res.posts);
        setError(res?.err);
      })
      .catch((err) => setError(err));
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="posts-container">
      {error && <div className="error">{error}</div>}
      <PostForm refresh={getPosts} />
      {posts.map((post) => (
        <Post {...{ post }} refresh={getPosts} />
      ))}
    </div>
  );
};

export { PostIndex };
