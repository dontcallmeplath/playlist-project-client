import { Route, Routes } from "react-router-dom";
import { Authorized } from "./Authorized";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { HomeView } from "../components/auth/Home";
import { ProfileView } from "../components/profile/Profile";
import { AllFriends } from "../components/friends/AllFriends";
import { AddFriend } from "../components/friends/AddFriends";
import { AllPlaylists } from "../components/playlists/AllPlaylists";
import { AllTags } from "../components/tags/AllTags";
import { AddTag } from "../components/tags/AddTags";
import { AllEpisodes } from "../components/episodes/AllEpisodes";
import { AddEpisode } from "../components/episodes/AddEpisodes";

export const ApplicationViews = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Authorized />}>
          <Route path="/" element={<HomeView />} />
          <Route path="/my_playlists" element={<AllPlaylists />} />
          {/* <Route path="/add_playlist" element={<AddPlaylist />} /> */}
          <Route path="/tags" element={<AllTags />} />
          <Route path="/add_tag" element={<AddTag />} />
          <Route path="/episodes" element={<AllEpisodes />} />
          <Route path="/add_episode" element={<AddEpisode />} />
          <Route path="/friends" element={<AllFriends />} />
          <Route path="/add_friend" element={<AddFriend />} />
          <Route path="/my_profile" element={<ProfileView />} />
        </Route>
      </Routes>
    </>
  );
};
