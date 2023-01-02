const res = require('express/lib/response')
const Users = require ('../models/userModel')
const UserProfile= require('../models/userProfileModel')
const bcrypt = require ('bcrypt')
const jwt = require ('jsonwebtoken')
const crypto = require ('crypto')
const nodemailer = require('nodemailer');
const ResetToken = require("../models/resetToken")
const {sendError,createRandomBytes} = require('../utils/helper')
const{generateOTP,mailTransport}=require('../utils/mail')
    // const cp =require('child_process')
    const path = require('path')
    //  const childPy=require('./nodepython')
const fs = require('fs')
const { compareSync } = require('bcrypt')


const passport = require('passport');
const {OAuth2Client}=require('google-auth-library');
const client = new OAuth2Client("858670823663-h4tt0ejbnnevqmo298ki42uqa252lho3.apps.googleusercontent.com")




const {spawn}= require('child_process')



 





const userProfileController ={
    register:async(req, res, next) => {
        try{

            // const childPython=spawn('python',['run.py']);
            // childPython.stdout.on('data',(data) => {
            //     console.log(`stdout:${data}`)
            
            
            // });
            // childPython.stderr.on('data',(data) => {
            //     console.error(`stderr:${data}`)
            // });
            // childPython.on('close',(code) => {
            //     console.log(`child process exited with code ${code}`)
            
            // });










            // var child=cp.fork('./nodepython')
            const{email,name,password,passwordConfirm,gender,birthday,tel}=req.body
            //if( !email ||   !aboutme || !adress || !occupation || !skill || !job|| !status)
            if( !email ||   !name || !password || !passwordConfirm || !gender || !birthday|| !tel)
            return res.status(400).json({msg: "please fill in all the fields "})
            //const user = await UserProfile.findOne({email});
           // if (!user) return res.status(400).send('user not fount to continue adding other fields');
            let newprofile_user = new UserProfile ({
                
                name:req.body.name,
                email:req.body.email,
               
                gender:req.body.gender,
                birthday:req.body.birthday,
                tel:req.body.tel,
              
                password:req.body.password,
                passwordConfirm:req.body.passwordConfirm,
                aboutme:"",
                adress:"",
                occupation:"",
                skill:"",
                job:"",
                status:""
                
               
               
        });
        await newprofile_user.save()
            
            
        res.json({msg:"profile user sucess success please activate your account"})



        }catch(err)
        {
            return res.status(400).json({msg:err.message})
        }


    },
    get:async (req, res,next)=>{
        try{
            // const {email}=req.body
           // await UserProfile.findOneAndUpdate(
             
             //   { email:req.params.email})
             
            
            const userprofile = await UserProfile.findOne({email:req.params.email}).then((result)=>{
                res.send(result);
            });
            if (!userprofile) return res.status(400).send('user profile not found ');
            

        }catch(err){
            console.log(err);
        }
    },
    put:async (req, res)=>{
        try{
            const email= req.params.email
            const userprofile = await UserProfile.findOne({email})
            await UserProfile.findOneAndUpdate({email:userprofile.email},{
                gender:req.body.gender,
                birthday:req.body.birthday,
                aboutme:req.body.aboutme,
                name:req.body.name,
                occupation:req.body.occupation,
                skill:req.body.skill,
                job:req.body.job,
                adress:req.body.adress,
                tel:req.body.tel,
               
                status:req.body.status
            } )
            res.json({msg:"profile updated successufully"})
        
        }
        catch(err){
            res.send(err)

        }
    },
    login:async (req, res,next)=>{
       
        try {
            const user = await UserProfile.findOne({email:req.params.email});
           
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
    forgotPassword:async(req, res) =>{
        const {email} = req.body;
        if(!email) return res.status(400).json({msg: "watch error please provide a valid email "})
        const user= await UserProfile.findOne({email});
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
            from:"maissafarhani55@gmail.com",
            to: user.email,
            subject:"password Reset",
            html:`<a href="https://timesheetleague.herokuapp.com/pages/auth/reset-password">click me</a>`
            //html:`<h1>${OTP}</h1>`
            
        });
        res.json({success:true,message:'password reset link is sent to your mail'})  
    },
    resetpassword:async(req, res) =>{
        const {password} = req.body;
        
     //const user = await Users.findById(req.user._id)
    try{
        const user = await UserProfile.findOne({email:req.body.email});
        if(!user) return("user not found");
        
        await UserProfile.findOneAndUpdate(
             
            {email:user.email},
             {password:req.body.password},
            
        );
        await ResetToken.findOneAndDelete({owner:user._id});
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

     
     
     
    

    },
    loginface: async(req, res,next) => {
    
       
        const info=fs.readFile('./data.txt','utf8',function(err, data){ 
        result=[];
        const content = data;
        a=content.slice(1,content.length-1)
         var tab = a.split(",");  
         
        for(var i = 0; i < tab.length; i++){ 
        // console.log(tab[i].substring(tab[i].lastIndexOf(":")+3,tab[i].lastIndexOf("")-1));
        result.push(tab[i].substring(tab[i].lastIndexOf(":")+3,tab[i].lastIndexOf("")-1));
        console.log(result[i]);
           
      
         }
         const userprofile =  UserProfile.findOne({$and:[{email:req.params.email},{password: { $in:result }}]
         }).then(resultat=>{
           
            return res.send(resultat);
           
          })
          if(!userprofile) return  res.json({msg:"user not found"})
                    

                });
    
            }  ,
    googlelogin:async (req, res,next)=>{
        const {tokenId}=req.body;
        client.verifyIdToken({idToken:tokenId, audience:"858670823663-h4tt0ejbnnevqmo298ki42uqa252lho3.apps.googleusercontent.com"}).then(response=>{
            const{email_verified,name,email}=response.payload;
            //console.log(response.payload);
            if(email_verified){
            UserProfile.findOne({email}).exec((err,user)=>{
                if(err){
                    return res.status(400).json({error:"something went wrong !!!"})
                }else{
                    if(user){
                        const token=jwt.sign({_id:user._id},process.env.JWT_SIGNIN_KEY)
                        const {_id,name,email}=user;
                        res.json({
                            token,
                            user:{_id,name,email}
                        })
                    }else{
                        let password = email+process.env.JWT_SIGNIN_KEY;
                        let newUser= new UserProfile({name,email,password});
                        newUser.save((err,data)=>{
                            if(err){
                                return res.status(400).json({error:"something went wrong !!!"})
                            }
                            const token=jwt.sign({_id:data._id},process.env.JWT_SIGNIN_KEY)
                            const {_id,name,email}=newUser;
                            res.json({
                                token,
                                user:{_id,name,email}
                            })

                        })
                    }
                }
            })
        }
        })
        console.log();
    }
  
 
    

}
module.exports =userProfileController