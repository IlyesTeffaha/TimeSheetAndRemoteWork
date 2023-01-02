import { useEffect, useState } from "react";
import "./write.css";
import axios from "axios";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import 'react-quill/dist/quill.bubble.css'; 
import EditorToolbar, { modules, formats } from "./editortoolbar";
import {useNavigate} from "react-router-dom";
import { useLocation } from "react-router";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

//////////////////////////////////////
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import React from 'react';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [categories,setCateg] = useState("");
  const [cats, setCats] = useState([]);
  
  const location = useLocation();
  const emailvalue = localStorage.getItem("emailvalue");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      emailvalue:emailvalue,
      title,
      desc,
      categories,
    };
    if (file) {
      const data =new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
        window.location.replace("/apps/blog/blog-home");
      } catch (err) {}
    }
    try {
      const res = await axios.post("/blogposts", newPost);
      console.log("created now");
      window.location.replace("/apps/blog/blog-home");
     
    } catch (err) {}
    window.location.replace("/apps/blog/blog-home");
  };

  const handleChange=(value)=>{
    setDesc(value);
  }


/////////////////////////////////////////

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");
      setCats(res.data);
    };
    getCats();
  }, setCats);


 

 

  

  ////////////////////////////////////

  return (
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
          <Tippy content="Upload Image ?"><AddCircleIcon className="writeIcon "/></Tippy>  
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={e=>setTitle(e.target.value)}
          />
        </div>


{/* /////////////////////////////////// */}
<div>
     
    <label htmlFor="catcon" className="catlabel">Select Category</label>
    
    <div className="catcontainer" id="catcon" >
          <select className="selectcat" placeholder="Category" value={categories} onChange={e=>setCateg(e.target.value)}>
            {cats.map((option) => (
              <option value={option.value}>{option.name}</option>
            ))}
          </select>
        </div>
    
    
    </div>

 {/* //////////////////////// */}

        <div className="writeFormGroup ">
        <div className="row tools"><EditorToolbar /></div>
        <div className=""><ReactQuill
          id="myfield" name="myfield"
            placeholder="Tell your story..."
            type="text"
            className="writeInput writeText"
            value={desc}
            modules={modules}
            formats={formats}
            onChange={handleChange}
          /></div>
        
          
        </div>

        
     

        <button className="writeSubmit" type="submit">
          Publish
        
        </button>
      </form>

   
   
   
   
    </div>
  );
}
