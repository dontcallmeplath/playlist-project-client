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
      HI!
      {friends.map((friend) => (
        <>
          <div>{friend.name}</div>
          <div>{friend.email}</div>
        </>
      ))}
    </div>
  );
};
