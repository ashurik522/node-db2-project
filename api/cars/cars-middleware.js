const vinValidator = require('vin-validator')
const Cars = require('./cars-model')

const checkCarId = async (req, res, next) => {
  let car = await Cars.getById(req.params.id)
  if(car == null){
    res.status(404).json({ message: `car with id ${req.params.id} is not found`})
    return;
  }
  next()
}

const checkCarPayload = (req, res, next) => {

}

const checkVinNumberValid = async (req, res, next) => {
  let isValidVin = vinValidator.validate(req.body.vin)
  if(!isValidVin){
    res.status(400).json({ message: `vin ${req.body.vin} is invalid`})
  }
  next()
}

const checkVinNumberUnique = async (req, res, next) => {
  let car = await Cars.getByVin(req.body.vin)
  if(car){
    res.status(400).json({ message: `vin ${req.body.vin} already exists`})
    return;
  }
  next()
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid
}
