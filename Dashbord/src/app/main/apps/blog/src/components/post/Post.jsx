import "./post.css";
import { Link } from "react-router-dom";


import Parser from 'html-react-parser';

export default function Post({ post }) {
  
  const PF = "https://backendtimeline.herokuapp.com/images/";
  return (
    <div className="post">
      
      <a href={`/pages/blog/singlepost/${post._id}`} className="column " id = "grayscale" >{post.photo && <img src={PF + post.photo} alt="" />}
</a>
      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((c) => (
            <span className="postCat">{c.name}</span>
          ))}
        </div>
        <Link  style={{color:"black"}} to={`/pages/blog/singlepost/${post._id}`}>
          
          <font className="postTitle">{post.title}</font>
        </Link>
        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}<br/>
          &emsp;&emsp;{new Date(post.createdAt).toLocaleTimeString()}
        </span>
      </div>
      <p className="postDesc">{Parser(post.desc)}</p>
    


    
    </div>
    
  );
}
