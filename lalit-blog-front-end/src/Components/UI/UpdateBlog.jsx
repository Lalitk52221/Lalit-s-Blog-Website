import React, { useState } from "react";
import "../../Style/Writing.css";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { useSelector } from "react-redux";
const UpdateBlog = () => {

  const location = useLocation();
  const { blog } = location.state;
  const navigate = useNavigate();
  const isupdatePage = useSelector((state)=>state.navbarItem.isUpdatePage)
  const [title, setTitle] = useState(blog.title);
  const [blogtext, setBlogtext] = useState(blog.blogtext);
  const [photourl, setPhotourl] = useState(blog.photourl);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const BlogURL = "https://lalit-blog-backend.onrender.com/api/blog";
    

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedBlogData = { title, blogtext, photourl };
    try {
      setLoading(true);
      const response = await fetch(`${BlogURL}/${blog._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBlogData),
      });
      const data = await response.json();
      setLoading(false);
      if (response.ok) {
        navigate("/");
      } else {
        setError(data.message || "Failed to update blog");
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="writing">
      {loading && <Loading />}
      <form action="" method="post" onSubmit={handleUpdate}>
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
          onChange={(e) => setBlogtext(e.target.value)}
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

        <button type="submit">
            {isupdatePage === true ? <>Update</> : <>Post</>}
        </button>
      </form>
      <div>{loading && <Loading />}</div>
      {error && <p>{error}</p>}

      <div></div>
    </div>
  );
};

export default UpdateBlog;
