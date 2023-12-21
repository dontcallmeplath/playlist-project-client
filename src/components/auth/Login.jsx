import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../managers/AuthManager.jsx";

export const Login = ({ setToken }) => {
  const username = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const [isUnsuccessful, setisUnsuccessful] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    const user = {
      username: username.current.value,
      password: password.current.value,
    };

    loginUser(user).then((res) => {
      if ("valid" in res && res.valid) {
        navigate("/");
        setToken(res.token);
        localStorage.setItem("id", res.id);
        localStorage.setItem("staff", res.staff);
        localStorage.setItem("name", res.name);
      } else {
        setisUnsuccessful(true);
      }
    });
  };

  return (
    <section className="">
      <form className="" onSubmit={handleLogin}>
        <h1 className="">PLAYLIST PLAYTHINGS</h1>
        <p className="">Please sign in</p>

        <div className="">
          <label className="">Username</label>
          <div className="">
            <input className="" type="text" ref={username} />
          </div>
        </div>

        <div className="">
          <label className="">Password</label>
          <div className="">
            <input className="" type="password" ref={password} />
          </div>
        </div>

        <div className="">
          <div className="">
            <button className="" type="submit">
              Submit
            </button>
          </div>
          <div className="">
            <Link to="/register" className="">
              Cancel
            </Link>
          </div>
        </div>
        {isUnsuccessful ? (
          <p className="">Username or password not valid</p>
        ) : (
          ""
        )}
      </form>
    </section>
  );
};
