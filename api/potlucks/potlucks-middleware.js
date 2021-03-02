const Potlucks = require('./potlucks-model')
const Items = require('../items/items-model')

const checkPotluck = (req, res, next) => {
	Potlucks.findById(req.params.potluckid)
		.then(potluck => {
			if (potluck) {
				next()
			} else {
				res.status(404).json(`No potluck found with ID ${req.params.potluckid}`)
			}
		})
		.catch(err => {
			res.status(500).json(`Server error: ${err}`)
		})
}

const checkPotluckPayload = (req, res, next) => {
	if (!req.body.potluckname) {
		res.status(401).json(`Please include a name for the potluck`)
	} else {
		next()
	}
}

const checkItemPayload = (req, res, next) => {
	if (!req.body.itemname) {
		res.status(401).json(`Please include itemname for the item`)
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
				res.status(404).json(`This item is already registered to this potluck`)
			} else {
				next()
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
	checkItemExists
}
