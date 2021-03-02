const express = require('express')
const router = express.Router()

const Potlucks = require('./potlucks-model')
const Items = require('../items/items-model')

const { checkPotluck } = require('./potlucks-middleware')
const { restricted } = require('../auth/auth-middleware')

router.get('/', (req, res) => {
	Potlucks.find()
		.then(potlucks => {
			res.status(200).json(potlucks)
		})
		.catch(err => {
			res.status(500).json(`Server error: ${err}`)
		})
})

router.get('/:potluckid', checkPotluck, (req, res) => {
	const { potluckid } = req.params
	Potlucks.findById(potluckid)
		.then(potluck => {
			res.status(200).json(potluck)
		})
		.catch(err => {
			res.status(500).json(`Server error: ${err}`)
		})
})

router.put('/:potluckid', restricted, checkPotluck, (req, res) => {
	const { potluckid } = req.params
	Potlucks.update(potluckid, req.body)
		.then(potluck => {
			res.status(200).json(potluck)
		})
		.catch(err => {
			res.status(500).json(`Server error: ${err}`)
		})
})

router.delete('/:potluckid', restricted, checkPotluck, (req, res) => {
	const { potluckid } = req.params
	Potlucks.remove(potluckid)
		.then(() => {
			res.status(200).json(`Potluck with id ${potluckid} removed succesfully`)
		})
		.catch(err => {
			res.status(500).json(`Server error; ${err}`)
		})
})

router.get('/:potluckid/attendees', checkPotluck, (req, res) => {
	const { potluckid } = req.params
	Potlucks.findAttendees(potluckid)
		.then(potlucks => {
			res.status(200).json(potlucks)
		})
		.catch(err => {
			res.status(500).json(`Server error: ${err}`)
		})
})

router.post('/:potluckid/items', (req, res) => {
	const potid = req.params.potluckid
	Items.insert(potid, req.body)
		.then(potluck => {
			res.status(201).json(potluck)
		})
		.catch(err => {
			res.status(500).json(err.message)
		})
})

module.exports = router
