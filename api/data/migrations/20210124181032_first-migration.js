exports.up = async knex => {
	await knex.schema
		.createTable('users', table => {
			table.increments('userid')
			table.string('username', 200).notNullable()
			table.string('password', 200).notNullable()
		})
		.createTable('potlucks', table => {
			table.increments('potluckid')
			table.string('potluckname').notNullable()
			table.string('date')
			table.string('time')
			table.string('location')
			table
				.integer('userid')
				.unsigned()
				.notNullable()
				.references('userid')
				.inTable('users')
				.onUpdate('CASCADE')
				.onDelete('CASCADE')
		})
		.createTable('attendees', table => {
			table.increments('attendeeid')
			table
				.integer('potluckid')
				.unsigned()
				.notNullable()
				.references('potluckid')
				.inTable('potlucks')
				.onUpdate('CASCADE')
				.onDelete('CASCADE')
			table
				.integer('userid')
				.unsigned()
				.notNullable()
				.references('userid')
				.inTable('users')
				.onUpdate('CASCADE')
				.onDelete('CASCADE')
		})
		.createTable('items', table => {
			table.increments('itemid')
			table.string('itemname').notNullable().unique()
		})
		.createTable('potluckitems', table => {
			table.increments('potluckitemid')
			table
				.integer('potluckid')
				.unsigned()
				.notNullable()
				.references('potluckid')
				.inTable('potlucks')
				.onUpdate('CASCADE')
				.onDelete('CASCADE')
			table
				.integer('itemid')
				.unsigned()
				.notNullable()
				.references('itemid')
				.inTable('items')
				.onUpdate('CASCADE')
				.onDelete('CASCADE')
			table
				.integer('userid')
				.unsigned()
				.references('userid')
				.inTable('users')
				.onUpdate('CASCADE')
				.onDelete('CASCADE')
		})
}

exports.down = async knex => {
	await knex.schema
		.dropTableIfExists('potluckitems')
		.dropTableIfExists('items')
		.dropTableIfExists('attendees')
		.dropTableIfExists('potlucks')
		.dropTableIfExists('users')
}
