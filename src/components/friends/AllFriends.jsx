import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { pullUserAssets, pullUserAsset } from "../../managers/ServiceManager";
import "./Friend.css";

export const AllFriends = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [friends, setFriends] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const newPlaylistId = localStorage.getItem("playlistId");

  useEffect(() => {
    pullUserAssets("friends", token).then((array) => {
      setFriends(array);
    });
    pullUserAsset("playlist_episodes", token, newPlaylistId).then((array) => {
      setPlaylist(array);
    });
  }, [token]);

  return (
    <div>
      <h1>FRIENDS</h1>

      {friends.map((friend) => (
        <>
          <div className="friend-container">
            <a
              id="link"
              href={`mailto:${encodeURIComponent(
                friend.email
              )}?subject=${encodeURIComponent(
                "New Playlist OMG"
              )}&body=${encodeURIComponent(playlist)}`}
            >
              <div className="friend-list" key={friend.id}>
                {friend.name}
                <div>{friend.email}</div>
              </div>
            </a>
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
