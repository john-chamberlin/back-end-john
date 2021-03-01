const Potlucks = require('./potlucks-model')

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

module.exports = {
	checkPotluck,
	checkPotluckPayload
}
