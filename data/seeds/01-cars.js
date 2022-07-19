
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('cars').truncate()
  await knex('cars').insert([
    { vin: '2367463786', make: 'Toyota', model: 'Prius', mileage: 86738 },
    { vin: '9734284352', make: 'Subaru', model: 'Outback', mileage: 112459}
  ]);
};
