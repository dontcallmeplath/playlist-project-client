import { useState, useEffect } from "react";
import { pullUserAssets } from "../../managers/ServiceManager";

export const AllPlaylists = () => {
  const token = localStorage.getItem("token");
  const [isUnsuccessful, setIsUnsuccessful] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [names, setNames] = useState([]);
  const name_array = [];

  useEffect(() => {
    pullUserAssets("playlist_episodes", token).then((array) => {
      setPlaylists(array);
      {
        playlists ? handleNameArray() : setIsUnsuccessful(!isUnsuccessful);
      }
    });
  }, [isUnsuccessful]);

  const handleNameArray = () => {
    if (isUnsuccessful) {
      console.log("Dang");
    } else {
      playlists.forEach((element) => {
        name_array.push(element.playlist.name);
      });
      setNames(name_array);
      console.log(names);
    }
  };

  if (names.length > 0) {
    for (let n = 0; n < names.length; n++) {
      return (
        <>
          <h1>MY PLAYLISTS</h1>

          {names.forEach((name) => {
            <h3>{name}</h3>;
          })}
          {playlists.map((playlist) => {
            <>
              <div className="episode">
                <div>
                  <strong>{playlist.episode.series_name}</strong>
                </div>
                <div>{playlist.episode.episode_name}</div>
              </div>
              {/* <div>{playlist.episode.description}</div> */}
            </>;
          })}
        </>
      );
    }
  } else {
    return <h1> OOPS! </h1>;
  }
};
// maybe i can map the playlists by making an array of their names and running thru that array to match the name in an if statement
// should the table for this go from episode to playlist ?
