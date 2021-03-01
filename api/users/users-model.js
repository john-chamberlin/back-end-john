const db = require('../data/db-config')
const Potlucks = require('../potlucks/potlucks-model')

function find() {
	return db('users')
}

function findBy(filter) {
	return db('users').where(filter).orderBy('userid')
}

function findById(id) {
	return db('users').where('userid', id).first()
}

function insert(user) {
	return db('users')
		.insert(user)
		.then(() => {
			return findBy({ username: user.username }).first()
		})
}

function findCreatedPotlucks(userid) {
	return db('potlucks').where('userid', userid)
}

function findMyPotlucks(userid) {
	return db('attendees as a')
		.join('potlucks as p', 'a.potluckid', 'p.potluckid')
		.select(
			'p.potluckid',
			'p.potluckname',
			'p.date',
			'p.time',
			'p.location',
			'p.userid as organizerid'
		)
		.where('a.userid', userid)
}

function rsvp(userid, potluckid) {
	return db('attendees').insert({ potluckid, userid })
}

function createPotluck(userid, potluck) {
	return db('potlucks')
		.insert({ ...potluck, userid: userid })
		.then(() => {
			return Potlucks.findBy({ potluckname: potluck.potluckname })
		})
}

module.exports = {
	find,
	findBy,
	findById,
	insert,
	findCreatedPotlucks,
	findMyPotlucks,
	rsvp,
	createPotluck
}
