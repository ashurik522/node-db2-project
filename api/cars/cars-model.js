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
    .insert(account)
    .then(id => getById(id[0]))
}

module.exports = {
  getAll,
  getById,
  create
}