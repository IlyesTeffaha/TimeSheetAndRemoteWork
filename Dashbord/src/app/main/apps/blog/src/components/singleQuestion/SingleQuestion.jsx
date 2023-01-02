import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./singleQuestion.css";
import Parser from 'html-react-parser';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import EditorToolbar, { modules, formats } from "../../pages/write/editortoolbar";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import UpdateIcon from '@material-ui/icons/Update';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';


export default function SingleQuestion() {
  const location = useLocation();
  const path = location.pathname;
  const [question, setQuestion] = useState({});
 
  // const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [data, setData] = useState();
  const emailvalue = localStorage.getItem("emailvalue");
  

  useEffect(() => {
    const getQuestion = async () => {
      const res = await axios.get("/questions/" + path);
      setQuestion(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      
    };
    getQuestion();
  }, [path]);

  const handleChange=(value)=>{
    setDesc(value);
  }


  const handleDelete = async () => {
    try {
      await axios.delete(`/questions/${question._id}`, {
        // data: { username: user.username },
      });
      window.location.replace("/apps/blog/blog-questions");
    } catch (err) {console.log(err)}
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/questions/${question._id}`, {
        // username: user.username,
        title,
        desc,
      });
      setUpdateMode(false)
    } catch (err) {}
  };

  return (
    <div className="singleQuestion">
      <div className="singleQuestionWrapper">
       
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singleQuestionTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singleQuestionTitle">
            {title}
            {question.emailvalue === emailvalue && (
              <div className="singleQuestionEdit">
               
                <Tippy content="Update question ?" ><UpdateIcon className="deleteicon"
                 
                 onClick={() => setUpdateMode(true)}/></Tippy>

 <Tippy content="Delete question ?" ><DeleteOutlineIcon className="deleteicon"
                 
                 onClick={handleDelete}/></Tippy>
              </div>
            )}
          </h1>
        )}
        <div className="singleQuestionInfo">
          <span className="singleQuestionAuthor">
            Asked by:
            <Link to={`/apps/blog/allquestions?user=${emailvalue}`} >
              <font className="linkc"> {question.emailvalue}</font>
            </Link>
          </span>
          <span className="singleQuestionDate">
            {new Date(question.createdAt).toDateString()}
          </span>
        </div>

        
        {updateMode ? (
          <div className="tools">
          <EditorToolbar />
          <ReactQuill
            className="singleQuestionDescInput"
            type="text"
            value={desc}
            modules={modules}
            formats={formats}
            onChange={handleChange}
          /></div>
        ) : (
          <p className="singleQuestionDesc">{Parser(desc)}</p>
        )}


        {updateMode && (
          <button className="singleQuestionButton" onClick={handleUpdate}>
            Confirm Update
          </button>
        )}
      </div>
    </div>
  );
}
