import axios from "axios";
import { useCallback, useEffect, useState } from "react";

import { UserCard } from "./UserCard";

// change to rel path
import arrayBufferToBase64 from "../../arrayBufferToBase64";

const UserIndex = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const getUsers = useCallback(() => {
    axios
      .get("/users")
      .then((res) => {
        console.log(res.data.users);
        res.data.users.forEach((user) => {
          if (user?.image) {
            console.log(user.image.image.data);
            user.image =
              "data:image/jpeg;base64," +
              arrayBufferToBase64(res.data.user.image.image.data);
          }
        });

        setUsers(res.data.users);
        setError(res?.data.err);
      })
      .catch((err) => setError(err.response.data.err));
  }, []);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <div className="users-container">
      {error && <div className="error">{error}</div>}
      {users &&
        users.map((user) => (
          <UserCard {...{ user }} refresh={getUsers} key={user._id} />
        ))}
    </div>
  );
};

export { UserIndex };
