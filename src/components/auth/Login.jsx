import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../managers/AuthManager.jsx";
import "./Login.css";

export const Login = () => {
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
        localStorage.setItem("id", res.id);
        localStorage.setItem("token", res.token);
        localStorage.setItem("name", res.name);
        navigate("/");
      } else {
        setisUnsuccessful(true);
      }
    });
  };

  return (
    <div className="auth-container">
      <section className="">
        <form className="" onSubmit={handleLogin}>
          <h1 className="header">PLAYLIST PLAYTHINGS</h1>
          <p className="">Please sign in</p>

          <div className="">
            <label className="">Username</label>
            <div className="auth-form">
              <input
                className="auth-form-input"
                type="text"
                ref={username}
                size="40"
                style={{
                  marginBottom: "15px",
                  minHeight: "25px",
                  fontSize: "15px",
                  fontFamily: "monospace",
                  textAlign: "center",
                }}
              />
            </div>
          </div>

          <div className="">
            <label className="">Password</label>
            <div className="auth-form">
              <input
                className="auth-form-input"
                type="password"
                ref={password}
                size="40"
                style={{
                  marginBottom: "15px",
                  minHeight: "25px",
                  fontSize: "15px",
                  fontFamily: "monospace",
                  textAlign: "center",
                }}
              />
            </div>
          </div>

          <div className="">
            <div className="">
              <button className="" type="submit">
                Submit
              </button>
            </div>
            <div className="register-link">
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
    </div>
  );
};
