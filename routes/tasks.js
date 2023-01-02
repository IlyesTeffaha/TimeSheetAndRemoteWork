const express =require('express') ;

const taskcontroller=require('../controllers/tasks.js');


const router = express.Router();

router.get('/', taskcontroller.getTasks);
router.get('/findByPhase/:id', taskcontroller.getTasksByPhaseId);
router.post('/', taskcontroller.createTask);
router.get('/:id', taskcontroller.getTask);
router.patch('/:id', taskcontroller.updateTask);
router.delete('/:id', taskcontroller.deleteTask);
router.patch('/:id/likeTask', taskcontroller.likeTask);
// router.patch('/assignTask/:id1/:id2', taskcontroller.assignTask);
// router.get('/date-deadline/:endDate/:startDate', taskcontroller.getTasksByDateRange);
router.get('/due-tasks/deadline', taskcontroller.AllDueTasksToday);
router.get('/due-tasks/no-deadline', taskcontroller.AllNotDueTasksToday);
router.post('/addMember/:id', taskcontroller.addMember);

module.exports=router;