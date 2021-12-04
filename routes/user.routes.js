const {Router} =require('express')
const db = require('../models')
const User = db.users

const auth = require('../middleware/auth.middleware')
const authAdmin = require('../middleware/authAdmin.middleware')
const userControllers = require('../controllers/userController')

const router = Router()

//'/api/user/info'
router.get('/info', /*auth,*/ userControllers.getUserInfo)

//'/api/user/all_info'
router.get('/all_info', /*auth, authAdmin, */userControllers.getUsersAllInfo)


module.exports = router