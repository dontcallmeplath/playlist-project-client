import { useState, useEffect } from "react";
import { pullAsset } from "../../managers/ServiceManager";

export const AllEpisodes = () => {
  const token = localStorage.getItem("token");
  const [episodes, setEpisodes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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
      <div>
        <h1>EPISODES</h1>
        <input
          type="text"
          placeholder="Search episodes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    );
  } else {
    return (
      <div>
        <h1>EPISODES</h1>
        <input
          type="text"
          placeholder="Search episodes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {filteredEpisodes.map((episode) => (
          <>
            <div key={episode.id}>
              <strong>{episode.series_name}</strong>
              <div>{episode.episode_name}</div>
            </div>
          </>
        ))}
      </div>
    );
  }
};
