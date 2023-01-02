const Users = require ('../models/userModel')
const bcrypt = require ('bcrypt')
const jwt = require ('jsonwebtoken')

const postscontroller ={
    accesss:async(req, res, next) =>{
        const token = req.header('auth-token');
        if (!token)return res.status(401).send('access denied');
    
        try{
            const verified =jwt.verify(token,process.env.TOKEN_SECRET);
            req.user = verified;
            res.json('welcome to you');
            next();
    
        }catch(err){
            res.status(400).send('invalid token');
            
        }
    }
}
module.exports =postscontroller