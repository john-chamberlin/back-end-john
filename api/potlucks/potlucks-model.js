const db = require('../data/db-config')

function find() {
	return db('potlucks as p')
		.join('users as u', 'p.userid', 'u.userid')
		.select(
			'p.potluckname',
			'p.date',
			'p.time',
			'p.location',
			'u.userid as organizerid',
			'u.username as organizer'
		)
}

function findBy(filter) {
	return db('potlucks as p')
		.join('users as u', 'p.userid', 'u.userid')
		.select(
			'p.potluckname',
			'p.date',
			'p.time',
			'p.location',
			'u.userid as organizerid',
			'u.username as organizer'
		)
		.where(filter)
		.orderBy('potluckid')
}

function findById(id) {
	return db('potlucks as p')
		.join('users as u', 'p.userid', 'u.userid')
		.select(
			'p.potluckname',
			'p.date',
			'p.time',
			'p.location',
			'u.userid as organizerid',
			'u.username as organizer'
		)
		.where('potluckid', id)
		.first()
}

function insert(potluck) {
	return db('potlucks')
		.insert(potluck)
		.then(() => {
			return findBy({ potluckname: potluck.potluckname })
		})
}

function update(id, changes) {
	return db('potlucks')
		.where('potluckid', id)
		.update(changes)
		.then(() => {
			return findById(id)
		})
}

function remove(id) {
	return db('potlucks').where('potluckid', id).del()
}

function findAttendees(id) {
	return db('attendees as a')
		.join('users as u', 'a.userid', 'u.userid')
		.join('potlucks as p', 'a.potluckid', 'p.potluckid')
		.select(
			'a.attendeeid',
			'p.potluckid',
			'p.potluckname',
			'u.userid',
			'u.username'
		)
		.where('a.potluckid', id)
}

function addPotluckItems(potluckid, item) {
	return db('potluckitems')
		.insert({ potluckid })
		.then(() => {
			return db('potluckitems').where({ itemname: item.itemname })
		})
}

module.exports = {
	find,
	findBy,
	findById,
	insert,
	update,
	remove,
	findAttendees
}
