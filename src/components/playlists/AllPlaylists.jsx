import { useState, useEffect } from "react";
import "./Playlist.css";
import { pullUserAssets } from "../../managers/ServiceManager";
import { useNavigate } from "react-router-dom";

export const AllPlaylists = () => {
  const token = localStorage.getItem("token");
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    pullUserAssets("playlist_episodes", token).then((array) => {
      let filteredPlaylists = filterUniquePlaylists(array);
      setPlaylists(filteredPlaylists);
      setLoading(false); // Set loading to false once playlists are updated
    });
  }, []);

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

  const handleClick = (id) => {
    navigate(`/edit_playlist/${id}`);
  };
  //http://localhost:8000/playlist_episodes?creator_id=current&playlist_id=4

  return (
    <>
      <h1>MY PLAYLISTS</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        playlists.map((playlist) => (
          <>
            <div className="all-page-container">
              <div
                className="container-playlists"
                key={playlist.playlist.id}
                onClick={() => handleClick(playlist.playlist.id)}
                aria-label="Click to edit playlist"
              >
                <h3 className="list-heading">{playlist.playlist.name}</h3>
                <div className="playlist-episode-list">
                  <div className="playlist" key={playlist.playlist.id}>
                    {playlist.playlist.episode.slice(0, 3).map((epi) => (
                      <div className="playlist-episode" key={epi.id}>
                        <strong>{epi.series_name}</strong>
                        <div key={epi.id}>{epi.episode_name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        ))
      )}
    </>
  );
};
