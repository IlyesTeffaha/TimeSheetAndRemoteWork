import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
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
import './singlejob.css'

export default function SingleJobOffer() {
  const location = useLocation();
  const path = location.pathname.slice(21,);
  const [job, setJob] = useState({});
 
  // const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [companyname, setCompanyname] = useState(false);
  const [joblocation,setJoblocation]=useState();
  const [jobdesc,setJobdesc]=useState();
  const [data, setData] = useState();

  

  useEffect(() => {
    const getJob = async () => {
      const res = await axios.get("/offer/" + path);
      
      setTitle(res.data.title);
      setJobdesc(res.data.jobdesc);
      setJoblocation(res.data.joblocation);
      setCompanyname(res.data.companyname);
      setDate(res.data.jobdate);
      
    };
    getJob();
  }, [path]);
console.log(path)
 



  return (
    <div className="allinfos">
     <div className="title">
     {title}
     </div>
     <br />
     <div className="jobdate">{date}</div>
     
     <br />
     <div className="companyname">𝐂𝐨𝐦𝐩𝐚𝐧𝐲 𝐍𝐚𝐦𝐞 : {companyname}</div>
     
    
     <br />
     <div className="jobdesc">{jobdesc}</div>
     
    </div>
  );
}
