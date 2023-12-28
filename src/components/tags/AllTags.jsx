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
          <div>{tag.label}</div>
        </>
      ))}
    </div>
  );
};
