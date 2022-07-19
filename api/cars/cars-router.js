const router = require('express').Router()
const Cars = require('./cars-model')
const { } = require('./cars-middleware')

router.get('/', async (req, res, next) => {
    try{
        const data = await Cars.getAll()
        res.json(data)
    } catch(err){
        next(err)
    }
})



module.exports = router