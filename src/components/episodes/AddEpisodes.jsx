import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postAsset } from "../../managers/ServiceManager";

export const AddEpisode = () => {
  // series_name, episode_name, serial, description, image, rating
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [isUnsuccessful, setisUnsuccessful] = useState(false);
  const ratings = ["TV-Y", "TV-Y7", "TV-G", "TV-PG", "TV-14", "TV-MA"];
  const series_name = useRef();
  const episode_name = useRef();
  const serial = useRef();
  const description = useRef();
  const image = useRef();
  const rating = useRef();

  const handleUpdate = (e) => {
    e.preventDefault();

    const data = {
      series_name: series_name.current.value,
      episode_name: episode_name.current.value,
      serial: serial.current.value,
      description: description.current.value,
      image: image.current.value,
      rating: rating.current.value,
    };

    postAsset("episodes", token, data).then(() => {
      // if (res.id > 0) {
      navigate("/episodes");
      // } else {
      //   setisUnsuccessful(true);
      // }
    });
  };

  return (
    <section className="">
      <form className="" onSubmit={handleUpdate}>
        <h1 className="">ADD EPISODE</h1>

        <div className="">
          <label className="">Series Name</label>
          <div className="">
            <input className="" type="text" size="50" ref={series_name} />
          </div>
        </div>
        <div className="">
          <label className="">Episode Name</label>
          <div className="">
            <input className="" type="text" size="50" ref={episode_name} />
          </div>
        </div>
        <div className="">
          <label className="">Serial</label>
          <div className="">
            <input className="" type="text" size="50" ref={serial} />
          </div>
        </div>
        <div className="">
          <label className="">Description</label>
          <div className="">
            <input className="" type="textarea" size="50" ref={description} />
          </div>
        </div>
        <div className="">
          <label className="">Image</label>
          <div className="">
            <input
              className=""
              type="url"
              pattern="https://.*"
              size="50"
              ref={image}
            />
          </div>
        </div>
        <div className="">
          <label className="">Rating</label>
          <div className="">
            <select
              name="rating"
              id="rating-select"
              style={{ width: "245px", height: "25px", textAlign: "center" }}
              ref={rating}
            >
              <option></option>
              {ratings.map((rating) => (
                <option key={rating}>{rating}</option>
              ))}
            </select>
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
