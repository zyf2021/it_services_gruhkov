const {Router} =require('express')
//const User = require('../models/users.model')


const auth = require('../middleware/auth.middleware')
const authAdmin = require('../middleware/authAdmin.middleware')
const request_userControllers = require('../controllers/request_userControllers')

const router = Router()

router.post('/request_create', /*auth,*/ request_userControllers.request_create)
router.post('/request_update', /*auth,authAdmin*/ request_userControllers.request_update)

router.get('/user_requests', /*auth,*/ request_userControllers.getUserRequests)
router.get('/all_requests', /*auth, authAdmin,*/ request_userControllers.getAllRequests)


module.exports = router