const Team = require('../models/team');

module.exports = {
    create : async (req, res) =>{
        const { name, description,id} = req.body;
        const team = await Team.create({
            name,
            description,
            id
        })

        return res.send(team)
    },

    find : async (req, res) => {
        const team = await Team.find()
        return res.send(team)
    },
    membersByTeam : async (req, res) => {
       const { id } = req.params;
       const team = await Team.findById(id).populate('members');

        res.send(team.members);
    },
    delete : async (req,res)=> {
        const { id } = req.params;
        Team.findByIdAndRemove(id)
        .then(Team => {
            if(!Team) {
                return res.status(404).send({
                    message: "Team not found with id " + req.params.id
                });
            }
            res.send({message: "Team deleted successfully!"});
        })

    },
    deleteMember:async(req, res)=>{

    },
    update : async(req,res,next) => {
        let teamID = req.body.id
    
        let updatedData = {
            name:req.body.name,
            description:req.body.description,
        }
        Team.findByIdAndUpdate(teamID, {$set: updatedData})
        .then(() => {
            res.json({
                message: 'team updated'
            })
        })
        .catch(error => {
            res.json({
                message:'error'
            })
        })
    },
    findName : async (req, res) => {
        const { id } = req.params;
        const team = await Team.findById(id)
        return res.send(team.name)
    },

}