const mongoose = require("mongoose");

const PostblogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: false,
   
    },
    desc: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: false,
    },
    emailvalue: {
      type: String,
      required: false,
    },
    categories: {
      type: Array,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Postblog", PostblogSchema);
