const mongoose  = require('mongoose');
const MemberSchema = new mongoose.Schema({
   
    id: {
        type: String,
        
        // unique: true,
        
      },    name:{
        type:String,
    },
    email:{
        type:String,
    },
    role:{
        type: String,
        enum: ['Developer','Maintainer','Reporter','Guest'],
        default: 'Developer'
    },
    exp_date:{
        type: Date,
    },
    team :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Team'
    },
    tasks : [
        {type: mongoose.Schema.Types.ObjectId,ref:'TaskMessage'}
    ],
},{
    timestamps:true
})
MemberSchema.pre('save', function (next) {
    this.id = this.get('_id'); // considering _id is input by client
    next();
  });

module.exports = mongoose.model('Member',MemberSchema);