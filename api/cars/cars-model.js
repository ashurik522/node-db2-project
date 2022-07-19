const db = require('../../data/db-config')

const getAll = () => {
  return db('cars')
  
}

const getById = (id) => {
  return db('cars')
    .where('id', id)
    .first()
}

const create = (car) => {
  return db('cars')
    .insert(car)
    .then(id => getById(id[0]))
}

const getByVin = (vin) => {
  return db('cars')
    .where('vin', vin)
    .first()
}

const remove = async (id) => {
  const result = await getById(id)
  await db('cars')
    .where('id', id)
    .delete()
    return result
}

const updateById = (id, car) => {
  return db('cars')
    .where('id', id)
    .update(car)
    .then(res => {
      if(res === 0){
        return null
      }
      return getById(id)
    })
}

module.exports = {
  getAll,
  getById,
  create,
  getByVin,
  remove,
  updateById
}