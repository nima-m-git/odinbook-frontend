import axios from "axios";
import { useCallback, useEffect, useState } from "react";

import { UserCard } from "./UserCard";

// change to rel path
import imageBufferDataToString from "../../imageBufferDataToString";

const UserIndex = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const getUsers = useCallback(() => {
    axios
      .get("/users")
      .then((res) => {
        //   set image if received
        res.data.users.forEach((user) => {
          if (user?.image) {
            user.image = imageBufferDataToString(user.image.image.data.data);
          }
        });

        setUsers(res.data.users);
        setError(res?.data.err);
      })
      .catch((err) => setError(err?.response?.data?.err || err?.response));
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
