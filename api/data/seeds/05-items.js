exports.seed = function (knex) {
	return knex('items').insert([
		{ itemname: 'bananas', potluckid: 1, userid: 1 },
		{ itemname: 'soda', potluckid: 1, userid: 2 },
		{ itemname: 'candy', potluckid: 1 }
	])
}
