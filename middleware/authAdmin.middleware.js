const User = require('../models/users.model')

const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = async (req, res, next) => {
    try {
        const user = await User.findOne({_id: req.user.userId})
        if (user.role !== "ADMIN"){
            return res.status(500).json({message:"Права администратора недоступны"})
        }
        next()
  } catch (e) {
    res.status(401).json({ message: e.message })
  }
}