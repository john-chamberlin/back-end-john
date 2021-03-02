const db = require('../data/db-config')

function find() {
	return db('items')
}

function findBy(filter) {
	return db('items').where(filter).first()
}

function insert(potluckid, item) {
	return db('items')
		.insert({ potluckid, itemname: item.itemname })
		.then(() => {
			return findBy({ itemname: item.itemname })
		})
}

module.exports = {
	find,
	findBy,
	insert
}
