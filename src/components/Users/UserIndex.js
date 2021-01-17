import axios from "axios";
import { useEffect } from "react";
import { useState } from "react/cjs/react.development";

import { UserCard } from "./UserCard";

const UserIndex = () => {
  const [users, setUsers] = useState(null);
  const [error, setError] = useState(null);

  const getUsers = () => {
    axios
      .get("/users")
      .then((res) => {
        setUsers(res.users);
        setError(res?.err);
      })
      .catch((err) => setError(err));
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="users-container">
      {error && <div className="error">{error}</div>}
      {users.map((user) => (
        <UserCard {...{ user }} refresh={getUsers} />
      ))}
    </div>
  );
};

export { UserIndex };
