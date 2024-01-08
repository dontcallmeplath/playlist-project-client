import { useState, useEffect, useRef } from "react";
import {
  pullUserAsset,
  pullAsset,
  deletePlaylistAsset,
  updateAsset,
  postAsset,
} from "../../managers/ServiceManager";
import { useNavigate, useParams } from "react-router-dom";

// working on how to handle "add" on playlist that already exists - don't really want to copy all the state stuff from AddPlaylist
// but maybe that makes the most sense ? idk maybe edit only allows for delete ? i think the user stories mention add specifically :(

export const EditPlaylist = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [playlists, setPlaylists] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEpisodes, setSelectedEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTrigger, setDeleteTrigger] = useState(false);
  const name = useRef();
  const { id } = useParams();

  useEffect(() => {
    pullUserAsset("playlist_episodes", token, id).then((array) => {
      let filteredPlaylists = filterUniquePlaylists(array);
      setPlaylists(filteredPlaylists);
      setLoading(false); // Set loading to false once playlists are updated
    });

    pullAsset("episodes", token).then((array) => {
      setEpisodes(array);
    });
  }, [deleteTrigger]);

  const handleEpisodes = (episode) => {
    if (!selectedEpisodes.includes(episode)) {
      setSelectedEpisodes([...selectedEpisodes, episode]);

      setEpisodes((prevEpisodes) =>
        prevEpisodes.filter((e) => e.id !== episode.id)
      );
    }
  };

  const filterUniquePlaylists = (data) => {
    const uniquePlaylists = {};

    data.forEach((item) => {
      const playlistId = item.playlist.id;
      // Check if the playlistId is not already in uniquePlaylists
      if (!uniquePlaylists[playlistId]) {
        // If not, add the entire item (playlist + its nested data) to uniquePlaylists
        uniquePlaylists[playlistId] = item;
      }
    });
    // Extract the values from the uniquePlaylists object to get an array of unique items
    return Object.values(uniquePlaylists);
  };

  const filteredEpisodes = episodes.filter(
    (episode) =>
      episode.episode_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      episode.series_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpdate = () => {
    const data = {
      // playlist table = id, name, creator
      name: name.current.value,
      creator: localStorage.getItem("id"),
    };

    updateAsset("playlists", token, data, id).then(() =>
      navigate("/my_playlists")
    );

    selectedEpisodes.forEach((e) => {
      const playlist_episode = {
        playlist_id: id,
        episode_id: e.id,
      };

      postAsset("playlist_episodes", token, playlist_episode).then((res) => {
        if (res != null) {
          navigate("/my_playlists");
        } else {
          const jsxContent = (
            <>
              <h1>EDIT PLAYLIST</h1>
              <p className="">Hmm.. Something is not right here</p>
            </>
          );
          const container = document.getElementById("heading");
          container.innerHTML = `<div>${jsxContent}</div>`;
        }
      });
    });
  };

  const handleDelete = (pk) => {
    deletePlaylistAsset(token, pk).then(() =>
      // Trigger re-render by changing the value of deleteTrigger
      setDeleteTrigger((render) => !render)
    );
  };

  return (
    <>
      <h1>EDIT PLAYLIST</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div id="container">
          {playlists.map((playlist) => (
            <>
              <div
                className="edit-container-playlists"
                key={playlist.playlist.id}
                aria-label="Click to edit playlist"
              >
                {/* <h3 className="edit-heading">{playlist.playlist.name}</h3> */}
                <label>Update playlist name:</label>
                <input
                  type="text"
                  className="playlist-name"
                  id="name"
                  minLength="4"
                  maxLength="40"
                  style={{
                    minHeight: "40px",
                    fontSize: "20px",
                    fontFamily: "monospace",
                    textAlign: "center",
                  }}
                  size="30"
                  ref={name}
                  placeholder={playlist.playlist.name}
                  required
                />
                <button onClick={handleUpdate}>Submit</button>
                <div className="edit-playlist-episode-list">
                  <div className="edit-playlist" key={playlist.playlist.id}>
                    {playlist.playlist.episode.map((epi) => (
                      <>
                        <div className="episode" key={epi.id}>
                          <div>
                            <strong>Series name: {epi.series_name}</strong>
                          </div>
                          <span className="episode-name">
                            Episode name: {epi.episode_name}
                          </span>
                          <div>
                            <button
                              className="delete-button"
                              onClick={() => handleDelete(playlist.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </>
                    ))}

                    {selectedEpisodes.map((episode) => (
                      <div
                        id="episode"
                        onClick={() => handleEpisodes(episode)}
                        className="episode"
                        key={episode.id}
                      >
                        <strong>{episode.series_name}</strong>
                        <div>{episode.episode_name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ))}
          <div className="episode-container-edit">
            <div className="content-area">
              <h3 className="heading">Episode Search:</h3>
              <input
                type="text"
                size="30"
                placeholder="Search episodes..."
                style={{
                  minHeight: "30px",
                  fontSize: "15px",
                  fontFamily: "monospace",
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              {filteredEpisodes.map((episode) => (
                <div
                  id="episode"
                  onClick={() => handleEpisodes(episode)}
                  className="episode"
                  key={episode.id}
                >
                  <strong>{episode.series_name}</strong>
                  <div>{episode.episode_name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
