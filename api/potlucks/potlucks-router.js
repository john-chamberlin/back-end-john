const express = require('express')
const router = express.Router()

const Potlucks = require('./potlucks-model')
const Items = require('../items/items-model')

const {
	checkPotluck,
	checkItemPayload,
	checkItemExists,
	checkItemId
} = require('./potlucks-middleware')
const { restricted } = require('../auth/auth-middleware')

router.get('/', (req, res) => {
	Potlucks.find()
		.then(potlucks => {
			res.status(200).json(potlucks)
		})
		.catch(err => {
			res.status(500).json(err.message)
		})
})

router.get('/:potluckid', checkPotluck, (req, res) => {
	const { potluckid } = req.params
	Potlucks.findById(potluckid)
		.then(potluck => {
			res.status(200).json(potluck)
		})
		.catch(err => {
			res.status(500).json(err.message)
		})
})

router.put('/:potluckid', restricted, checkPotluck, (req, res) => {
	const { potluckid } = req.params
	Potlucks.update(potluckid, req.body)
		.then(potluck => {
			res.status(200).json(potluck)
		})
		.catch(err => {
			res.status(500).json(err.message)
		})
})

router.delete('/:potluckid', restricted, checkPotluck, (req, res) => {
	const { potluckid } = req.params
	Potlucks.remove(potluckid)
		.then(() => {
			res.status(200).json(`Potluck with id ${potluckid} removed succesfully`)
		})
		.catch(err => {
			res.status(500).json(err.message)
		})
})

router.get('/:potluckid/attendees', checkPotluck, (req, res) => {
	const { potluckid } = req.params
	Potlucks.findAttendees(potluckid)
		.then(potlucks => {
			res.status(200).json(potlucks)
		})
		.catch(err => {
			res.status(500).json(err.message)
		})
})

router.post(
	'/:potluckid/items',
	checkItemPayload,
	checkItemExists,
	restricted,
	(req, res) => {
		const potid = req.params.potluckid
		Items.insert(potid, req.body)
			.then(potluck => {
				res.status(201).json(potluck)
			})
			.catch(err => {
				res.status(500).json(err.message)
			})
	}
)

router.get('/:potluckid/items', (req, res) => {
	Items.findBy({ potluckid: req.params.potluckid })
		.then(items => {
			res.status(200).json(items)
		})
		.catch(err => {
			res.status(500).json(err.message)
		})
})

router.put('/:potluckid/items/:itemid', restricted, checkItemId, (req, res) => {
	const itemid = req.params.itemid
	Items.update(itemid, req.body)
		.then(item => {
			res.status(200).json(item)
		})
		.catch(err => {
			res.status(500).json(err.message)
		})
})

router.delete('/:potluckid/items/:itemid', checkItemId, (req, res) => {
	const itemid = req.params.itemid
	Items.remove(itemid)
		.then(() => {
			res.status(200).json(`Item with ID ${itemid} successfully deleted`)
		})
		.catch(err => {
			res.status(500).json(err.message)
		})
})

module.exports = router
