const express = require('express')


const projectcontroller =require('../controllers/posts')
const router = express.Router();

router.get('/', projectcontroller.getPosts);
router.post('/', projectcontroller.createPost);
router.get('/:id', projectcontroller.getPost);
router.patch('/:id', projectcontroller.updatePost);
router.delete('/:id', projectcontroller.deletePost);
router.patch('/:id/likePost', projectcontroller.likePost);
router.get('/api/projects',projectcontroller.getprojectbyuser);
router.get('/api/deadline', projectcontroller.getPostsDeadlineToday);
router.get('/api/deadlinepassed', projectcontroller.getPostsDeadlinePassed);

module.exports=router;