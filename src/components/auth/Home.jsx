import TVlogo from "../../assets/tv-icon.png";
import "./Home.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { pullUserAssets } from "../../managers/ServiceManager";

export const HomeView = () => {
  const token = localStorage.getItem("token");
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    pullUserAssets("playlists", token).then((array) => {
      setPlaylists(array);
    });
  }, []);

  const currentUserName = localStorage.getItem("name");

  const sortedData = playlists.sort((a, b) => b.id - a.id);
  const fiveMostRecentAssets = sortedData.slice(0, 5);
  return (
    <>
      <img src={TVlogo} className="logo" alt="Vintage TV logo" />
      <h3>Hello, {currentUserName} !</h3>
      <h3>Pick up where you left off ?</h3>
      <div id="circle-container">
        {fiveMostRecentAssets.map((playlist) => (
          <Link
            key={playlist.id}
            to={`/edit_playlist/${playlist.id}`}
            className=""
          >
            <div className="circle" key={playlist.id}>
              {playlist.name}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};
