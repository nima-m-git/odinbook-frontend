import axios from "axios";
import { useState } from "react";
import { CommentBox } from "./CommentBox";

const ExpandLikes = ({ post }) => (
  <div className="expanded-likes">
    {post?.likes
      .map((like) => like.author.fullName)
      .map((fName) => (
        <li>{fName}</li>
      ))}
  </div>
);

const Post = ({ refresh, post }) => {
  const [expandLikes, setExpandLikes] = useState(false);

  const likePost = (e) => {
    e.preventDefault();
    axios.put(`/${post._id}/like`);
    refresh();
  };

  console.log(post);

  return (
    <div
      className="post"
      style={{ border: "1px solid black", width: "500px", margin: "2em" }}
    >
      <div className="post-info">
        <div className="author">{post.author.fullName}</div>
        <p className="content">{post.content}</p>
        <div className="flex-bar">
          <button className="like" onClick={likePost}>
            {post.liked}
          </button>
          <div className="likes">
            <button
              className="number-likes"
              onMouseEnter={() => setExpandLikes(true)}
              onMouseLeave={() => setExpandLikes(false)}
            >
              Likes ({post?.likes?.count || "0"})
            </button>
            {expandLikes && <ExpandLikes {...{ post }} />}
          </div>
        </div>
      </div>
      <div className="comments">
        <CommentBox refresh={refresh} postId={post._id} />
        {post?.comments &&
          [...post.comments]
            .sort((a, b) => (a.dateAdded > b.dateAdded ? 1 : -1))
            .map((comment) => {
              return (
                <div className="comment" key={comment._id}>
                  <div className="author">{comment.author.fullName}</div>
                  <p className="content">{comment.content}</p>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export { Post };
