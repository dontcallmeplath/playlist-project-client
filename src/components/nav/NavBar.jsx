import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Dropdown from "./Dropdown";
import "./NavBar.css";

export const NavBar = () => {
  const navigate = useNavigate();

  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMenu = () => setClick(false);

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  return (
    <>
      <ul className="navbar" onMouseLeave={onMouseLeave}>
        <li className="navbar__item">
          <Link className="navbar__link" to="/">
            Home
          </Link>
        </li>

        <li className="navbar__item">
          <Link
            className="navbar__link"
            onMouseEnter={onMouseEnter}
            onClick={closeMenu}
          >
            New
          </Link>
          {dropdown && <Dropdown />}
        </li>

        <li className="navbar__item">
          <Link
            className="navbar__link"
            to={`/my_playlists`}
            onClick={closeMenu}
          >
            Playlists
          </Link>
        </li>

        <li className="navbar__item">
          <Link className="navbar__link" to={`/tags`} onClick={closeMenu}>
            Tags
          </Link>
        </li>

        <li className="navbar__item">
          <Link className="navbar__link" to={`/episodes`} onClick={closeMenu}>
            Episodes
          </Link>
        </li>

        <li className="navbar__item">
          <Link className="navbar__link" to={`/friends`} onClick={closeMenu}>
            Friends
          </Link>
        </li>

        <li className="navbar__item">
          <Link className="navbar__link" to={`/my_profile`} onClick={closeMenu}>
            Profile
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
                {
                  closeMenu;
                }
              }}
            >
              Logout
            </Link>
          </li>
        ) : (
          ""
        )}
      </ul>
    </>
  );
};
