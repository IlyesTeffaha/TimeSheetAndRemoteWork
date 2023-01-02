import { useEffect, useState } from "react";
import "./header.css";
import SearchBar from "../searchbar/searchbar";
import axios from "axios";
import { useLocation } from "react-router";

export default function Header() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/blogposts" + search);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);

  return (
    <div>
      <div className="headerTitles">
        <span className="headerTitleSm">timeLINE</span>
        <span className="headerTitleLg">Blog</span>
      </div>
      <img
        className="headerImg"
        src="https://wallpapercave.com/uwp/uwp1937845.jpeg"
        alt=""
      />
      <SearchBar placeholder="search for an article..." data={posts}/>
    </div>
  );
}
