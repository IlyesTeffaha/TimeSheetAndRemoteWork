const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  author: {type:String,required:false},
  title: {type:String},
  desc: {type:String,required:false},
  postedAt: {type:Date,required:false},
  parentId: {type:mongoose.ObjectId,required:false},
  rootId: {type:mongoose.ObjectId,required:false},
});


module.exports = mongoose.model("Comment", CommentSchema);