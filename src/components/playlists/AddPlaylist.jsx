import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postAsset, pullAsset } from "../../managers/ServiceManager";
import "./Playlist.css";

export const AddPlaylist = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const name = useRef();
  const [isUnsuccessful, setisUnsuccessful] = useState(false);
  const [episodes, setEpisodes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [playlistName, setPlaylistName] = useState("");

const handleAdd = (e) => {
  e.preventDefault();

  const data = {
    name: name.current.value,
  };

  postAsset("tags", token, data).then((res) => {
    if (res) {
      navigate("/tags");
    } else {
      setisUnsuccessful(true);
    }
  });
};

  useEffect(() => {
    pullAsset("episodes", token).then((array) => {
      setEpisodes(array);
    });
  }, []);

  const filteredEpisodes = episodes.filter(
    (episode) =>
      episode.episode_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      episode.series_name.toLowerCase().includes(searchTerm.toLowerCase())
  );



  if (searchTerm == "") {
    return (
      <>
        <h1>ADD PLAYLIST</h1>
        <div className="container">
          <div className="playlist-container">
            <div className="content-area">
              <label htmlFor="name">
                <h3 className="heading">Playlist Name:</h3>
              </label>
              <input
                type="text"
                className="playlist-name"
                id="name"
                minLength="4"
                maxLength="40"
                size="30"
                ref={name}
                required
              />
            </div>
          </div>
          <div className="episode-container">
            <div className="content-area">
              <h3 className="heading">Episode Search:</h3>
              <input
                type="text"
                size="30"
                placeholder="Search episodes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <h1>ADD PLAYLIST</h1>
        <div className="container">
          <div className="playlist-container">
            <div className="content-area">
              <label htmlFor="name">
                <h3 className="heading">Playlist Name:</h3>
              </label>
              <input
                type="text"
                className="playlist-name"
                id="name"
                minLength="4"
                maxLength="40"
                size="30"
                ref={name}
                required
              />
            </div>
          </div>
          <div className="episode-container">
            <div className="content-area">
              <h3 className="heading">Episode Search:</h3>
              <input
                type="text"
                size="30"
                placeholder="Search episodes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              {filteredEpisodes.map((episode) => (
                <>
                  <div className="episode" key={episode.id}>
                    <strong>{episode.series_name}</strong>
                    <div>{episode.episode_name}</div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }
};
