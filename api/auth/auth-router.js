const express = require('express')
const router = express.Router()

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Users = require('../users/users-model')
const {
	checkPayload,
	checkUserInDb,
	checkUserForLogin
} = require('./auth-middleware')

router.post('/register', checkPayload, checkUserInDb, (req, res) => {
	const hash = bcrypt.hashSync(req.body.password, 10)
	Users.insert({ username: req.body.username, password: hash })
		.then(user => {
			res.status(201).json(user)
		})
		.catch(err => {
			res.status(500).json(`Server error: ${err}`)
		})
})

router.post('/login', checkPayload, checkUserForLogin, (req, res) => {
	const verified = bcrypt.compareSync(req.body.password, req.userData.password)
	if (verified) {
		const token = makeToken(req.userData)
		res.status(200).json({
			message: `Welcome back, ${req.userData.username}`,
			user: req.userData,
			token
		})
	} else {
		res.status(401).json('Incorrect username or password')
	}
})

const makeToken = user => {
	const payload = {
		subject: user.userid,
		username: user.username
	}
	const options = {
		expiresIn: '20m'
	}
	return jwt.sign(payload, 'splooie', options)
}

module.exports = router
