const express = require('express')
const router = express.Router()

const Users = require('./users-model')

router.post('/:userid/potlucks/:potluckid', (req, res) => {
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
			res.status(500).json(`Server error: ${err}`)
		})
})

router.post('/:userid/potlucks', (req, res) => {
	const { userid } = req.params
	Users.createPotluck(userid, req.body)
		.then(potluck => {
			res.status(201).json(potluck)
		})
		.catch(err => {
			res.status(500).json(err)
		})
})

router.get('/:userid/created', (req, res) => {
	const { userid } = req.params
	Users.findCreatedPotlucks(userid)
		.then(potlucks => {
			res.status(200).json(potlucks)
		})
		.catch(err => {
			res.status(500).json(`Server error: ${err}`)
		})
})

router.get('/:userid/potlucks', (req, res) => {
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
