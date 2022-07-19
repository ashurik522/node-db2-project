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

router.post('/',  checkCarPayload, checkVinNumberUnique, checkVinNumberValid, async (req, res, next) => {
    try{
        const data = await Cars.create(req.newCar)
        res.status(201).json(data)
    } catch(err) {
        next(err)
    }
})

router.put('/:id', checkCarPayload, checkVinNumberUnique, checkVinNumberValid, async (req,res,next) => {
    try {
        const data = await Cars.updateById(req.params.id, req.newCar)
        res.json(data)
    } catch(err) {
        next(err)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const data = await Cars.remove(req.params.id)
        res.json(data)
    } catch(err) {
        next(err)
    }
})

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({ message: err.message})
})


module.exports = router