import axios from "axios";
import { useCallback, useEffect, useState } from "react";

import { UserCard } from "./UserCard";

const UserIndex = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const getUsers = useCallback(() => {
    axios
      .get("/users")
      .then((res) => {
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
