import { Route, Routes } from "react-router-dom";
import { Authorized } from "./Authorized";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { HomeView } from "../components/auth/Home";
import { ProfileView } from "../components/profile/Profile";
import { AllFriends } from "../components/friends/AllFriends";
import { AllPlaylists } from "../components/playlists/AllPlaylists";
import { AllTags } from "../components/tags/AllTags";
import { AllEpisodes } from "../components/episodes/AllEpisodes";

export const ApplicationViews = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Authorized />}>
          <Route path="/" element={<HomeView />} />
          <Route path="/my_profile" element={<ProfileView />} />
          <Route path="/friends" element={<AllFriends />} />
          <Route path="/my_playlists" element={<AllPlaylists />} />
          <Route path="/tags" element={<AllTags />} />
          <Route path="/episodes" element={<AllEpisodes />} />
        </Route>
      </Routes>
    </>
  );
};
