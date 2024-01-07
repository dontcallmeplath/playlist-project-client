import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { pullUserAssets } from "../../managers/ServiceManager";
import "./Friend.css";

export const AllFriends = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    pullUserAssets("friends", token).then((array) => {
      setFriends(array);
    });
  }, [token]);

  const handleClick = (email) => {
    const contact = "mailto:" + email;
  };
  const playlist = JSON.parse(localStorage.getItem("playlist"));
  // if click, mailto: + playlist

  // <a href="mailto:recipient@example.com?subject=Your%20Subject&body=Your%20Body%20Content">
  //   Send Email
  // </a>;

  return (
    <div>
      <h1>FRIENDS</h1>

      {friends.map((friend) => (
        <>
          <div className="friend-container">
            <div
              className="friend-list"
              key={friend.id}
              onClick={handleClick(friend.email)}
            >
              {friend.name}
              <div>{friend.email}</div>
            </div>
          </div>
        </>
      ))}
      <p>
        Not seeing who you're looking for ?{" "}
        <Link to={`/add_friend`}>Add Friend instead :)</Link>
      </p>
    </div>
  );
};
