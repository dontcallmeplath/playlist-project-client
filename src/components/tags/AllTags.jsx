import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { pullAsset, deleteTag } from "../../managers/ServiceManager";
import "./Tag.css";
import "../../App.css";

export const AllTags = () => {
  const token = localStorage.getItem("token");
  const [tags, setTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [render, setRender] = useState(false);

  useEffect(() => {
    pullAsset("tags", token).then((array) => {
      setTags(array);
    });
  }, []);

  const filteredTags = tags.filter((tag) =>
    tag.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteTag = (e, badTag) => {
    e.stopPropagation();
    const go = window.confirm("Would you like to delete this tag ?");
    if (go) {
      deleteTag(token, badTag).then(() => setRender(true));
    }
  };

  if (searchTerm == "") {
    return (
      <div>
        <h1>TAGS</h1>
        <p>
          Not seeing what you're looking for ?{" "}
          <Link to={`/add_tag`}>Add Tag instead :)</Link>
        </p>
        <input
          type="text"
          placeholder="Search tags..."
          style={{
            marginBottom: "15px",
            minHeight: "30px",
            fontSize: "15px",
            fontFamily: "monospace",
          }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    );
  } else {
    return (
      <div>
        <h1>TAGS</h1>
        <p>
          Not seeing what you're looking for ?{" "}
          <Link to={`/add_tag`}>Add Tag instead :)</Link>
        </p>
        <input
          type="text"
          placeholder="Search tags..."
          style={{
            marginBottom: "15px",
            minHeight: "30px",
            fontSize: "15px",
            fontFamily: "monospace",
          }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="tag-container">
          {filteredTags.map((tag) => (
            <>
              <div
                className="tag"
                key={tag.id}
                onClick={(e) => handleDeleteTag(e, tag.id)}
              >
                {tag.label}
              </div>
            </>
          ))}
        </div>
      </div>
    );
  }
};
