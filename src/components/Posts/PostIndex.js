import axios from "axios";
import { useEffect, useState } from "react";

import { PostForm } from "./PostForm";
import { Post } from "./Post";
import "./Posts.scss";

const PostIndex = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  const getPosts = () => {
    axios
      .get("/posts")
      .then((res) => {
        console.log(res);
        setPosts(res.data.posts);
        setError(res?.data.err);
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
      {posts.map((post) => {
        return <Post {...{ post }} refresh={getPosts} key={post._id} />;
      })}
    </div>
  );
};

export { PostIndex };
