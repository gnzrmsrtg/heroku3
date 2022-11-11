const express = require('express')
const router = express.Router()
const sequelize = require('../config/db')
const jwt = require('jsonwebtoken')

router.get('/', async (req, res) => {
    return res.status(200).json({ message: 'Hola, extraño' });
})

router.get('/login', async (req, res) => {
    return res.status(200).json({ message: 'Inicia sesión' });
})

router.post('/login', async (req, res) => {
    const { body } = req
    const user = await sequelize.models.users.findOne({ 
                    where: { email: body.email }
                })

    if (!user) return res.status(401).json({ message: 'Unauthorized' })
    if (!user.validPassword(body.password)) return res.status(401).json({ message: 'Invalid credentials' })

    const token = jwt.sign({ userId: user.id }, 'secretKey', {
        expiresIn: 3600
    })

    return res.json({ message: 'Authenticated succesfully', token })
})

router.post('/signup', async (req, res) => {
    const { body } = req

    const user = await sequelize.models.users.findOne({ 
        where: { email: body.email }
    })

    if (!user) {
        const newUser = 
        await sequelize.models.users.create({
            name: body.name,
            firstSurname: body.firstSurname,
            secondSurname: body.secondSurname,
            type: 'client',
            email: body.email,
            password: body.password
        })
        return res.status(200).json({ message: 'User created' })
    } else {
        return res.status(400).json({ message: 'Email already registered' })
    }
})

module.exports = router