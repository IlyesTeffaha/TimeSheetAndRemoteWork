import axios from "axios";
import {useEffect, useState ,useRef} from "react";
import { useLocation } from "react-router";
import useStyles from './styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import {Typography ,Grid,Button } from '@material-ui/core/';
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
import {Bar} from 'react-chartjs-2';

export default function Reports() {
const teamid=window.location.pathname;
const teamidd=teamid.slice(50,74);
console.log(teamidd);
const projectid=window.location.pathname;
const projectidd=projectid.slice(25,49);
console.log(projectidd);
  const location = useLocation();
  const classes = useStyles();
  const projectnamee=window.location.pathname;
  const projectname=projectnamee.slice(75,);

  
  const url3 = 'https://backendtimeline.herokuapp.com/';
  
  const [teamName, setName] = useState([]);
  useEffect(() => {
    const getName = async () => {
      const uri=`${url3}api/team/findName/${teamidd}`;
      const res = await axios.get(uri);
      ;
      setName(res.data);
    };
    getName();
  }, setName); 




  const [phases, setPhases] = useState([]);
  useEffect(() => {
    const getPhases = async () => {
      const uri=`${url3}phases/count/${projectidd}`;
      const res = await axios.get(uri);
      ;
      setPhases(res.data);
    };
    getPhases();
  }, setPhases); 




 const [highs, setHighs] = useState([]);
 useEffect(() => {
   const getHighs = async () => {
     const uri=`${url3}phases/high/${projectidd}`;
     const res = await axios.get(uri);
     ;
     setHighs(res.data);
   };
   getHighs();
 }, setHighs); 
 

/*  const [Passed, setPassed] = useState([]);
 useEffect(() => {
   const getPassed = async () => {
     const uri=`${url3}api/deadlinepassed/high/${projectidd}`;
     const res = await axios.get(uri);
     ;
     setHighs(res.data);
   };
   getHighs();
 }, setHighs); */
 const [Today, setToday] = useState([]);
 useEffect(() => {
   const getToday = async () => {
     const uri=`${url3}phases/deadlineToday/${projectidd}`;
     const res = await axios.get(uri);
     ;
     setToday(res.data);
   };
   getToday();
 }, setToday);
 const [Passed, setPassed] = useState([]);
 useEffect(() => {
   const getPassed = async () => {
     const uri=`${url3}phases/deadlinePassed/${projectidd}`;
     const res = await axios.get(uri);
     ;
     setPassed(res.data);
   };
   getPassed();
 }, setPassed);
 const [Members, setMembers] = useState([]);
 useEffect(() => {
   const getMembers = async  () => {
     const uri=`${url3}api/team/find/member/${teamidd}`;
     const res = await axios.post(uri);
     ;
     setMembers(res.data);
   };
   getMembers();
 }, setMembers);
const [Totals, setTotals] = useState([]);
useEffect(()=>{

   Members.map((member) =>{
   const uri=`${url3}api/phasesbyprogress/${member._id}`;
   const res = axios.get(uri).then();
   setTotals(res.data);
   console.log(res.data)
  })
   
   
  
 } )
const pdfExportComponent =useRef(null);
const handleExportwithComponent=(event)=>{
 pdfExportComponent.current.save();
}


const state1 = {
  labels: ['Amir', 'Ilyes', 'Jalel'],
  datasets: [
    {
      label: 'phases Done',
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [3, 5, 4, 0]
    }
  ]
}
const state2 = {
  labels: ['Amir', 'Ilyes', 'Jalel'],
  datasets: [
    {
      label: 'phases In Progress',
      backgroundColor:'#c04b4b',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [2, 1, 3, 0]
    }
  ]
}
  return (
      <div>

      <PDFExport  ref={pdfExportComponent} paperSize="A4" >
    <div className="flex flex-col justify-between flex-1 min-w-0 px-24 pt-24">
    <div className="flex justify-between items-center">
      <div className="flex items-center min-w-0">
        <div className="mx-12 min-w-0">
          <Typography className="text-18 sm:text-24 md:text-32 font-bold leading-none mb-8 tracking-tight">
          {projectname}
          </Typography>
          <div className="flex items-center opacity-60 truncate">
            <Typography className="text-12 sm:text-14 font-medium mx-4 truncate">
             By : {teamName}
            </Typography>
          </div>
        </div>
      </div>     
    </div>
  </div>
 <div>
 <Grid className={classes.container} container alignItems="stretch" spacing={3}>
 <Grid item xs={6} sm={3} md={3}>
 <Paper className="w-full rounded-20 shadow flex flex-col justify-between">
 <div className="text-center py-12">
        <Typography className="text-72 font-semibold leading-none text-blue tracking-tighter">
            {phases}
        </Typography>
        <Typography className="text-18 text-blue-800 font-normal">
        Phases
        </Typography>
        <Typography
        className="p-20 pt-0 h-56 flex justify-center items-end text-13 font-medium"
        color="textSecondary">
        <span className="truncate">Completed</span>:
        <b className="px-8">4</b>
      </Typography>
</div>
</Paper>
</Grid>
<Grid item xs={6} sm={3} md={3}>
 <Paper className="w-full rounded-20 shadow flex flex-col justify-between">
 <div className="text-center py-12">
 <Typography className="text-72 font-semibold leading-none text-orange tracking-tighter">

           {highs}
        </Typography>
        <Typography className="text-18 font-normal text-orange-800">

        High Priority
        </Typography>
        <Typography
        className="p-20 pt-0 h-56 flex justify-center items-end text-13 font-medium"
        color="textSecondary"
      >
        <span className="truncate">Closed</span>:
        <b className="px-8">0</b>
      </Typography>
</div>
</Paper>
</Grid> 
<Grid item xs={6} sm={3} md={3}>
<Paper className="w-full rounded-20 shadow flex flex-col justify-between">
 <div className="text-center py-12">
 
        <Typography className="text-72 font-semibold leading-none text-red tracking-tighter">  
        {Passed}
        </Typography>
        <Typography className="text-18 font-normal text-red-800">
        Overdue
        </Typography>
        <Typography
        className="p-20 pt-0 h-56 flex justify-center items-end text-13 font-medium"
        color="textSecondary"
      >
        <span className="truncate">Today</span>:
        <b className="px-8">2</b>
      </Typography>
</div>
</Paper>
</Grid>
 
<Grid item xs={6} sm={3} md={3}>
 <Paper className="w-full rounded-20 shadow flex flex-col justify-between">
 <div className="text-center py-12">
 <Typography className="text-72 font-semibold leading-none text-green tracking-tighter">

           {Today}
        </Typography>
        <Typography className="text-18 font-normal text-green-800">

       Todo
        </Typography>
        <Typography
        className="p-20 pt-0 h-56 flex justify-center items-end text-13 font-medium"
        color="textSecondary"
      >
        <span className="truncate">Today</span>
        <b className="px-8"></b>
      </Typography>
</div>
</Paper>
</Grid>
 
</Grid>
 </div>
 <div className="flex flex-col justify-between flex-1 min-w-0 px-24 pt-24">
    <div className="flex justify-between items-center">
      <div className="flex items-center min-w-0">
        <div className="mx-12 min-w-0">
          <Typography className="text-18 sm:text-24 md:text-32 font-bold leading-none mb-8 tracking-tight">
           {teamName}
          </Typography>
        </div>
      </div>     
    </div>
  </div>
 <div>
 <Paper className="w-full rounded-20 shadow overflow-hidden">
      <div className="flex items-center justify-between p-20 h-64">
        <Typography className="text-16 font-medium">Team Member</Typography>
        <Typography className="text-11 font-500 rounded-4 text-white bg-blue px-8 py-4">
        
        </Typography>
      </div>
      <div className="table-responsive">
        <Table className="w-full min-w-full" size="small">
          <TableHead>
            <TableRow>
             
                      <TableCell className="whitespace-nowrap p-8 px-16">
                       Name
                      </TableCell>
                   
                      <TableCell >
                        <Typography
                          color="textSecondary"
                          className="font-semibold whitespace-nowrap p-8 px-16"
                        >
                         Total phases
                        </Typography>
                      </TableCell>
                      <TableCell >
                        <Typography
                          color="textSecondary"
                          className="font-semibold whitespace-nowrap p-8 px-16"
                        >
                         Phases in progress
                        </Typography>
                      </TableCell>
                      <TableCell >
                        <Typography
                          color="textSecondary"
                          className="font-semibold whitespace-nowrap p-8 px-16"
                        >
                         Phases Done
                        </Typography>
                      </TableCell>
                      <TableCell >
                        <Typography
                          color="textSecondary"
                          className="font-semibold whitespace-nowrap p-8 px-16"
                        >
                         Member performance
                        </Typography>
                      </TableCell>
                   
                
            </TableRow>
          </TableHead>
          <TableBody>
          {Members.map((member) =>
              <TableRow className="h-64">
               
                        <TableCell  component="th" scope="row" className="px-16">{member.name} </TableCell>
                          
                        
                        
          
                        <TableCell component="th" scope="row" className="truncate"> {Totals}
                         
                        </TableCell>
                        <TableCell component="th" scope="row" className="truncate">0
                         
                         </TableCell>
                         <TableCell component="th" scope="row" className="truncate">3
                         
                         </TableCell>
                         <TableCell component="th" scope="row" className="truncate">5
                         
                         </TableCell>
              </TableRow>
       )}  
          </TableBody>
        </Table>
        
      </div>
    </Paper>
   
 </div>
 <div>
 <Grid className={classes.container} container alignItems="stretch" spacing={3}>
 <Grid item xs={6} sm={6} md={6}>
        <Bar
          data={state1}
          options={{
            title:{
              display:true,
              text:'Members Performance',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
       </Grid>
       <Grid item xs={6} sm={6} md={6}>
        <Bar
          data={state2}
          options={{
            title:{
              display:true,
              text:'Members Performance',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
       </Grid></Grid></div>
       </PDFExport>
 <Button size="small" color="secondary" onClick={handleExportwithComponent}><h1>Export Reports to Pdf</h1></Button>
  </div>
  );
}