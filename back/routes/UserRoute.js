const express =require('express')
const router =express.Router()
const { RegUser,loginUser, logOut, forgotPass, ResetPASS,getUserDetails } = require("../control/UserController")


router.route('/register').post(RegUser)
router.route('/login').post(loginUser)
router.route('/pass/forgot').post(forgotPass)
router.route('/pass/reset/:token').put(ResetPASS)
router.route('/logout').post(logOut)

router.route('/me').get(getUserDetails)

module.exports=router;