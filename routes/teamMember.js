const express = require('express');
const router = new express.Router;
const Team = require('../controllers/team');
const Member = require('../controllers/member');
router.get('/',(req,res)=>res.send('ok'));
// team routes
router.post('/team/create',Team.create);
router.get('/team/find',Team.find);
router.post('/team/find/member/:id', Team.membersByTeam);
router.delete('/team/delete/:id', Team.delete)
router.patch('/team/update/:id', Team.update)
router.get('/team/findName/:id', Team.findName)
// member routes
router.post('/member/create/:id', Member.create);
router.post('/member/find',Member.find);
router.post('/member/populate/:id',Member.teamByMember);
//router.delete('/member/delete/:id/:idm',Member.deleteMember)
//jalel
router.get('/getphases/:memberid',Member.phasecompletionbymember);
router.get('/phasesbyprogress/:id',Member.phasesnumberbyprogress);
router.get('/scorebymember/:id',Member.calculscore);


module.exports = router;