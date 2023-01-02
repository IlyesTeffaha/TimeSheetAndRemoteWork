const router = require("express").Router();
const User = require("../models/userModel");
const Question = require("../models/Question");

//CREATE QUESTION
router.post("/", async (req, res) => {
  const newQuestion = new Question(req.body);
  try {const savedQuestion = await newQuestion.save();
    
  } catch (error) {
    res.status(500).json(error);
  }
    
  
});

//UPDATE QUESTION
router.put("/:id", async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (question.name === req.body.name) {
      try {
        const updatedQuestion = await Question.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedQuestion);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your question!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE QUESTION
router.delete("/:id", async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (question.name === req.body.name) {
      try {
        await question.delete();
        res.status(200).json("Question has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your Question!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET QUESTION
router.get("/pages/blog/singlequestion/:id", async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    res.status(200).json(question);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL QUESTIONS
router.get("/", async (req, res) => {
  const emailvalue = req.query.user;
  const catName = req.query.cat;
  try {
    let questions;
    if (emailvalue) {
        questions = await Question.find({ emailvalue });
    } else if (catName) {
        questions = await Question.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
        questions = await Question.find();
    }
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET FOUR QUESTIONS
router.get("/four", async (req, res) => {
  try {
    let questions;
    const limit = 4;
        questions = await Question.find().limit(limit);
    
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json(err);
  }
});

//SORT BY TITLE A-Z
router.get("/sortasc", async (req, res) => {
  try {
    let questions;
   
        questions = await Question.find().sort( { title: 1 } )
    
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json(err);
  }
});

//SORT BY TITLE Z-A
router.get("/sortdesc", async (req, res) => {
  try {
    let questions;
   
        questions = await Question.find().sort( { title: -1 } )
    
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
