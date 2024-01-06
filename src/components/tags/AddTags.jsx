import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postAsset } from "../../managers/ServiceManager";

export const AddTag = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [isUnsuccessful, setisUnsuccessful] = useState(false);
  const label = useRef();

  const handleUpdate = (e) => {
    e.preventDefault();

    const data = {
      label: label.current.value,
    };

    postAsset("tags", token, data).then((res) => {
      console.log(res);
      if (res.label == label.current.value) {
        navigate("/tags");
      } else {
        setisUnsuccessful(true);
      }
    });
  };

  return (
    <section className="">
      <form className="" onSubmit={handleUpdate}>
        <h1 className="">ADD TAG</h1>

        <div className="">
          <label className="">Tag</label>
          <div className="">
            <input className="" type="text" ref={label} />
          </div>
        </div>

        <div className="">
          <div className="">
            <button className="" type="submit">
              Submit
            </button>
          </div>

          <div className="">
            <Link to="/tags" className="">
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
