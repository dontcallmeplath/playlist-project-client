import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { updateUser } from "../../managers/ServiceManager";
import "../../main.css";

export const ProfileView = () => {
  const email = useRef();
  const first_name = useRef();
  const last_name = useRef();
  //   figure out how to get access to profile image thru creator table
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  const handleUpdate = (e) => {
    e.preventDefault();

    const user = {
      username: email.current.value,
      email: email.current.value,
      first_name: first_name.current.value,
      last_name: last_name.current.value,
      password: "password",
    };

    updateUser(user, userId, token).then(() => {
      localStorage.setItem("name", first_name.current.value);
      navigate("/");
    });
  };

  return (
    <section className="">
      <form className="" onSubmit={handleUpdate}>
        <h1 className="">UPDATE PROFILE</h1>

        <div className="">
          <label className="">Email</label>
          <div className="">
            <input
              className=""
              type="text"
              style={{
                minHeight: "30px",
                fontSize: "15px",
                fontFamily: "monospace",
              }}
              ref={email}
            />
          </div>
        </div>

        <div className="">
          <label className="">First Name</label>
          <div className="">
            <input
              className=""
              type="text"
              style={{
                minHeight: "30px",
                fontSize: "15px",
                fontFamily: "monospace",
              }}
              ref={first_name}
            />
          </div>
        </div>

        <div className="">
          <label className="">Last Name</label>
          <div className="">
            <input
              className=""
              type="text"
              style={{
                minHeight: "30px",
                fontSize: "15px",
                fontFamily: "monospace",
              }}
              ref={last_name}
            />
          </div>
        </div>

        <div className="">
          <div className="">
            <button className="" type="submit">
              Submit
            </button>
          </div>
          <div className="">
            <Link to="/" className="">
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </section>
  );
};
