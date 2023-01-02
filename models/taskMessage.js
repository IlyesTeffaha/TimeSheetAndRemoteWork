const mongoose =require('mongoose') ;

const taskSchema = mongoose.Schema({
  id: {
    type: String,
    
    // unique: true,
    
  },
  title: {
        type: String,
        default: 'Task',
        unique: true,
      },
      notes: {
        type: String,
        default: 'nothing',
      },
      phaseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'PhaseMessage',
        required:false,
      },
      users: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'UserProfile',
        required:false,
      },
      members : [
        {type: mongoose.Schema.Types.ObjectId,ref:'Member'
      ,required:true},
        
    ],
      // phaseId: {
      //   type: String,
      //   required: false
      // },
      dueDate: {
        type: Date,
        required: true
      },
      startDate: {
        type: Date,
        default:Date.now(),
        required: false,
      },
      completed: {
        type: Boolean,
        default: false
      },
      starred: {
        type: Boolean,
        default: false
      },
      important: {
        type: Boolean,
        default: false
      },
      deleted: {
        type: Boolean,
        default: false
      },
      labels: {
        type: Array,
        required: false,
      },
      emailvalue: {
        type: String,
        required: false,
      },
      
      
})
taskSchema.pre('save', function (next) {
  this.id = this.get('_id'); // considering _id is input by client
  next();
});

var TaskMessage = mongoose.model('Tasks', taskSchema);

module.exports= TaskMessage;