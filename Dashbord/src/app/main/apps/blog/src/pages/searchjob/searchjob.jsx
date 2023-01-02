
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { render } from "react-dom";
import { useLocation } from "react-router";
import './searchjob.css'
import axios from "axios";
//import { Button } from "@material-ui/core";
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import useStyles from './styles';
import { Card, CardActions, CardContent, CardMedia, Button, Typography,Grid,Item ,TextField} from '@material-ui/core/';



export default function searchjob() {
    const { search } = useLocation();
    const classes = useStyles();
    const [title, setTitle] = useState('');
    const [job, setJob] = useState('');
    const [objects,setObjects]=useState([]);

    const handleSearch = async () => {
        try { 
          await axios.get(`https://backendtimeline.herokuapp.com/${job.title} `, {
            // name:data.name,
            title,
            desc,
          });
          setUpdateMode(false)
        } catch (err) {}
      };
    //   const fetchPhases = () => axios.get(url2);
    //   const url1 = 'https://backendtimeline.herokuapp.com/projects';

      const handleSubmit = async (e) => {
        e.preventDefault();
        const job={title}     
        
          const res = await axios.get(`https://backendtimeline.herokuapp.com/searchjob/${title}`);
          console.log(...res.data)
        //   setData({data:res.data})
        //   console.log(data)
        setObjects(res.data)
        console.log(objects)
       
      };
   

    
return(<div>
<form onSubmit={handleSubmit}>
<div >
  
<input type="text" value={job.title} onChange={e=>setTitle(e.target.value)}
 placeholder="            Search for jobs" className="searchinput" id="input" />
<Button className="searchbtn"  type="submit" >SEARCH</Button>

</div>

<div className="allinfos"><Grid className={classes.container} container alignItems="stretch" spacing={2}>
{objects.map((p) => ( 
  <Grid  item xs={12} sm={12} md={12}>
    <div>
    <Card className={classes.card}><h2 ><a target="_blank">    {p.title}</a>     </h2>
   <div  className={classes.diva}><h2> 𝐂𝐨𝐦𝐩𝐚𝐧𝐲 𝐍𝐚𝐦𝐞 : {p.companyname}</h2></div>
   {/* <div className={classes.datediv}>{p.date}</div> */}

   <div className={classes.place}>  <h4 >𝐖𝐨𝐫𝐤 𝐏𝐥𝐚𝐜𝐞: {p.place}    </h4></div>
   <Button className="details"> <a href={`https://timesheetleague.herokuapp.com/apps/blog/singlejob/`+ p.id} target="_blank">view details</a> </Button>
   </Card>

    </div>  
    </Grid>  ))}
    
    </Grid>

</div>
</form>
</div>

    
)


}