const db = require('../models')
const User = db.users
const Request_User = db.request_user

const config = require('config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const request_userControllers = {
    request_create: async (req, res) => {
        
        try {
            const now = new Date() 
            const {type, userId} = req.body
            const request = await Request_User.create({
                date_ask: now,
                type: type,
                userId: userId
            })
            res.json(request)
        } catch (e) {
            return res.status(500).json({message: e.message})
        }
    },
    request_update: async (req, res) => {
        
        try {
            const now = new Date() 
            const {id} = req.body
            const request = await Request_update({date_load: now},{
                where:{
                    id:id
                }
            })
            res.json(request)
        } catch (e) {
            return res.status(500).json({message: e.message})
        }
    },
    //NOT USER !!!!!!
    getUserRequests: async (req, res) => {
        try {
            const request = await Request_User.findByPk(req.user.userId)
            //const user = await Users.findById({_id:req.user.userId}).select('-password')
            //console.log("USER", user)
            res.json(request)
        } catch (e) {
            return res.status(500).json({message: e.message})
        }
    },
    getAllRequests: async (req, res) => {
        try {
            const request = await Request_User.findAll()
            res.json(request)
        } catch (e) {
            return res.status(500).json({message: e.message})
        }
    }
}
module.exports = request_userControllers
