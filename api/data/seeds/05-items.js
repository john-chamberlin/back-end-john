exports.seed = function (knex) {
	return knex('items').insert([
		{ itemname: 'bananas' },
		{ itemname: 'soda' },
		{ itemname: 'candy' }
	])
}
