import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Post } from "../index";

const UserPage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState();
  const [error, setError] = useState(null);

  const getUser = useCallback(() => {
    axios
      .get(`/${userId}`)
      .then((res) => setUser(res.user))
      .catch((err) => setError(err.response.data.err));
  }, [userId]);

  useEffect(() => getUser(), [getUser]);

  return (
    <div className="userPage">
      {error && <div className="error">{error}</div>}
      <div className="fullName">{user.fullName}</div>
      <div className="posts-container">
        {user.posts.map((post) => (
          <Post {...post} />
        ))}
      </div>
    </div>
  );
};

export { UserPage };
