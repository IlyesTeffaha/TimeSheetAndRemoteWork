
const router = require("express").Router();
const Comment = require("../models/Comment");
const User =require("../models/User")


router.get('/', (req, res) => {
    Comment.find({rootId:null}).sort({postedAt: -1}).then(comments => {
      res.json(comments);
    });
  });
  
  router.get('/root/:rootId', (req, res) => {
    Comment.find({rootId:req.params.rootId}).sort({postedAt: -1}).then(comments => {
      res.json(comments);
    });
  });
  
  router.get('/:id', (req, res) => {
    Comment.findById(req.params.id).then(comment => {
      res.json(comment);
    });
  });
  
  router.post('/', async (req, res) => {
    
    const newComment = new Comment(req.body);
    try {
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
    }catch (err) {
        res.status(500).json(err);
      }
    
    
} );
// const token = req.cookies.token;
// if (!token) {
//   res.sendStatus(401);
//   return;
// }
// getUserFromToken(token)
//   .then(userInfo => {
//     const {title,body,parentId,rootId} = req.body;
//     const comment = new Comment({
//       title,
//       body,
//       author:userInfo.username,
//       postedAt:new Date(),                                                   
//       parentId,
//       rootId,
//     });
//     comment.save().then(savedComment => {
//       res.json(savedComment);
//     }).catch(console.log);
//   })
//   .catch(() => {
//     res.sendStatus(401);
//   });
// });




// router.post("/", async (req, res) => {
//     const newComment = new Comment(req.body);
    
//       const savedComment = await newComment.save();
    
//   });

// router.put("/:id", async (req, res) => {
//     try {
//       const post = await Post.findById(req.params.id);
//       if (post.username === req.body.username) {
//         try {
          // const updatedPost = await Post.findByIdAndUpdate(
          //   req.params.id,
          //   {
          //     $set: req.body,
          //   },
          //   { new: true }
          // );
//           res.status(200).json(updatedPost);
//         } catch (err) {
//           res.status(500).json(err);
//         }
//       } else {
//         res.status(401).json("You can update only your post!");
//       }
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });


module.exports=router;