import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { CommentBox } from "./CommentBox";

import imageBufferDataToString from "../../imageBufferDataToString";

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

  const likePost = async (e) => {
    e.preventDefault();
    await axios.put(`/${post._id}/like`);
    refresh();
  };

  return (
    <div className="post">
      <div className="post-info">
        <Link to={`/users/${post.author._id}`}>
          <div className="profilePic">
            <div className="auth">{post.author.fullName}</div>
            {post.author?.image && (
              <img
                src={
                  imageBufferDataToString(post.author.image) ||
                  "https://fertilitynetworkuk.org/wp-content/uploads/2017/01/Facebook-no-profile-picture-icon-620x389.jpg"
                }
                alt="profile pic"
                width="50"
              ></img>
            )}
          </div>
        </Link>

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
        <CommentBox {...{ refresh }} postId={post._id} />
        {post.comments.length &&
          [...post.comments]
            .sort((a, b) => (a.dateAdded > b.dateAdded ? 1 : -1))
            .map((comment) => {
              return (
                <div className="comment" key={comment._id}>
                  <div className="author">{comment?.author?.fullName}</div>
                  <p className="content">{comment.content}</p>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export { Post };
