const router = require ('express').Router()
const userProfileController = require('../controllers/userProfileController')



router.post('/register',userProfileController.register)
router.get('/login/:email/:password',userProfileController.login)
router.get('/get/:email',userProfileController.get)
router.put('/put/:email',userProfileController.put)
router.post('/forgotpassword',userProfileController.forgotPassword)
router.post('/resetpassword',userProfileController.resetpassword)
router.get('/loginface/:email',userProfileController.loginface)
router.post('/googlelogin',userProfileController.googlelogin)




module.exports = router;