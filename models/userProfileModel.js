const mongoose = require('mongoose')
const bcrypt = require ("bcrypt");


const userProfileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter your name"],
        trim:true
    },
    email:{
        type:String,
        required:[true,"please enter your email"],
        trim:true,
        unique:true
    },
    adress:{
        type:String,
        //required:[true,"please enter your locations"],
        trim:true
    },
    aboutme:{
        type:String,
        //required:[true,"please enter your about me"],
        trim:true
    },
    gender:{
        type:String,
        required:[true,"please enter your gender"],
        trim:true
    },
    birthday:{
        type:String,
        required:[true,"please enter your birthday"],
        trim:true
    },
    tel:{
        type:String,
        required:[true,"please enter your tel"],
        trim:true
    },
    // category:{
    //     type:String,
    //     required:[true,"please enter your category"],
    //     trim:true
    // },
    occupation:{
        type:String,
        //required:[true,"please enter your birthday"],
        trim:true
    },
    skill:{
        type:String,
        //required:[true,"please enter your tel"],
        trim:true
    },
    job:{
        type:String,
        //required:[true,"please enter your category"],
        trim:true
    },
    status:{
        type:String,
        //required:[true,"please enter your category"],
        trim:true
    },
    password:{
        type:String,
        required:[true,"please enter your pass"],
        trim:true
    },
    passwordConfirm:{
        type:String,
        required:[true,"please enter your paswwconfirm"],
        trim:true
    },
    

    
    
    

});
/*userSchema.pre("save",async function(next) {
    if(this.isModified("password")){
        const hash = await bcrypt.hash(this.password,8);
        this.password =hash;
    }
    next();
});*/


module.exports =mongoose.model("UserProfile",userProfileSchema)