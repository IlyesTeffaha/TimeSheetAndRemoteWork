import "./allquestions.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { render } from "react-dom";
import { useLocation } from "react-router";
import Questions from "../../components/questions/Questions";
import axios from "axios";
import { Button } from "@material-ui/core";
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';




export default function AllQuestions() {
    const { search } = useLocation();
    
    const [questions, setQuestions] = useState([]);
    useEffect(() => {
        const fetchQuestions = async () => {
          const res = await axios.get("/questions" + search);
          setQuestions(res.data);
        };
        fetchQuestions();
      }, [search]);

      const SortAsc = async () => {
        try {
            const res =  await axios.get("/questions/sortasc"+search); 
            setQuestions(res.data);
          
        } catch (err) {console.log(err)}
      };

      const SortDesc = async () => {
        try {
            const res =  await axios.get("/questions/sortdesc"+search); 
            setQuestions(res.data);
          
        } catch (err) {console.log(err)}
      };


    
return(
<div>
<div className="sortbtns">
    <Tippy content="SORT A-Z">
    <KeyboardArrowUpIcon onClick={SortAsc} className="deleteicon"

/>
    </Tippy>
<br />
    <Tippy content="SORT Z-A">
    <KeyboardArrowDownIcon onClick={SortDesc} className="deleteicon"

/>
    </Tippy>
    
</div>
<Questions questions={questions} />

</div>
    
)


}