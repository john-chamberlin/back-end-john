exports.seed = function (knex) {
	return knex('potlucks').insert([
		{
			potluckname: 'adventurous picnic',
			date: '12/2/18',
			time: '6:30 PM ET',
			location: 'my house',
			userid: 1
		},
		{
			potluckname: 'goin on a trip',
			date: '12/8',
			time: '6:30 PM ET',
			location: 'my barn',
			userid: 2
		}
	])
}
