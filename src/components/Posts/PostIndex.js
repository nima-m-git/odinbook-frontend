import axios from "axios";
import { useEffect, useState } from "react";

import { PostForm } from "./PostForm";
import { Post } from "./Post";

const PostIndex = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  const getPosts = () => {
    axios
      .get("/posts")
      .then((res) => {
        console.log("gettingf data");
        const posts = res.data.posts;
        console.log(posts);
        setPosts(posts);
        setError(res?.data.err);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="posts-container">
      {error && <div className="error">{error}</div>}
      <PostForm refresh={getPosts} />
      {posts.map((post) => {
        console.log(post);
        return (
          <Post
            // _id={post._id}
            // authorFullName={post.author.fullName}
            // content={post.content}
            // liked={post.liked}
            // likes={post?.likes}
            // comments={[post?.comments]}
            {...{ post }}
            refresh={getPosts}
            key={post._id}
          />
        );
      })}
    </div>
  );
};

export { PostIndex };
