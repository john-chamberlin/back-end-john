exports.seed = function (knex) {
	return knex('potluckitems').insert([
		{ potluckid: 1, itemid: 1 },
		{ potluckid: 1, itemid: 2 },
		{ potluckid: 1, itemid: 3, userid: 1 }
	])
}
