import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./NavBar.css";

export const NavBar = () => {
  const navigate = useNavigate();
  // const [currentUser, setCurrentUser] = useState({});

  // useEffect(() => {
  //   const user = localStorage.getItem("id");
  //   setCurrentUser(user);
  // }, []);

  return (
    <ul className="navbar">
      <li className="navbar__item">
        <Link className="navbar__link" to="/">
          Home
        </Link>
      </li>

      <li className="navbar__item">
        <Link className="navbar__link" to="/">
          New
        </Link>
      </li>

      <li className="navbar__item">
        <Link className="navbar__link" to={`/my_profile`}>
          My Profile
        </Link>
      </li>

      <li className="navbar__item">
        <Link className="navbar__link" to={`/my_playlists`}>
          My Playlists
        </Link>
      </li>

      <li className="navbar__item">
        <Link className="navbar__link" to={`/shared_playlists`}>
          Shared Playlists
        </Link>
      </li>

      <li className="navbar__item">
        <Link className="navbar__link" to={`/friends`}>
          Friends
        </Link>
      </li>

      {localStorage.getItem("token") ? (
        <li className="navbar__item">
          <Link
            className="navbar__link"
            to=""
            onClick={() => {
              localStorage.removeItem("id");
              localStorage.removeItem("name");
              localStorage.removeItem("token");
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
