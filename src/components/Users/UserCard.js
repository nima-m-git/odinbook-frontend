import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react/cjs/react.development";

const UserCard = ({ user }) => {
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const addFriend = (userId) => {
    axios
      .post(`/users/requests/${userId}`)
      .then((res) => {
        setMessage(res?.data?.msg);
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
        setMessage(res?.data.msg);
      })
      .catch((err) => {
        setError(err.response.data.msg);
        console.log(err.response);
      });
  };

  const StatusBtn = (status) => {
    switch (status) {
      // allow request after denied, for the moment
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

      <div className="profilePic">
        <img src={user?.image} alt="profile pic" height={50} width={50} />
      </div>
      <Link to={`/users/${user._id}`}>
        <div className="name">{user?.fullName}</div>
      </Link>
      <div className="status">{StatusBtn(user.friendsStatus)}</div>
      <br></br>
    </div>
  );
};

export { UserCard };
