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
  let { make, model, mileage, vin, title, transmission } = req.body

  if(make == null || make.trim() === ""){
    res.status(400).json({ message: `make is missing`})
    return;
  }
  if(model == null || model.trim() === ""){
    res.status(400).json({ message: `model is missing`})
    return;
  }
  if(mileage == null){
    res.status(400).json({ message: `mileage is missing`})
    return;
  }
  if(vin == null || vin.trim() === ""){
    res.status(400).json({ message: `vin is missing`})
    return;
  }

  req.newCar = { make: make, model: model, mileage: mileage, vin: vin, title: title, transmission: transmission}
  next()
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
