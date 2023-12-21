import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import "./NavBar.css";

export const NavBar = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localPlaylistUser = localStorage.getItem("playlist_user");
    const playlistUserObject = JSON.parse(localPlaylistUser);
    setCurrentUser(playlistUserObject.id);
  }, []);

  return (
    <ul className="navbar">
      <li className="navbar__item">
        <Link className="navbar__link" to="/">
          Class of 66
        </Link>
      </li>

      <li className="navbar__item">
        <Link className="navbar__link" to={`/users/${currentUser}/profile`}>
          My Profile
        </Link>
      </li>
      {localStorage.getItem("playlist_user") ? (
        <li className="navbar__item">
          <Link
            className="navbar__link"
            to=""
            onClick={() => {
              localStorage.removeItem("playlist_user");
              navigate("/login", { replace: true });
            }}
          >
            Logout
          </Link>
        </li>
      ) : (
        ""
      )}
    </ul>
  );
};
