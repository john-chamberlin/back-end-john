const jwt = require('jsonwebtoken')
const Users = require('../users/users-model')

const checkPayload = (req, res, next) => {
	if (!req.body.username || !req.body.password) {
		res.status(401).json({ message: 'Please enter your username and password' })
	} else {
		next()
	}
}

const checkUserInDb = (req, res, next) => {
	Users.findBy({ username: req.body.username })
		.then(users => {
			if (!users[0]) {
				next()
			} else {
				res
					.status(401)
					.json({ message: 'Account already exists with given username' })
			}
		})
		.catch(err => {
			res.status(500).json(err.message)
		})
}

const checkUserForLogin = (req, res, next) => {
	Users.findBy({ username: req.body.username })
		.then(users => {
			if (users[0]) {
				req.userData = users[0]
				next()
			} else {
				res.status(401).json({ message: 'Incorrect username or password' })
			}
		})
		.catch(err => {
			res.status(500).json(err.message)
		})
}

const restricted = (req, res, next) => {
	const token = req.headers.authorization
	if (!token) {
		res.status(401).json({ message: 'Token is required' })
	} else {
		jwt.verify(token, 'splooie', (err, decoded) => {
			if (err) {
				res.status(401).json({ message: 'token invalid' })
			} else {
				req.decodedToken = decoded
				next()
			}
		})
	}
}

module.exports = {
	checkPayload,
	checkUserInDb,
	checkUserForLogin,
	restricted
}
