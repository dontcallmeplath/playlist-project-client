import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { pullUserFriends } from "../../managers/ServiceManager";

export const AllFriends = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    pullUserFriends(token).then((array) => {
      setFriends(array);
    });
  }, [token]);

  return (
    <div>
      <h1>FRIENDS</h1>
      {friends.map((friend) => (
        <>
          <div key={friend.id}>
            {friend.name}
            <div>{friend.email}</div>
          </div>
        </>
      ))}
    </div>
  );
};
