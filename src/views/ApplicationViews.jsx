import { Route, Routes } from "react-router-dom";
import { Authorized } from "./Authorized";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { HomeView } from "../components/auth/Home";
import { ProfileView } from "../components/profile/Profile";

export const ApplicationViews = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Authorized />}>
          <Route path="/" element={<HomeView />} />
          <Route path="/my_profile" element={<ProfileView />} />
        </Route>
      </Routes>
    </>
  );
};
