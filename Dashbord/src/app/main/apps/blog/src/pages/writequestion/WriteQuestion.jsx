import { useContext,useEffect, useState } from "react";
import "./writequestion.css";
import axios from "axios";
// import { Context } from "../../context/Context";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import 'react-quill/dist/quill.bubble.css'; 
import EditorToolbar, { modules, formats } from "../write/editortoolbar";
import {useNavigate} from "react-router-dom";

import Header from "../../components/header/Header";
import Question from "../../components/questions/Questions";
import Sidebar from "../../components/sidebar/Sidebar";
import "./writequestion.css";
import { useLocation } from "react-router";
import Questions from "../../components/questions/Questions";
import Questionsearchbar from '../../components/questionsearchbar/questionsearchbar'
import Button from '@material-ui/core/Button';



export default function WriteQuestion() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  // const { user } = useContext(Context);
  const [questions, setQuestions] = useState([]);
  const { search } = useLocation();
  const [questionss, setQuestionss] = useState([]);
  const [show, setShow] = useState(false);
  const location = useLocation();

//searchbar get
  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await axios.get("/questions" + search);
      setQuestionss(res.data);
    };
    fetchQuestions();
  }, [search]);


  //four questions get
  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await axios.get("/questions/four" + search);
      setQuestions(res.data);
    };
    fetchQuestions();
  }, [search]);

  useEffect(() => {
    setShow(true);  }, []);

    const emailvalue = localStorage.getItem("emailvalue");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newQuestion = {
      emailvalue:emailvalue,
      title,
      desc,
    };
    try {
      const res = await axios.post("/questions", newQuestion);
      
      window.location.replace("https://timesheetleague.herokuapp.com/apps/blog/allquestions");
      window.location.replace("/apps/blog/allquestions");
      
    } catch (err) {}
  };

  const handleChange=(value)=>{
    setDesc(value);
  }




  return (
  <div >
   
    <div >
    <Questionsearchbar data={questionss} className="searchb"   placeholder="Search your question here .."
           />
      <form className="writequestionForm" onSubmit={handleSubmit}>
        <div className="writequestionFormGroup">
       
     <p className="newspan">Add a new question down below  &#8681; 
:</p> 
       
          <input
            type="text"
            placeholder="Title"
            className="writequestionInput"
            autoFocus={true}
            onChange={e=>setTitle(e.target.value)}
          />
        </div>




        <div className="ql-editor ">
        <div ><EditorToolbar /></div>
        <div ><ReactQuill
          
            placeholder="What's your question..."
            type="text"
            
            value={desc}
            modules={modules}
            formats={formats}
            onChange={handleChange}
            
          /></div>
        
          
        </div>


        
     

        <button className="writequestionSubmit" type="submit" href="https://timesheetleague.herokuapp.com/apps/blog/allquestions">
          Publish
        
        </button>
      </form>

   
    
      <>
      
      <div className="writequestionhome">
        <Questions questions={questions} />
        
      </div>
    </>

    </div>

<div className="viewmorebtnpo"> <Button href="/apps/blog/allquestions" className="viewmorebtn" size="medium" style={{width:"250px"}} >
           View All Questions
         </Button></div>
   
    </div>
   
  );
}


///////////////////////////////


