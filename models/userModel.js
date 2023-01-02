const mongoose = require('mongoose')
const bcrypt = require ("bcrypt");


const userSchema = new mongoose.Schema({
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
    password:{
        type:String,
        required:[true,"please enter your password"],
        trim:true
    },
    passwordConfirm:{
        type:String,
        required:[true,"please enter your passwod confirm"],
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
    category:{
        type:String,
        required:[true,"please enter your category"],
        trim:true
    },
    equipe :{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Equipe'
  },
    

    
    
    

});
/*userSchema.pre("save",async function(next) {
    if(this.isModified("password")){
        const hash = await bcrypt.hash(this.password,8);
        this.password =hash;
    }
    next();
});*/
userSchema.methods.comparePaswword = async function(password){
    const result = await bcrypt.compareSync(password,this.password);
    return result;
};

module.exports =mongoose.model("Users",userSchema)