import { useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../managers/AuthManager";
import "./Login.css";

export const Register = () => {
  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const bio = useRef();
  const password = useRef();
  const verifyPassword = useRef();
  const passwordDialog = useRef();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (password.current.value === verifyPassword.current.value) {
      const newUser = {
        first_name: firstName.current.value,
        last_name: lastName.current.value,
        email: email.current.value,
        username: email.current.value,
        password: password.current.value,
        bio: bio.current.value,
      };

      registerUser(newUser).then((res) => {
        if ("valid" in res && res.valid) {
          localStorage.setItem("token", res.token);
          localStorage.setItem("id", res.id);
          localStorage.setItem("staff", res.staff);
          localStorage.setItem("name", res.name);
          navigate("/");
        }
      });
    } else {
      passwordDialog.current.showModal();
    }
  };

  return (
    <section className="auth-container">
      <form className="" onSubmit={handleRegister}>
        <h1 className="header">PLAYLIST PLAYTHINGS</h1>
        <p className="">Create an account</p>
        <div className="">
          <label className="">First Name</label>
          <div className="">
            <input
              className="auth-form-input"
              type="text"
              ref={firstName}
              size="40"
              style={{
                marginBottom: "15px",
                minHeight: "25px",
                fontSize: "15px",
                fontFamily: "monospace",
              }}
            />
          </div>
        </div>

        <div className="">
          <label className="">Last Name</label>
          <div className="">
            <input
              className="auth-form-input"
              type="text"
              ref={lastName}
              size="40"
              style={{
                marginBottom: "15px",
                minHeight: "25px",
                fontSize: "15px",
                fontFamily: "monospace",
              }}
            />
          </div>
        </div>

        <div className="">
          <label className=" ">Email</label>
          <div className=" ">
            <input
              className="auth-form-input"
              type="email"
              ref={email}
              size="40"
              style={{
                marginBottom: "15px",
                minHeight: "25px",
                fontSize: "15px",
                fontFamily: "monospace",
              }}
            />
          </div>
        </div>

        <div className="">
          <label className=" ">Password</label>
          <div className=" ">
            <div className="">
              <p className=" ">
                <input
                  className="auth-form-input"
                  type="password"
                  placeholder="Password"
                  ref={password}
                  size="30"
                  style={{
                    marginBottom: "15px",
                    minHeight: "25px",
                    fontSize: "15px",
                    fontFamily: "monospace",
                  }}
                />
              </p>
            </div>

            <div className="">
              <p className=" ">
                <input
                  className="auth-form-input"
                  type="password"
                  placeholder="Verify Password"
                  ref={verifyPassword}
                  size="30"
                  style={{
                    marginBottom: "15px",
                    minHeight: "25px",
                    fontSize: "15px",
                    fontFamily: "monospace",
                  }}
                />
              </p>
            </div>
          </div>
        </div>

        <div className="">
          <label className=" ">Bio</label>
          <div className=" ">
            <textarea
              className="textarea"
              placeholder="Tell us about yourself..."
              ref={bio}
              size="40"
              style={{
                marginBottom: "15px",
                minHeight: "120px",
                minWidth: "400px",
                fontSize: "15px",
                fontFamily: "monospace",
              }}
            ></textarea>
          </div>
        </div>

        <div className="  ">
          <div className=" ">
            <button className="button  " type="submit">
              Submit
            </button>
          </div>
          <div className=" ">
            <Link to="/login" className="button  ">
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </section>
  );
};
