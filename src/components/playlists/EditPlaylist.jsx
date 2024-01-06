import { useState, useEffect } from "react";
import { pullUserAssets } from "../../managers/ServiceManager";
import { useNavigate } from "react-router-dom";

export const EditPlaylist = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1>Edit Playlist</h1>
    </>
  );
};
