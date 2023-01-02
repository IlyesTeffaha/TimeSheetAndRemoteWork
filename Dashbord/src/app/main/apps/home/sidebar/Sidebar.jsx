import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {
  const [cats, setCats] = useState([]);
  const [tags, setTags] = useState([]);

const handleSubmit=async (e)=>{

 

  
  await axios(
    {method:"post",
    url:"/categories",
    data:{
      name:tags
    },
  });
 
}


  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");
      setCats(res.data);
    };
    getCats();
  }, setCats);
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">NOTICE</span>
        <img
          src="http://2.bp.blogspot.com/-w4Rm7v0geEg/UzmxA6HRPNI/AAAAAAAACf8/1_INH83ZmQ4/s1600/Communication_Image_Cloud-1024x666.jpg"
          alt="" className="imagen"
        />
        <p>
          Welcome everyone into our blog , we hope you contribute much to this active comunity and make this a safe space for learning purposes
          HAVE FUN 
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {cats.map((c) => (
            <Link to={`/apps/blog/blog-home?cat=${c.name}`} >
            <font className="sidebarListItem">{c.name}</font>
            </Link>
          ))}
        </ul>
      </div>


      <form onSubmit={handleSubmit} >
<input type="text"  onChange={(e)=>setTags(e.target.value)}
value={tags}  />
     
<button type="submit">
          ADD  
        </button>
      </form>



      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
        </div>
      </div>
    </div>
  );
}
