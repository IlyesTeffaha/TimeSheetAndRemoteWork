const Users = require ('../models/userModel')
const bcrypt = require ('bcrypt')
const jwt = require ('jsonwebtoken')
const ResetToken = require("../models/resetToken")
const {sendError,createRandomBytes} = require('../utils/helper')
const{generateOTP,mailTransport}=require('../utils/mail');
const crypto = require ('crypto')
const nodemailer = require('nodemailer');
const {comparePassword} =require('../models/userModel')
const UserProfile = require ('../models/userProfileModel')
//const {CLIENT_URL}=process.env

const userController ={
    register:async(req, res, next) => {
        try {
            const{name,email,password,passwordConfirm,gender,birthday,tel,category}=req.body
            if(!name || !email || !password || !passwordConfirm || !gender || !birthday || !tel || !category)
            return res.status(400).json({msg: "please fill in all the fields "})

            if(!validateEmail(email))
            return res.status(400).json({msg: "please enter an valide adress email "})
            const user =await Users.findOne({email})
            if (user) return res.status(400).json({msg:"this email already exists"})
            if (password.length<6)
            return res.status(400).json({msg: "password must be at least 6 caracters "})
            if(passwordConfirm!=password)
            return res.status(400).json({msg: "unmatched passwords "})
            const passwordHash = await bcrypt.hash(password,12)
            console.log({password,passwordHash})

            //const newUser ={
              // name,email,password:passwordHash,passwordHash,gender,birthday,tel,category
           // }
           // const activation_token =createActivationToken(newUser)
           // const url =`${CLIENT_URL}/user/activate/${activation_token}`
            //sendMail(email,url)
            let new_user = new Users ({
                
                name:req.body.name,
                email:req.body.email,
                password:req.body.password,
                passwordConfirm:req.body.passwordConfirm,
                gender:req.body.gender,
                birthday:req.body.birthday,
                tel:req.body.tel,
                category:req.body.category,
                
               
               
        });
        
        
            await new_user.save()
            
            
            res.json({msg:"Register success please activate your account"})
        }
        catch (err){
            return res.status(500).json({msg:err.message})

        }
    },
    login:async(req, res, next)=>{
        
        try {
            const user = await Users.findOne({email:req.params.email});
           
            if (!user) return res.status(400).send('email is not found');
            
            if (req.params.password!=user.password)return res.status(400).send('invalid password');
            //res.send('logged in');
            ///create and assign a token 
            const token = jwt .sign({_id:user._id},process.env.TOKEN_SECRET);
           // res.header('auth-token',token).send(token);
           if (!token)return res.status(401).send('access denied');
           const verified =jwt.verify(token,process.env.TOKEN_SECRET);
            req.user = verified;
            ////
            const {email}=req.params
            const userprofile = await UserProfile.findOne({email:req.params.email});
            await UserProfile.find({email}).then((result)=>{
                res.send(result);
            })
            ////
           // res.json('welcome to you');
            next();
        }catch(err){
            return res.status(500).json({msg:err.msg})

        }
        
    },
    access:async(req, res, next) => {
        try{
            const user ={
                password :'1234546789',
                email:'maissa@gmail.com'
            }
            
              
            jwt.sign({user:user}, 'secretkey',(err,token)=>{
                res.header('auth-token',token).send(token);
            });
        }catch (err){
            return res.status(500).json({msg:err.message})
        }
    },
    forgotPassword:async(req, res) => {
    const {email} = req.body;
    if(!email) return res.status(400).json({msg: "watch error please provide a valid email "})
    const user= await Users.findOne({email});
    if(!user) return sendError(res,"User not found , invalid resquest");

    const token =await ResetToken.findOne({owner:user._id})
    if(token) return sendError(res,"only after one hour you can request for another token");
    const randomBytes = await createRandomBytes();
    const OTP =generateOTP()
    const resetToken = new ResetToken({owner:user._id,token:randomBytes});
    await resetToken.save();
    ////////
    




    //////////    
    mailTransport().sendMail({
        from:"security@email.com",
        to: user.email,
        subject:"password Reset",
        //html:generatePasswordResetTemplate(`https://backendtimeline.herokuapp.com/userRouter?token=${token}&id=${user._id}`),
        html:`<h1>${OTP}</h1>`
        
    });
    res.json({success:true,message:'password reset link is sent to your mail'})
    },
    resetpassword:async(req, res) =>{
     const {password} = req.body;
     //const user = await Users.findById(req.user._id)
    try{
        const user = await Users.findOne({email:req.body.email});

        await Users.findOneAndUpdate(
             
             { _id:user._id},
             { password:req.body.password},
             { email:req.body.email},
        );
        await ResetToken.findOneAndDelete({owner:req.params.id});
        mailTransport().sendMail({
            from:"security@email.com",
            to: user.email,
            subject:"password Reset successfully",
            //html:generatePasswordResetTemplate(`https://backendtimeline.herokuapp.com/userRouter?token=${token}&id=${user._id}`),
            html:`<h1>password reset successfully now you can login with your new password</h1>`
            
        });  
        res.json({succes:true,message:"password Reset successfully"}) 
    }catch (err){
        return res.status(500).json({msg:err.message})
    }

     
     
     
    

    }


    
    
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
///verifey token
function verifytoken(req,res,next){
    const barerHeader = req.headers['authorization'];
    if (typeof barerHeader!=='undefined'){

    }
    else{
        res.status(403).json({msg:"forbiden"})
    }
}
const createActivationToken =(payload) => {
    return jwt.sign(payload,process.env.ACTIVATION_TOKEN_SECRET,{expiresIn:'100m'})
}
const createAcessToken =(payload) => {
    return jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'101m'})
}
const createRefreshToken =(payload) => {
    return jwt.sign(payload,process.env.REFRESH_TOKEN_SECRET,{expiresIn:'200m'})
}


module.exports =userController