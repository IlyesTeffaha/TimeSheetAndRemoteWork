const express = require('express');


const phasecontroller =require('../controllers/phase')
const router = express.Router();


router.get('/',  phasecontroller.getPhases);
router.post('/',  phasecontroller.createPhase);
router.get('/:id',  phasecontroller.getPhase);
router.patch('/:id',  phasecontroller.updatePhase);
router.delete('/:id',  phasecontroller.deletePhase);
router.patch('/:id/likePhase',  phasecontroller.likePhase);
router.get('/count/:id',  phasecontroller.CountPhase);
router.get('/high/:id',  phasecontroller.CountHigh);
router.get('/medium/:id',  phasecontroller.CountMedium);
router.get('/low/:id',  phasecontroller.CountLow);
router.get('/deadlineToday/:id',  phasecontroller.getPhasesDeadlineToday);
router.get('/deadlinePassed/:id',  phasecontroller.getPhasesDeadlinePassed);


module.exports=router;