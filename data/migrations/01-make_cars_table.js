exports.up = function (knex) {
  return knex.schema.createTable('cars', tbl => {
    tbl.increments('id');
    tbl.text('vin', 30).notNullable().unique();
    tbl.text('make', 30).notNullable();
    tbl.text('model', 30).notNullable();
    tbl.integer('mileage', 10).notNullable();
    tbl.text('title')
    tbl.text('transmission')
  })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('cars')
};
