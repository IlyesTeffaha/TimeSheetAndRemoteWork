const router = require ('express').Router()
const userController = require('../controllers/userController')


router.post('/register',userController.register)
router.get('/login/:email/:password',userController.login)
router.post('/access',userController.access)
router.post('/forgotpassword',userController.forgotPassword)
router.post('/resetpassword',userController.resetpassword)


module.exports=router


