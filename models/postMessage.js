const mongoose=require ('mongoose')

const postSchema = mongoose.Schema({
    name: String,
    description: String,
    emailvalue:String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    startDate: Date,
    endDate: Date,
    project_id: String,
    teamid :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Team'
    } 
    
   
})

var PostMessage = mongoose.model('PostMessage', postSchema);

module.exports=PostMessage;