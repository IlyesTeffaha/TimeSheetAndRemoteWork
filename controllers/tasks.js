const express= require('express') ;
const mongoose= require ('mongoose');
const UserProfile= require('../models/userProfileModel');
const teamMember= require('../models/member');
const TaskMessage = require('../models/taskMessage.js') ;

const router = express.Router();
module.exports.getTasksByPhaseId = async (req, res) => { 
    try {
        
        const taskMessages = await TaskMessage.find({phaseId:req.params.id}).populate('members');
                
        res.status(200).json(taskMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

module.exports.getTasks = async (req, res) => { 
    try {
        const taskMessages = await TaskMessage.find().populate('members');
                
        res.status(200).json(taskMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

module.exports.getTask = async (req, res) => { 
    const { id } = req.params;

    try {
        const task = await TaskMessage.findById(id).populate('members');
        
        res.status(200).json(task);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
module.exports.createTask = async (req, res) => {
        
        
        // const { name, description, userId,phaseId , deadline , estTime,completed } = req.body;
        const { id,title, notes,  dueDate , startDate,completed, starred,important,deleted, labels,users,members,phaseId } = req.body;
        // const newTaskMessage = new TaskMessage({ name, description, userId,phaseId , deadline , estTime,completed  })
    const newTaskMessage = new TaskMessage({ id,title, notes,  dueDate , startDate,completed, starred,important,deleted, labels,users,members,phaseId })
    await UserProfile.updateMany({ '_id': newTaskMessage.users }, { $push: { tasks: newTaskMessage._id } });
        try {
            await newTaskMessage.save();
    
            res.status(201).json(newTaskMessage );
        } catch (error) {
            res.status(409).json({ message: error.message });
        }
    }

    module.exports.addMember = async (req,res)=>{

        const { id } = req.params;
        const  {members} = req.body;
    
       const task =  await TaskMessage.findById(id);
       const member = await teamMember.findById(members);
    
       task.members.push(member);
    
       try {
        await task.save();
    
        res.status(201).json(task );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
    
    }

// module.exports.createTasks = async (req, res) => {
//     const {phaseId}=req.params;
    
//     // const { name, description, userId,phaseId , deadline , estTime,completed } = req.body;
//     const { id,title, notes,  dueDate , startDate,completed, starred,important,deleted, labels } = req.body;
//     // const newTaskMessage = new TaskMessage({ name, description, userId,phaseId , deadline , estTime,completed  })
// const newTaskMessage = new TaskMessage({ id,title, notes,  dueDate , startDate,completed, starred,important,deleted, labels,phaseId  })
//     try {
//         await newTaskMessage.save();

//         res.status(201).json(newTaskMessage );
//     } catch (error) {
//         res.status(409).json({ message: error.message });
//     }
// }

module.exports.updateTask = async (req, res) => {
    const { id } = req.params;
    // const { name, description, userId,phaseId , deadline , estTime,completed } = req.body;
    const { title, notes,  dueDate , startDate,completed, starred,important,deleted, labels,members } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No task with id: ${id}`);

    const updatedTask = { title, notes,  dueDate , startDate,completed, starred,important,deleted, labels,members, id: id };
    // const updatedTask = { title, notes,  dueDate , startDate,completed, starred,important,deleted, labels, id: id };
    await TaskMessage.findByIdAndUpdate(id, updatedTask, { new: true });

    res.json(updatedTask);
}

module.exports.deleteTask = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No task with id: ${id}`);

    await TaskMessage.findByIdAndRemove(id);

    res.json({ message: "task deleted successfully." });
}

module.exports.likeTask = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No task with id: ${id}`);
    
    const post = await TaskMessage.findById(id);

    const updatedTask = await TaskMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
    
    res.json(updatedTask);
}

module.exports.getTasksByDateRange = async(req, res) => {

    try {
       
    
        let { dueDate, startDate } = req.query;
    
       if(startDate === '' || dueDate === '') {
       return res.status(400).json({
           status:'failure',
           message: 'Please ensure you pick two dates'
            })
           }
    
     
       console.log({ startDate, dueDate});
    
    
    
    const tasks = TaskMessage.find({ 
      cDate: {
            $gte: new Date(new Date(startDate).setHours(00, 00, 00)),
            $lt: new Date(new Date(dueDate).setHours(23, 59, 59))
             }
      }).sort({ c: 'asc'}) ; 
      res.status(200).json({
        data: tasks
           })
    
    } catch(error) {
      return res.status(500).json({
         error: error.message
            });
     }
    
    }
    module.exports.AllDueTasksToday = async (req, res) => { 
        const datetime = new Date();
        const today=datetime.toISOString().slice(0,10);
        try {
           // (endDate.toISOString().slice(0,10)):datetime
            const taskMessages = await TaskMessage.find({dueDate:{$gte:new Date(new Date(today).setHours(00, 00, 00))}}).count();
            //console.log(postMessages.endDate.toISOString().slice(0,10)) ;
           // console.log(now);
                
            res.status(200).json(taskMessages);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
    module.exports.AllDueTasksToday = async (req, res) => { 
        const datetime = new Date();
        const today=datetime.toISOString().slice(0,10);
        try {
           // (endDate.toISOString().slice(0,10)):datetime
            const taskMessages = await TaskMessage.find({dueDate:{$gte:new Date(new Date(today).setHours(00, 00, 00))}});
            //console.log(postMessages.endDate.toISOString().slice(0,10)) ;
           // console.log(now);
                
            res.status(200).json(taskMessages);
            
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    module.exports.AllNotDueTasksToday = async (req, res) => { 
        const datetime = new Date();
        const today=datetime.toISOString().slice(0,10);
        try {
           // (endDate.toISOString().slice(0,10)):datetime
            const taskMessages = await TaskMessage.find({dueDate:{$lt:new Date(new Date(today).setHours(00, 00, 00))}});
            number=0;
            taskMessages.forEach(function(task,index,err){
                number+=1;
            })
            //console.log(postMessages.endDate.toISOString().slice(0,10)) ;
           // console.log(now);
           res.status(200).json(number);
            // res.status(200).json(taskMessages);
            
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    module.exports.assignTask = async (req, res) => {
        const { id1 } = req.params;
        const { id2}= req.params;
        
        
        if (!mongoose.Types.ObjectId.isValid(id1)) {return res.status(404).send('No project with id:');}
        
    
        const assignTask = {id: id1  ,userId : id2 };
    
        await TaskMessage.findByIdAndUpdate(id1, assignTask, { new: true });
    
        res.json(assignTask);
    }



