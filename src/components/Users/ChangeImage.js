const { default: axios } = require("axios");
const { useState } = require("react");

const ChangeImage = ({ exit, refresh, priorImage }) => {
  const [image, setImage] = useState(null);
  const [remove, setRemove] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  const handleChange = (e) => setImage(e.target.files[0]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (image) formData.append("image", image);
    if (remove) formData.append("remove-image", true);

    axios
      .put("/users/update_image", formData, {})
      .then((res) => {
        setMessage(res.data?.msg);

        exit();
        refresh();
      })
      .catch((err) => {
        console.log(err.response);
        setError(err.response?.data?.err || err.response);
      });
  };

  return (
    <form
      className="updateImage"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      {message && <div className="message">{message}</div>}
      {error && <div className="error">{error}</div>}
      <label>
        Profile Picture
        <input type="file" name="image" onChange={handleChange}></input>
      </label>
      {priorImage && (
        <button type="submit" onClick={() => setRemove(true)}>
          Remove Current Image
        </button>
      )}

      <button type="submit">Submit</button>
    </form>
  );
};

export { ChangeImage };
