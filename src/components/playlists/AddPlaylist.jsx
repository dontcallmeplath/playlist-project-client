import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  postAsset,
  pullAsset,
  pullUserAssets,
} from "../../managers/ServiceManager";
import "./Playlist.css";

export const AddPlaylist = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const name = useRef();
  const [episodes, setEpisodes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEpisodes, setSelectedEpisodes] = useState([]);
  const [friends, setFriends] = useState([]);

  const handleAdd = (e) => {
    e.preventDefault();

    const playlist = {
      // playlist table = id, name, creator
      name: name.current.value,
      creator: localStorage.getItem("id"),
    };

    postAsset("playlists", token, playlist).then((res) => {
      if ((res.creator = localStorage.getItem("id"))) {
        selectedEpisodes.forEach((e) => {
          const playlist_episode = {
            playlist_id: res.id,
            episode_id: e.id,
          };

          postAsset("playlist_episodes", token, playlist_episode);
        });
        navigate("/my_playlists");
      } else {
        const jsxContent = (
          <>
            <h1>ADD PLAYLIST</h1>
            <p className="">Hmm.. Something is not right here</p>
          </>
        );
        const container = document.getElementById("heading");
        container.innerHTML = `<div>${jsxContent}</div>`;
      }
    });
  };

  const handleShare = (e) => {
    e.preventDefault();
    localStorage.setItem("playlist", JSON.stringify(selectedEpisodes));
    const go = window.confirm("Are you sure you'd like to leave this page ?");
    // true if OK is pressed, false if Cancel is pressed
    if (go) {
      navigate("/friends");
    }
  };

  const handleEpisodes = (episode) => {
    if (!selectedEpisodes.includes(episode)) {
      setSelectedEpisodes([...selectedEpisodes, episode]);

      setEpisodes((prevEpisodes) =>
        prevEpisodes.filter((e) => e.id !== episode.id)
      );
    }
  };

  useEffect(() => {
    pullAsset("episodes", token).then((array) => {
      setEpisodes(array);
    });
    // Keeping friends - may want to use modal instead of navigation in future
    pullUserAssets("friends", token).then((array) => {
      setFriends(array);
    });
  }, [token]);

  const filteredEpisodes = episodes.filter(
    (episode) =>
      episode.episode_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      episode.series_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (searchTerm == "") {
    return (
      <>
        <h1 id="heading">ADD PLAYLIST</h1>
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
              {selectedEpisodes.map((episode) => (
                <div className="episode" id="episode" key={episode.id}>
                  <strong>{episode.series_name}</strong>
                  <div>{episode.episode_name}</div>
                </div>
              ))}
            </div>
            <button onClick={handleAdd}>Add Playlist</button>
            <button onClick={handleShare}>Share Playlist</button>
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
        <h1 id="heading">ADD PLAYLIST</h1>
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
              {selectedEpisodes.map((episode) => (
                <div className="episode" id="episode" key={episode.id}>
                  <strong>{episode.series_name}</strong>
                  <div>{episode.episode_name}</div>
                </div>
              ))}
            </div>
            <button onClick={handleAdd}>Add Playlist</button>
            <button onClick={handleShare}>Share Playlist</button>
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
                <div
                  className="episode"
                  id="episode"
                  key={episode.id}
                  onClick={() => handleEpisodes(episode)}
                >
                  <strong>{episode.series_name}</strong>
                  <div>{episode.episode_name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }
};
