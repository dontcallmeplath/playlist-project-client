import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  pullAsset,
  postAsset,
  deleteEpisodeAsset,
} from "../../managers/ServiceManager";
import "./Episode.css";

export const AllEpisodes = () => {
  const token = localStorage.getItem("token");
  const [episodes, setEpisodes] = useState([]);
  const [episodeTags, setEpisodeTags] = useState([]);
  const [tags, setTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedItem, setExpandedItem] = useState(null);
  const [isAddClicked, setIsAddClicked] = useState(false);
  const [render, setRender] = useState(false);
  const selectedTag = useRef();

  useEffect(() => {
    pullAsset("episodes", token).then((array) => {
      setEpisodes(array);
    });

    pullAsset("tags", token).then((array) => {
      setTags(array);
    });

    pullAsset("episode_tags", token).then((array) => {
      setEpisodeTags(array);
    });
  }, [render, token]);

  const handleClick = (episodeId) => {
    setExpandedItem((prevExpandedItem) =>
      prevExpandedItem === episodeId ? null : episodeId
    );
  };

  const handleOpenAddTag = (e) => {
    e.stopPropagation();
    setIsAddClicked(!isAddClicked);
  };

  const handlePostTag = (e, episodeId) => {
    e.stopPropagation();

    let data = {
      episode: episodeId,
      tag: selectedTag.current.value,
    };

    postAsset("episode_tags", token, data).then(() =>
      setRender((render) => !render)
    );
  };

  const handleDeleteTag = (e, episodeId, tagId) => {
    e.stopPropagation();
    const go = window.confirm("Would you like to remove this tag ?");
    if (go) {
      episodeTags.forEach((eT) => {
        if (eT.episode === episodeId && eT.tag === tagId) {
          let badTag = eT.id;
          deleteEpisodeAsset(token, badTag).then(() =>
            setRender((render) => !render)
          );
        }
      });
    }
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
          style={{
            marginBottom: "15px",
            minHeight: "30px",
            fontSize: "15px",
            fontFamily: "monospace",
          }}
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
            minHeight: "30px",
            fontSize: "15px",
            fontFamily: "monospace",
          }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div id="episode-list">
          {filteredEpisodes.map((episode) => (
            <div
              className={
                expandedItem === episode.id
                  ? "episode-list clicked"
                  : "episode-list"
              }
              key={episode.id}
              onClick={() => handleClick(episode.id)}
            >
              <strong>{episode.series_name}</strong>
              <div>{episode.episode_name}</div>
              {expandedItem === episode.id && (
                <>
                  <div className="episode-rating">{episode.rating}</div>
                  <div className="episode-description">
                    <strong>Description:</strong> {episode.description}
                  </div>

                  <div className="episode-tags">
                    <div id="tag-list">
                      {isAddClicked && (
                        <>
                          <select
                            name="tags"
                            ref={selectedTag}
                            id="tag-select"
                            style={{
                              minHeight: "30px",
                              fontSize: "15px",
                              fontFamily: "monospace",
                              textAlign: "center",
                            }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <option value="">Choose a tag to add: </option>
                            {tags.map((tag) => (
                              <option value={tag.id} key={tag.id}>
                                {tag.label}
                              </option>
                            ))}
                          </select>
                          <button
                            type="submit"
                            onClick={(e) => {
                              handlePostTag(e, episode.id);
                            }}
                          >
                            Add tag
                          </button>
                        </>
                      )}
                    </div>

                    <div>
                      <button
                        className="open-tags-button"
                        onClick={(e) => {
                          handleOpenAddTag(e);
                        }}
                      >
                        +
                      </button>
                      <strong>Tag: </strong>
                      {episode.tag.map((tag) => (
                        <span
                          key={tag.id}
                          onClick={(e) =>
                            handleDeleteTag(e, episode.id, tag.id)
                          }
                        >
                          {tag.label},{" "}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
};
