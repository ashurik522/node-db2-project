const router = require('express').Router()
const Cars = require('./cars-model')
const { 
    checkCarId, 
    checkCarPayload, 
    checkVinNumberUnique, 
    checkVinNumberValid
} = require('./cars-middleware')

router.get('/', async (req, res, next) => {
    try{
        const data = await Cars.getAll()
        res.json(data)
    } catch(err){
        next(err)
    }
})

router.get('/:id', checkCarId, async (req, res, next) => {
    try{
        const data = await Cars.getById(req.params.id)
        res.json(data)
    } catch(err){
        next(err)
    }
})

router.post('/', checkVinNumberUnique, checkVinNumberValid, async (req, res, next) => {
    try{
        const data = await Cars.create(req.body)
        res.status(201).json(data)
    } catch(err) {
        next(err)
    }
})

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({ message: err.message})
})


module.exports = router