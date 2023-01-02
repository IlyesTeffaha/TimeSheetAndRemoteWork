const Member = require('../models/member');
const Team = require('../models/team');
const express=require('express')
const PhaseMessage=require('../models/phaseMessage')
const router = express.Router()

const mongoose=require('mongoose')

module.exports = {
    create : async (req, res) => {

        console.log(req.params);
        team = req.params;
        id = team.id;
        const { name,email} = req.body;
        const member = await Member.create({
            name,
            email,
            team:id
        });
        await member.save();

        const teamById = await Team.findById(id);

        teamById.members.push(member);
        await teamById.save();

        return res.send(teamById);
    },
    find : async (req, res) => {
        const member = await Member.find()
        return res.send(member)
    },
    teamByMember : async (req,res)=>{
        const { id } = req.params;
        const teamByMember = await Member.findById(id).populate('team');
        res.send(teamByMember);
    },
    deleteMember : async (req,res)=> {
        
        const { id } = req.params;
        const { idm } = req.params;
        console.log(id,idm);

        
        // const member = await Member.findById(idm);
        // await member.save();
        const teamById = await Team.findById(id);
        teamById.members.splice(Member.findById(idm));
        await teamById.save();
        

        
        
        return res.send(teamById);
    //     // console.log(req.params);
    //     // id = req.params.id;
    //     // idm = req.params.idm;

    //     // const team = await Team.findById(id);
        
    //     // const member = await Member.findByIdAndRemove(team.members[idm]);

    //     // res.send(member);
        
    //     //const member = await Member.findById(idm);
    //     //await member.save();
    //    //q const teamById = await Team.findById(id);
    //    //   Member.deleteOne(teamById.members[member]);
    //    // await teamById.save();
     },

      ///////////////////////jalel//////////////////////////

    ////////////////return % of completion of phases by each member////////
    phasecompletionbymember : async (req,res)=>{
        const memberid= req.params.memberid;
        var istrue=0;
        var isfalse=0;
        var summed;
        try{
            let phases;
            phases = await PhaseMessage.find({memberid});
            
            phases.forEach(phase => {
                if (phase.progress==true) {
                    istrue+=1
                }else{
                    isfalse+=1
                }
               
            });
            summed=(istrue/(isfalse+istrue)*100).toFixed(2)
            res.json(summed)
        }catch(err){
            res.status(500).json(err)
        }
    },
    //////////////////////return number of phases completed and in progress by each member/////
    phasesnumberbyprogress : async (req,res)=>{
        
        var nb_inprogress=0;
        var nb_done=0;
        var total_progress=[];
        // var progress=true;
        try{
            
        const phases = await PhaseMessage.find({memberid:req.params.id});
            
            // var done=phases.filter((i)=>i.progress===true);
            phases.forEach(phase => {
                if (phase.progress==true) {
                    nb_done+=1
                }else{
                    nb_inprogress+=1
                }
               
            });

            // var nb_done=don
            // var nb_inprogress=phases.filter((i)=>i.progress===false);
            // nb_inprogress=phases.find({progress:false}).count()

            // total_progress.push(nb_done)
            
total_progress.push(nb_done,nb_inprogress);
            res.status(200).json(total_progress)
        }catch(err){
            res.status(500).json(err)
        }
        

},
///////////////////calcul score for each member//////////////////////////
calculscore : async (req,res)=>{
    var istrue=0;
    var isfalse=0;
    var summed;    
    var time_won=0;
    var nb_done=0;
    var total_progress=[];
    var score;

    try{
        
    const phases = await PhaseMessage.find({memberid:req.params.id});
        
     
        phases.forEach(phase => {
            if (phase.progress==true) {
                time_won=(phase.endDate-phase.doneat)/100000000
            }
           
        });

phases.forEach(phase => {
    if (phase.progress==true) {
        istrue+=1
    }else{
        isfalse+=1
    }
   
});
summed=((istrue/(isfalse+istrue)*100).toFixed(2))/10
score=summed+time_won
    ////////////////////////////////////////    

        res.status(200).json(score)
    }catch(err){
        res.status(500).json(err)
    }},

///////////////////////////////////////////
    
    
}