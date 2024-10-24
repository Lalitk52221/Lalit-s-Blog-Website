import React, { useState } from "react";
import "../../Style/Writing.css";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
const Writing = () => {
  const [title, setTitle] = useState("");
  const [blogtext, setBlogtest] = useState("");
  const [photourl, setPhotourl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        "https://blogifyr1-backend.onrender.com/api/blog/createblog",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, blogtext, photourl }),
        }
      );
      if (!response.ok) {
        const errordata = await response.json();
        console.log(response);
        setError(errordata.message || "Invalid data");
        setLoading(false);
        return;
      }
      setLoading(false);
      navigate("/");
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };
  return (
    <div className="writing">
      <form action="" method="post" onSubmit={handleSubmit}>
        <h2>Write your new blog here</h2>
        <input
          type="text"
          className="title-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Type your Blog Title here"
        />
        <textarea
          name=""
          id=""
          rows={10}
          value={blogtext}
          onChange={(e) => setBlogtest(e.target.value)}
          placeholder="start typing here"
        />

        <input
          type="text"
          className="photo-input"
          id="photo"
          value={photourl}
          onChange={(e) => setPhotourl(e.target.value)}
          placeholder="Paste Photo URl"
        />

        <button type="submit">Post </button>
      </form>
      <div>{loading && <Loading />}</div>
      {error && <p>{error}</p>}
      {/* <div>
        {blogtext.split('\n').map((line, index) => (
          <p key={index}>{line} <br /></p>
        ))}
      </div> */}
      <div>
        {/* <p style={{ whiteSpace: "pre-wrap" }}>{blogtext}</p> */}
      </div>
    </div>
  );
};

export default Writing;
