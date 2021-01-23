import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Post } from "../index";

const UserPage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const getUser = useCallback(() => {
    axios
      .get(`/users/${userId}`)
      .then((res) => setUser(res.data.user))
      .catch((err) => setError(err.response.data.err));
  }, [userId]);

  useEffect(() => getUser(), [getUser]);

  return (
    <div className="userPage">
      {error && <div className="error">{error}</div>}
      {user && (
        <div>
          <div className="fullName">{user.fullName}</div>
          <div className="posts-container">
            {user.posts.length > 0 ? (
              user.posts.map((post) => <Post {...{ post }} key={post._id} />)
            ) : (
              <p>No posts to show</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export { UserPage };
