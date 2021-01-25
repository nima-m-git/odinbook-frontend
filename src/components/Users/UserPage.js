import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Post } from "../index";

// change to rel path
import arrayBufferToBase64 from "../../arrayBufferToBase64";

const UserPage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const getUser = useCallback(() => {
    axios
      .get(`/users/${userId}`)
      .then((res) => {
        //  set image if received
        res.data.user.image = res.data.user?.image
          ? "data:image/jpeg;base64," +
            arrayBufferToBase64(res.data.user.image.image.data.data)
          : null;

        return setUser(res.data.user);
      })
      .catch((err) => setError(err.response?.data?.err || err.response));
  }, [userId]);

  useEffect(() => getUser(), [getUser]);

  return (
    <div className="userPage">
      {error && <div className="error">{error}</div>}
      {user && (
        <div>
          <div className="profilePic">
            <img src={user?.image} alt="profile pic" width="80"></img>
          </div>
          <div className="fullName">{user.fullName}</div>
          <div className="posts-container">
            {user.posts.length > 0 ? (
              user.posts.map((post) => (
                <Post {...{ post }} refresh={getUser} key={post._id} />
              ))
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
