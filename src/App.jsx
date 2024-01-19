import { useState } from "react";
import { ApplicationViews } from "./views/ApplicationViews";

export const App = () => {
  const [token, setTokenState] = useState(localStorage.getItem("token"));
  const currentUserId = JSON.parse(localStorage.getItem("id"));

  const setToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setTokenState(newToken);
  };

  return (
    <>
      <ApplicationViews
        token={token}
        setToken={setToken}
        currentUserId={currentUserId}
      />
    </>
  );
};
