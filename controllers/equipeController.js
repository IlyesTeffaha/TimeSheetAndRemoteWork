const express=require('express')
const mongoose=require('mongoose')

const Equipe=require('../models/equipe')
const User = require('../models/userProfileModel')

const router = express.Router();

module.exports.getEquipes = async (req, res) => { 
    try {
        const Equipes = await Equipe.find();
                
        res.status(200).json(Equipes);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


module.exports.getEquipe = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await Equipe.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


module.exports.createEquipe = async (req, res) => {
    const { nom, desc,  creator, createdAt } = req.body;

    const newEquipe = new Equipe({ nom, desc, creator, createdAt })

    try {
        await newEquipe.save();

        res.status(201).json(newEquipe );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


module.exports.updateEquipe = async (req, res) => {
    const { id } = req.params;
    const { nom, desc, creator, createdAt  } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Equipe with id: ${id}`);

    const updatedEquipe = { nom, desc, creator, createdAt,id: id };

    await Equipe.findByIdAndUpdate(id, updatedEquipe, { new: true });

    res.json(updatedEquipe);
}


module.exports.deleteEquipe = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Equipe with id: ${id}`);

    await Equipe.findByIdAndRemove(id);

    res.json({ message: "Equipe deleted successfully." });
}
module.exports.findEquipe = async (req,res) => {
    const { id } = req.params;
    const equipe = await Equipe.findById(id);
    return res.send(equipe.members)
   
        
}
module.exports.findMemberInTeam = async (req,res) => {
    const { id } = req.params;
    const Member = await User.findById(id).populate('equipe');
    res.send(Member);

}

module.exports.addMember = async (req,res)=>{

    const { id } = req.params;
    const  {userId} = req.body;

   const equipe =  await Equipe.findById(id);
   const user = await User.findById(userId);

   equipe.members.push(user);

   try {
    await equipe.save();

    res.status(201).json(equipe );
} catch (error) {
    res.status(409).json({ message: error.message });
}

}
module.exports.deleteMember = async (req,res) => {
    const { id } = req.params;
    const  {userId} = req.body;

    const equipe =  await Equipe.findById(id);
    const user = await User.findById(userId);

   

    equipe.members.splice(user,1);

    try {
        await equipe.save();

        res.status(201).json(equipe );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }

}


/*
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
        
        
        */ 

// module.exports.likePhase = async (req, res) => {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No phase with id: ${id}`);
    
//     const phase = await PhaseMessage.findById(id);

//     const updatedPhase = await PhaseMessage.findByIdAndUpdate(id, { likeCount: phase.likeCount + 1 }, { new: true });
    
//     res.json(updatedPhase);
// }

