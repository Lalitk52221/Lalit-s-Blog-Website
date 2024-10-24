import React, { useEffect, useState } from "react";
import "../../Style/AllBlog.css";
import { useDispatch } from "react-redux";
import { showNavItem } from "../Redux/Slicer";
import { MdDelete, MdEdit } from "react-icons/md";
const AllBlog = () => {
  const [fetchData, setFetchData] = useState([]);
  const [error, setError] = useState("");
  const dispatch = useDispatch()
  const fetchBlog = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/blog", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      dispatch(showNavItem()) 
      setFetchData(data.data.Blogs);
    } catch (err) {
      setError(err.message);
    }
  };

  
  const handleDelete = async(id)=>{
    try{
      const confirmDelete = window.confirm("Are you sure want to delete your blog");
      if(!confirmDelete) return;
      
      const response = await fetch(` http://localhost:4000/api/blog/${id}`,{
        method:"DELETE",
        headers:{
          "Content-Type":"application/json"
        }
      })
      const data = await response.json();
     if(response.ok){
       setFetchData((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
       alert(data.message || "Blog deleted Successfully")
      }else{
        setError(data.message || "Failed to delete Blog")
      }
      // setFetchData(data);

    }catch(err){
      setError(err.message)
    }
  }

  useEffect(() => {
    fetchBlog();
    // handleDelete()
  }, []);
  return (
    <div className="home">
      {fetchData.map((data) => (
        <div key={data._id} className="blog-card">
          <div className="edit-del">
          <MdDelete className="del-blog" onClick={()=>handleDelete(data._id)} /> 
          <MdEdit className="edit-blog"/>

          </div>
          <img src={data.photourl} alt="" />
          <h3>
            {data.title}{" "}
          </h3>
          <p style={{ whiteSpace: "pre-wrap" }}> {data.blogtext && data.blogtext.trim()} </p>
          
        </div>
      ))}
      {error && <p>{error}</p>}
    </div>
  );
};

export default AllBlog;
