import Knex from 'knex';
export async function up(knex: Knex){
    return knex.schema.createTable('todo_item', table => {
        table.increments('id').primary();
        table.string('todo_item');
        table.integer('todo_id')
          .notNullable()
          .references('id')
          .inTable('todo_list')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
    });
}
export async function down(knex: Knex){
    return knex.schema.dropTable('todo_item');
}
