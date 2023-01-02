const express=require('express')
const mongoose=require('mongoose')

const PostMessage=require('../models/postMessage')

const router = express.Router();

module.exports.getPosts = async (req, res) => { 
    try {
        const postMessages = await PostMessage.find();
                
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
module.exports.getPostsDeadlineToday = async (req, res) => { 
    const datetime = new Date();
    const today=datetime.toISOString().slice(0,10);
    try {
        const postMessages = await PostMessage.find({endDate:{$gte:new Date(new Date(today).setHours(00, 00, 00))}});
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
module.exports.getPostsDeadlinePassed = async (req, res) => { 
    const datetime = new Date();
    const today=datetime.toISOString().slice(0,10);
    try {
        const postMessages = await PostMessage.find({endDate:{$lt:new Date(new Date(today).setHours(00, 00, 00))}});
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

module.exports.getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


module.exports.createPost = async (req, res) => {
    const { name, description, selectedFile, creator, tags , startDate , endDate , project_id,emailvalue,teamid,} = req.body;

    const newPostMessage = new PostMessage({ name, description, selectedFile, creator, tags , startDate , endDate , project_id,emailvalue,teamid})

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


module.exports.updatePost = async (req, res) => {
    const { id } = req.params;
    const { name, description, selectedFile, creator, tags , startDate , endDate ,project_id,teamid} = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { name, description, selectedFile, creator, tags , startDate , endDate, _id: id , project_id,teamname };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}


module.exports.deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}


module.exports.likePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await PostMessage.findById(id);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
    
    res.json(updatedPost);
}

module.exports.getprojectbyuser = async (req,res)=>{
    const emailvalue= req.query.user;
    try{
        let projects;
        projects = await PostMessage.find({emailvalue});
        res.status(200).json(projects);
    }catch(err){
        res.status(500).json(err)
    }
}