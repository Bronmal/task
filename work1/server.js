const sequelize = require('./database')
const User = require('./User')
const fastify = require('fastify')({ logger: true })
const jwt = require('jsonwebtoken')
require('dotenv').config()

sequelize.sync({force: false}).then(() => console.log('db is ready'))


fastify.post('/register', (request, reply) => {
    let email_enter = request.headers.email
    let password_enter = request.headers.password
    User.create({
        email: email_enter,
        password: password_enter
    })
    reply.status(200)
})

fastify.post('/login', async (request , reply ) => {
    let email_enter = request.headers.email
    let password_enter = request.headers.password
    let user = await User.findOne({where: {email: email_enter}})
    if (user['email'] === email_enter){
        if (user['password'] === password_enter){
            const token = jwt.sign({email: user['email']}, process.env.SECRET)
            reply.send({
                token: token
            })
        }
    }
    reply.status(400).send({statusCode: "400"})
})

fastify.get('/auth', (request, reply) => {
    const token = request.headers.token
    try {
        const result = jwt.verify(token, process.env.SECRET)
        reply.send({email: result.email})
    } catch (err){
        reply.status(401).send({message: "Invalid token"})
    }
})

// fastify.inject({
//     method: 'POST',
//     url: '/register',
//     headers: {
//         'email': 'test@test.ru',
//         'password': '12345'
//     }
// }, (err, res) => {
//     console.log(res.body)
// })

// fastify.inject({
//     method: 'POST',
//     url: '/login',
//     headers: {
//         'email': 'test@test.ru',
//         'password': '12345'
//     }
// }, (err, res) => {
//     console.log(res.body)
// })

// fastify.inject({
//     method: 'GET',
//     url: '/auth',
//     headers: {
//         'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5ydSIsImlhdCI6MTY0OTM0MjMwMX0.7HWQ176zhP88cGR8u8FCMOA6bbUKv_sUHSCCFq49q2M'
//     }
// }, (err, res) => {
//     console.log(res.body)
// })

fastify.listen(3000, (err) => {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})