const Users = require('./users-model')

const checkUser = (req, res, next) => {
	Users.findById(req.params.userid)
		.then(user => {
			if (!user) {
				res.status(404).json(`No user found with ID ${req.params.userid}`)
			} else {
				next()
			}
		})
		.catch(err => {
			res.status(500).json(err)
		})
}

const checkRsvp = (req, res, next) => {
	Users.findMyPotlucks(req.params.userid)
		.then(potlucks => {
			const potluckArr = potlucks.map(item => {
				return item.potluckid
			})
			const isDuplicate = potluckArr.some((item, idx) => {
				return potluckArr.indexOf(item) != idx
			})
			if (isDuplicate) {
				res
					.status(404)
					.json(
						`User with ID ${req.params.userid} has already RSVP'd for this event`
					)
			} else {
				next()
			}
		})
		.catch(err => {
			res.status(500).json(err)
		})
}

module.exports = {
	checkUser,
	checkRsvp
}
