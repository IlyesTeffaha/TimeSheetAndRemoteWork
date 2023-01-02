const mongoose = require('mongoose');
const TeamSchema = new mongoose.Schema({
    id: {
        type: String,
        
        // unique: true,
        
      },
    name :{
        type:String,
        
    },
    description: {
        type:String
    },
    members : [
        {type: mongoose.Schema.Types.ObjectId,ref:'Member'}
    ]
},{
    timestamps: true
})
TeamSchema.pre('save', function (next) {
    this.id = this.get('_id'); // considering _id is input by client
    next();
  });

module.exports = mongoose.model('Team',TeamSchema);