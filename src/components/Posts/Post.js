import { CommentBox } from "./CommentBox";

const { default: axios } = require("axios");
const { useState } = require("react/cjs/react.development");

const ExpandLikes = ({ post }) => (
  <div className="expanded-likes">
    {post.likes
      .map((like) => like.author.fullName)
      .map((fName) => (
        <li>{fName}</li>
      ))}
  </div>
);

const Post = ({ post, refresh }) => {
  const [expandLikes, setExpandLikes] = useState(false);

  const likePost = (e) => {
    e.preventDefault();
    axios.put(`/${post._id}/like`);
    refresh();
  };

  return (
    <div className="post">
      <div className="post-info">
        <div className="author">{post.author}</div>
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
              Likes ({post.likes.count()})
            </button>
            {expandLikes && <ExpandLikes {...{ post }} />}
          </div>
        </div>
      </div>
      <div className="comments">
        <CommentBox refresh={refresh} postId={post._id} />
        {post.comments
          .sort((a, b) => (a.dateAdded > b.dateAdded ? 1 : -1))
          .map((comment) => (
            <div className="comment">
              <div className="author">{comment.author}</div>
              <p className="content">{comment.content}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export { Post };
