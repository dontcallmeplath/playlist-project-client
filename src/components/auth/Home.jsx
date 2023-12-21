import TVlogo from "../../assets/tv-icon.png";
import "../../App.css";

export const HomeView = () => {
  const currentUserName = localStorage.getItem("name");
  return (
    <>
      <div>
        <img src={TVlogo} className="logo" alt="Vintage TV logo" />
        <h1>HOME :)</h1>
        <h3>Henlo, {currentUserName} !</h3>
      </div>
    </>
  );
};
