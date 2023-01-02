const router = require ('express').Router()
const postscontroller = require('../controllers/postscontroller')


router.post('/accesss',postscontroller.accesss)
module.exports = router;

