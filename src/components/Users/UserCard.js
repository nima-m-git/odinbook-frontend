import axios from "axios";
import { useState } from "react/cjs/react.development";

const UserCard = ({ user }) => {
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const addFriend = (userId) => {
    axios
      .post(`/users/requests/${userId}`)
      .then((res) => {
        console.log(res);
        setMessage(res?.data?.msg);
        setError(res?.data?.err);
      })
      .catch((err) => {
        setError(err.response.data.msg);
        console.log(err.response);
      });
  };

  const respondRequest = (requestResponse) => {
    axios
      .put(`/users/requests/${user._id}`, {
        requestResponse,
      })
      .then((res) => {
        setMessage(res?.msg);
        setError(res?.err);
      })
      .catch((err) => setError(err));
  };

  const StatusBtn = (status) => {
    switch (status) {
      // allow request after denied for the moment
      case "denied":
      case undefined:
        return (
          <div className="addFriend-status" onClick={() => addFriend(user._id)}>
            Add Friend
          </div>
        );
      case "received":
        return (
          <div className="respondFriend-status">
            <div
              className="confirmFriend-status"
              onClick={() => respondRequest("accepted")}
            >
              Confirm
            </div>
            <div
              className="rejectFriend-status"
              onClick={() => respondRequest("denied")}
            >
              Reject
            </div>
          </div>
        );
      case "accepted":
        return <div className="friends-status">Friends</div>;
      case "pending":
        return <div className="pending-status">Pending..</div>;
      default:
        return <div className="no-status"></div>;
    }
  };

  return (
    <div className="user-card">
      {message && <div className="message">{message}</div>}
      {error && <div className="error">{error}</div>}
      <div className="name">{user.fullName}</div>
      <div className="status">{StatusBtn(user.friendsStatus)}</div>
      <br></br>
    </div>
  );
};

export { UserCard };
