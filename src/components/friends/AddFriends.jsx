import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postAsset } from "../../managers/ServiceManager";

export const AddFriend = () => {
  //   email, name, creator_id(added by create method)
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [isUnsuccessful, setisUnsuccessful] = useState(false);
  const email = useRef();
  const name = useRef();

  const handleUpdate = (e) => {
    e.preventDefault();

    const data = {
      email: email.current.value,
      name: name.current.value,
    };

    postAsset("friends", token, data).then((res) => {
      if (res) {
        navigate("/friends");
      } else {
        setisUnsuccessful(true);
      }
    });
  };

  return (
    <section className="">
      <form className="" onSubmit={handleUpdate}>
        <h1 className="">ADD FRIEND</h1>

        <div className="">
          <label className="">Name</label>
          <div className="">
            <input
              className=""
              type="text"
              style={{
                marginBottom: "15px",
                minHeight: "30px",
                fontSize: "15px",
                fontFamily: "monospace",
              }}
              ref={name}
            />
          </div>
        </div>

        <div className="">
          <label className="">Email</label>
          <div className="">
            <input
              className=""
              type="text"
              style={{
                marginBottom: "15px",
                minHeight: "30px",
                fontSize: "15px",
                fontFamily: "monospace",
              }}
              ref={email}
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
            <Link to="/friends" className="">
              Cancel
            </Link>
          </div>
        </div>
        {isUnsuccessful ? (
          <p className="">Hmm.. Something is not right here</p>
        ) : (
          ""
        )}
      </form>
    </section>
  );
};
