const Users = require('../models/users.model')

const config = require('config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userControllers = {
    getUserInfo: async (req, res) => {
        try {
            const user = await User.findByPk(req.user.userId)
            res.json(user)
        } catch (e) {
            return res.status(500).json({message: e.message})
        }
    },
    getUsersAllInfo: async (req, res) => {
        try {
            const users = await User.findAll()
            res.json(users)
        } catch (e) {
            return res.status(500).json({message: e.message})
        }
    }
}
module.exports = userControllers
