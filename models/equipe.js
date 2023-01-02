const mongoose = require('mongoose');
const EquipeSchema = new mongoose.Schema({
    id: {
        type: String,
        
        // unique: true,
        
      },
      creator:{
        type:String,
        
    },
    nom :{
        type:String,
        
    },
    desc: {
        type:String
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    members : [
        {type: mongoose.Schema.Types.ObjectId,ref:'UserProfile'}
    ]
},{
    timestamps: true
})
EquipeSchema.pre('save', function (next) {
    this.id = this.get('_id'); // considering _id is input by client
    next();
  });

module.exports = mongoose.model('Equipe',EquipeSchema);

