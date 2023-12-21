import { useState } from "react";
import { ApplicationViews } from "./views/ApplicationViews";
// import { NavBar } from "./components/nav/NavBar";

export const App = () => {
  const [token, setTokenState] = useState(localStorage.getItem("token"));
  const staff = JSON.parse(localStorage.getItem("staff")); // should be a boolean value
  const currentUserId = JSON.parse(localStorage.getItem("id"));

  const setToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setTokenState(newToken);
  };

  return (
    <>
      {/* <NavBar token={token} setToken={setToken} staff={staff} /> */}
      <ApplicationViews
        token={token}
        setToken={setToken}
        staff={staff}
        currentUserId={currentUserId}
      />
    </>
  );
};
