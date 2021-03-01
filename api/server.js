const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const server = express()
const usersRouter = require('./users/users-router')
const authRouter = require('./auth/auth-router')
const potlucksRouter = require('./potlucks/potlucks-router')

server.use(express.json())
server.use(helmet())
server.use(cors())

server.use('/api/auth', authRouter)
server.use('/api/users', usersRouter)
server.use('/api/potlucks', potlucksRouter)

module.exports = server
