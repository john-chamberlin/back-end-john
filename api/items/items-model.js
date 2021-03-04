const db = require('../data/db-config')

function find() {
	return db('items')
}

function findBy(filter) {
	return db('items as i ')
		.join('users as u', 'i.userid', 'u.userid')
		.select('i.itemid', 'i.itemname', 'i.potluckid', 'u.userid', 'u.username')
		.where(filter)
		.orderBy('itemid')
}

function findById(id) {
	return db('items').where('itemid', id).first()
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

function remove(id) {
	return db('items').where('itemid', id).del()
}

module.exports = {
	find,
	findBy,
	insert,
	update,
	remove,
	findById
}
