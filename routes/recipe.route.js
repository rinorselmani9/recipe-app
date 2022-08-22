const express = require('express')
const router = express.Router()
const recipeController = require('../controllers/recipe.controller')

router.post('/',async(req,res) => {
    try {
        const result = await recipeController.add(req.body)
        res.json(result)
    } catch (err) {
        res.status(400).json(err.message)
    }
})

module.exports = router