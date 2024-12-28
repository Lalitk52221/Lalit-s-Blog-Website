import React, { useEffect, useState } from "react";
import "../../Style/AllBlog.css";
import { useDispatch } from "react-redux";
import { showNavItem, updatePage } from "../Redux/Slicer";
import { MdDelete, MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
const AllBlog = () => {

  const BlogURL = "https://lalit-blog-backend.onrender.com/api/blog";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fetchData, setFetchData] = useState([]);
  const [error, setError] = useState("");
  
  const fetchBlog = async () => {
    try {
      const response = await fetch(BlogURL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if(!response.ok){
        throw new Error("Failed to fetch blog")
      }
      const data = await response.json();
      dispatch(showNavItem(true));
      setFetchData(data.data.Blogs);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure want to delete your blog"
      );
      if (!confirmDelete) return;

      const response = await fetch(`${BlogURL}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Failed to delete blog")
      }
        setFetchData((prevBlogs) =>
          prevBlogs.filter((blog) => blog._id !== id)
        );
      
    } catch (err) {
      setError(err.message);
    }
  };
 
  const handleEdit = (blog) => {
    const confirmUpdate = window.confirm("Are you sure want to udpate your blog")
    if(!confirmUpdate) return
    dispatch(updatePage(true))
    navigate("/update-blog", { state: { blog } });

  };
  
  useEffect(() => {
    fetchBlog();
  }, []);
  return (
    <div className="home">
      {fetchData.length > 0?(
       fetchData.map((data) => (
        <div key={data._id} className="blog-card">
          <div className="edit-del">
            <MdDelete
              className="del-blog"
              onClick={() => handleDelete(data._id)}
              aria-label="Delete-blog"
            />
            <MdEdit
              className="edit-blog"
              onClick={() => handleEdit(data)}
              aria-label="edit-blog"
            />
          </div>
          <img src={data.photourl} alt="" />
          <h3>{data.title} </h3>
          <p style={{ whiteSpace: "pre-wrap" }}>
            {" "}
            {data.blogtext && data.blogtext.trim()}{" "}
          </p>
        </div>
      )) 
      ):<p> <Loading/></p>}
      
      {error && <p>{error}</p>}
    </div>
  );
};

export default AllBlog;
