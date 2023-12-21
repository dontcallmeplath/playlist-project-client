import { Route, Routes } from "react-router-dom";
// import { NavBar } from "../components/nav/NavBar";
import { Authorized } from "./Authorized";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { HomeView } from "../components/auth/Home";

export const ApplicationViews = ({
  token,
  setToken,
  // staff,
  setStaff,
  // currentUserId,
}) => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Authorized />}>
          <Route path="/" element={<HomeView />} />
        </Route>
      </Routes>
    </>
  );
};
