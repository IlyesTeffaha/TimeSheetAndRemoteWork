const express=require('express')
const mongoose=require('mongoose')

const PhaseMessage=require('../models/phaseMessage')

const router = express.Router();

module.exports.getPhases = async (req, res) => { 
    try {
        const phaseMessages = await PhaseMessage.find();
                
        res.status(200).json(phaseMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
module.exports.CountPhase = async (req, res) => { 
   
    
    try {
        
        const Count = await PhaseMessage.count({projectId:req.params.id});
          
        res.status(200).json(Count);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
module.exports.CountHigh = async (req, res) => { 
   
    
    try {
        
        const Count = await PhaseMessage.count({projectId:req.params.id,priority:"high"});
          
        res.status(200).json(Count);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
module.exports.CountMedium = async (req, res) => { 
   
    
    try {
        
        const Count = await PhaseMessage.count({projectId:req.params.id,priority:"medium"});
          
        res.status(200).json("this project has "+Count+" medium priority phases");
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
module.exports.CountLow = async (req, res) => { 
   
    
    try {
        
        const Count = await PhaseMessage.count({projectId:req.params.id,priority:"low"});
          
        res.status(200).json("this project has "+Count+" low priority phases");
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

//  module.exports.getPhase = async (req, res) => { 
//     const { id } = req.params;

//     try {
//         const post = await PhaseMessage.findById(id);
        
//         res.status(200).json(post);
//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// } 
module.exports.getPhase = async (req, res) => { 
   
    
    try {
        
        const post = await PhaseMessage.find({projectId:req.params.id});
          
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

module.exports.createPhase = async (req, res) => {
    const { name, description, selectedFile, creator, tags , startDate , endDate,priority,projectId,memberid,progress ,doneat} = req.body;

    const newPhaseMessage = new PhaseMessage({ name, description, selectedFile, creator, tags , startDate , endDate, priority,projectId,memberid,progress,doneat })

    try {
        await newPhaseMessage.save();

        res.status(201).json(newPhaseMessage );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


module.exports.updatePhase = async (req, res) => {
    const { id } = req.params;
    const { name, description, selectedFile, creator, tags , startDate , endDate ,priority ,memberid,progress,doneat} = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No phase with id: ${id}`);

    const updatedPhase = { name, description, selectedFile, creator, tags , startDate , endDate , priority, _id: id ,memberid,progress,doneat};

    await PhaseMessage.findByIdAndUpdate(id, updatedPhase, { new: true });

    res.json(updatedPhase);
}


module.exports.deletePhase = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No phase with id: ${id}`);

    await PhaseMessage.findByIdAndRemove(id);

    res.json({ message: "Phase deleted successfully." });
}


module.exports.likePhase = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No phase with id: ${id}`);
    
    const phase = await PhaseMessage.findById(id);

    const updatedPhase = await PhaseMessage.findByIdAndUpdate(id, { likeCount: phase.likeCount + 1 }, { new: true });
    
    res.json(updatedPhase);
}

module.exports.getPhasesDeadlineToday = async (req, res) => { 
    const datetime = new Date();
    const today=datetime.toISOString().slice(0,10);
   
    var count=0;
    try {
        const postMessages = await PhaseMessage.find({endDate:{$gte:new Date(new Date(today).setHours(00, 00, 00))}});
         postMessages.forEach(phase => {
            if (phase.projectId==req.params.id) {
                count+=1
            
            }
           
        });
      
        res.status(200).json(count );
       
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

    module.exports.getPhasesDeadlinePassed = async (req, res) => { 
        const datetime = new Date();
        const today=datetime.toISOString().slice(0,10);
       
        var count=0;
        try {
            const postMessages = await PhaseMessage.find({endDate:{$lt:new Date(new Date(today).setHours(00, 00, 00))}});
            postMessages.forEach(phase => {
                if (phase.projectId==req.params.id) {
                    count+=1
                
                }
               
            });
         
            res.status(200).json(count);
           
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
}
