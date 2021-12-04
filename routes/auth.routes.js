const {Router} = require('express')
const router = Router()

const db = require('../models')
const User = db.users

const userControllers = require('../controllers/userController')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {jwtSecret} = require('config')
const {check, validationResult} = require('express-validator')



router.post('/register',
    [
        check('first_name', 'Введите имя').notEmpty(),
        check('last_name', 'Введите фамилию').notEmpty(),
        check('email', 'Некорректный email').isEmail(),
        check('password','Минимальная длина пароля 6 символов').isLength({min:6})
    ],
    async (req, res) =>{
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при регистрации'
                })
            }
            //получаем поля их будем брать из models
            const {email, first_name, last_name, middle_name, password, role} = req.body
            
            const candidate = await User.findOne({where:{email:email}})
            if(candidate){
               return res.status(400).json({message:'Такой пользователь уже существует'})
            }
            const hashedPassword = await bcrypt.hash(password,12)
            //const now = new Date()
            //SEQUALIZE!!!
            //const user = new User({email, first_name, last_name, phone, password:hashedPassword, date_create:now})     
            User.create({
                f_name:first_name,
                l_name:last_name,
                m_name:middle_name,
                email,
                role:"USER",
                password:hashedPassword
            })
            res.status(201).json({message:'Пользователь создан'})

        }catch(e){
            res.status(500).json({message: e.message})
            
        }
    }
)

router.post('/login', 
    [
        check('email', 'Некорртектный email').normalizeEmail().isEmail(),
        check('password','Введите пароль').exists()
    ] ,
    async(req, res) =>{
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Введены некорректные данные при входе'
                })
            }
            const{email,password} = req.body
        
            //SEQUALIZE!!!
            const user = await User.findOne({where:{email:email}})

            if(!user){
                return res.status(400).json({message:'Пользователь не найден'})
            }

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch){
                return res.status(400).json({message:'Неверный пароль, попробуйте снова'})
            }
       
            const token = jwt.sign(
                {
                    userId: user.id
                },
                jwtSecret,
                {
                    expiresIn:'1h'
                }
            )
            res.json({message:'Вход выполнен', token, userId:user.id}) //Responce 
            
        }catch(e){
            res.status(500).json({message:e.message})
        }
})

router.post('/logout', async(req, res) =>{})
module.exports = router