const express = require('express')
const router = express.Router()
const { restricted } = require('../auth/auth-middleware')
const { checkUser, checkRsvp } = require('./users-middleware')
const {
	checkPotluck,
	checkPotluckPayload
} = require('../potlucks/potlucks-middleware')

const Users = require('./users-model')

router.post(
	'/:userid/potlucks/:potluckid',
	restricted,
	checkUser,
	checkPotluck,
	checkRsvp,
	(req, res) => {
		const { userid, potluckid } = req.params
		Users.rsvp(userid, potluckid)
			.then(() => {
				res
					.status(201)
					.json(
						`User with id ${userid} successfully registered for potluck with id ${potluckid}`
					)
			})
			.catch(err => {
				res.status(500).json(`Server err: ${err}`)
			})
	}
)

router.post(
	'/:userid/potlucks',
	restricted,
	checkUser,
	checkPotluckPayload,
	(req, res) => {
		const { userid } = req.params
		Users.createPotluck(userid, req.body)
			.then(potluck => {
				res.status(201).json(potluck)
			})
			.catch(err => {
				res.status(500).json(err)
			})
	}
)

router.get('/:userid/created', checkUser, (req, res) => {
	const { userid } = req.params
	Users.findCreatedPotlucks(userid)
		.then(potlucks => {
			res.status(200).json(potlucks)
		})
		.catch(err => {
			res.status(500).json(`Server error: ${err}`)
		})
})

router.get('/:userid/potlucks', checkUser, (req, res) => {
	const { userid } = req.params
	Users.findMyPotlucks(userid)
		.then(potlucks => {
			res.status(200).json(potlucks)
		})
		.catch(err => {
			res.status(500).json(`Server error: ${err}`)
		})
})

module.exports = router
