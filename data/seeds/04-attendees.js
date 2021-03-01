exports.seed = function (knex) {
	return knex('attendees').insert([
		{ potluckid: 1, userid: 1 },
		{ potluckid: 1, userid: 2 },
		{ potluckid: 1, userid: 3 }
	])
}
