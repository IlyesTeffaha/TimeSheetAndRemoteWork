const mongoose=require ('mongoose')

const phaseSchema = mongoose.Schema({
    name: String,
    description: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
    startDate: Date,
    endDate: Date,
    finishedat: Date,
    priority: String,
    projectId: {
         required: true, 
         type: mongoose.Schema.Types.ObjectId, 
         ref: "PostMessage" },
    userId: {
        
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" },
    memberid : {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Member"},
        progress: { type: Boolean, default: false },
        doneat: Date, 

         
        
       
    
})

var PhaseMessage = mongoose.model('PhaseMessage', phaseSchema);

module.exports=PhaseMessage;