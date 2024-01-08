import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { pullAsset } from "../../managers/ServiceManager";
import "./Episode.css";

const EpisodeItem = ({ episode, isExpanded, handleClick }) => {
  return (
    <div
      className={isExpanded ? "episode-list clicked" : "episode-list"}
      key={episode.id}
      onClick={() => handleClick(episode.id)}
    >
      <strong>{episode.series_name}</strong>
      <div>{episode.episode_name}</div>
      {isExpanded && (
        <>
          <div className="episode-rating">{episode.rating}</div>
          <div className="episode-description">
            <strong>Description:</strong> {episode.description}
          </div>
          <div className="episode-tags">
            <strong>Tag: </strong>
            {episode.tag.map((tag) => (
              <span key={tag.id}>{tag.label}, </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export const AllEpisodes = () => {
  const token = localStorage.getItem("token");
  const [episodes, setEpisodes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedItem, setExpandedItem] = useState(null);

  useEffect(() => {
    pullAsset("episodes", token).then((array) => {
      setEpisodes(array);
    });
  }, []);

  const handleClick = (itemId) => {
    setExpandedItem((prev) => (prev === itemId ? null : itemId));
  };

  const filteredEpisodes = episodes.filter(
    (episode) =>
      episode.episode_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      episode.series_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if (searchTerm == "") {
    return (
      <div>
        <h1>EPISODES</h1>
        <p>
          Not seeing what you're looking for ?{" "}
          <Link to={`/add_episode`}>Add Episode instead :)</Link>
        </p>
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
        <p>
          Not seeing what you're looking for ?{" "}
          <Link to={`/add_episode`}>Add Episode instead :)</Link>
        </p>
        <input
          type="text"
          placeholder="Search episodes..."
          value={searchTerm}
          style={{
            marginBottom: "15px",
          }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div id="episode-list">
          {filteredEpisodes.map((episode) => (
            <EpisodeItem
              key={episode.id}
              episode={episode}
              isExpanded={expandedItem === episode.id}
              handleClick={handleClick}
            />
          ))}
        </div>
      </div>
    );
  }
};
