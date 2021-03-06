const Potlucks = require('./potlucks-model')
const Items = require('../items/items-model')

const checkPotluck = (req, res, next) => {
	Potlucks.findById(req.params.potluckid)
		.then(potluck => {
			if (potluck) {
				next()
			} else {
				res
					.status(404)
					.json({ message: `No potluck found with ID ${req.params.potluckid}` })
			}
		})
		.catch(err => {
			res.status(500).json({ message: `Server error: ${err}` })
		})
}

const checkPotluckPayload = (req, res, next) => {
	if (!req.body.potluckname) {
		res.status(401).json({ message: `Please include a name for the potluck` })
	} else {
		next()
	}
}

const checkItemPayload = (req, res, next) => {
	if (!req.body.itemname) {
		res.status(401).json({ message: `Please include itemname for the item` })
	} else {
		next()
	}
}

const checkItemExists = (req, res, next) => {
	Items.findBy({ potluckid: req.params.potluckid })
		.then(items => {
			const itemArr = items.filter(item => {
				return item.itemname == req.body.itemname
			})
			if (itemArr.length) {
				res
					.status(404)
					.json({ message: `This item is already registered to this potluck` })
			} else {
				next()
			}
		})
		.catch(err => {
			res.status(500).json(err)
		})
}

const checkItemId = (req, res, next) => {
	Items.findById(req.params.itemid)
		.then(item => {
			if (item) {
				next()
			} else {
				res
					.status(404)
					.json({ message: `No item found with ID ${req.params.itemid}` })
			}
		})
		.catch(err => {
			res.status(500).json(err)
		})
}

module.exports = {
	checkPotluck,
	checkPotluckPayload,
	checkItemPayload,
	checkItemExists,
	checkItemId
}
