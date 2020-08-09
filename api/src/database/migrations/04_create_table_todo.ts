import Knex from 'knex';
export async function up(knex: Knex){
    return knex.schema.createTable('todo', table => {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.string('media');
        table.integer('id_classe')
            .notNullable()
            .references('id')
            .inTable('classes')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    });
}
export async function down(knex: Knex){
    return knex.schema.dropTable('todo');
}
