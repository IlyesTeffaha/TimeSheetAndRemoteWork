const express = require('express');


const equipecontroller =require('../controllers/equipeController')
const router = express.Router();

router.get('/',  equipecontroller.getEquipes);
router.post('/',  equipecontroller.createEquipe);
router.get('/:id',  equipecontroller.getEquipe);
router.patch('/:id',  equipecontroller.updateEquipe);
router.delete('/:id',  equipecontroller.deleteEquipe);
router.post('/addMember/:id', equipecontroller.addMember);
router.delete('/deleteMember/:id', equipecontroller.deleteMember);
router.get('/findEquipe/:id',equipecontroller.findEquipe);
// router.get('/findMember/:id',equipecontroller.findMemberInTeam);


module.exports=router;