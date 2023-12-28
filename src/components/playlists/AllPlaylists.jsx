import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { pullUserPlaylists } from "../../managers/ServiceManager";

export const AllPlaylists = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [playlists, setPlaylists] = useState([]);
  const [names, setNames] = useState([]);

  useEffect(() => {
    pullUserPlaylists(token).then((array) => {
      setPlaylists(array);
    });
  }, [token]);

  useEffect(() => {
    playlists.forEach((element) => {
      setNames(element.name);
    });
  }, [playlists]);

  //   if (name_array > 0) {
  //     for (var n = name_array.length; n > 0; n--) {
  return (
    <>
      <h3>Playlist: {names}</h3>

      {playlists.map((playlist) => (
        <>
          <div>
            <strong>{playlist.episode.series_name}</strong>
          </div>
          <div>{playlist.episode.episode_name}</div>
          {/* <div>{playlist.episode.description}</div> */}
        </>
      ))}
    </>
  );
  // }
  //   } else {
  //     return <h1> OOPS! </h1>;
  //   }
};
// maybe i can map the playlists by making an array of their names and running thru that array to match the name in an if statement
// should the table for this go from episode to playlist ?
