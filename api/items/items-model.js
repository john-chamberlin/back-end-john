const db = require('../data/db-config')

function find() {
	return db('items')
}

function findBy(filter) {
	return db('items').where(filter).orderBy('itemid')
}

function insert(potluckid, item) {
	return db('items')
		.insert({ potluckid, itemname: item.itemname })
		.then(() => {
			return findBy({ potluckid: potluckid })
		})
}

function update(id, changes) {
	return db('items')
		.where('itemid', id)
		.update(changes)
		.then(() => {
			return db('items').where('itemid', id).first()
		})
}

module.exports = {
	find,
	findBy,
	insert,
	update
}
