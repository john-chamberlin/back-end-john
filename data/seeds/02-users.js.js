exports.seed = function (knex) {
	return knex('users').insert([
		{ username: 'bees', password: 'honey' },
		{ username: 'squirrels', password: 'nuts' },
		{ username: 'anteaters', password: 'ants' }
	])
}
