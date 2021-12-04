const Users = require('../models/users.model')

const config = require('config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userControllers = {
    getUserInfo: async (req, res) => {
        try {
            //const user = await Users.findById({_id:req.user.userId}).select('-password')
            //console.log("USER", user)
            //res.json(user)
        } catch (e) {
            return res.status(500).json({message: e.message})
        }
    },
    getUsersAllInfo: async (req, res) => {
        try {
            /*const users = await Users.find().select('-password')
            res.json(users)*/
        } catch (e) {
            return res.status(500).json({message: e.message})
        }
    }
}
module.exports = userControllers
