import { useState, useEffect } from "react";
import { pullAsset } from "../../managers/ServiceManager";

export const AllTags = () => {
  const token = localStorage.getItem("token");
  const [tags, setTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    pullAsset("tags", token).then((array) => {
      setTags(array);
    });
  }, []);

  const filteredTags = tags.filter((tag) =>
    tag.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (searchTerm == "") {
    return (
      <div>
        <h1>TAGS</h1>
        <input
          type="text"
          placeholder="Search tags..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    );
  } else {
    return (
      <div>
        <h1>TAGS</h1>
        <input
          type="text"
          placeholder="Search tags..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {filteredTags.map((tag) => (
          <>
            <div key={tag.id}>{tag.label}</div>
          </>
        ))}
      </div>
    );
  }
};
