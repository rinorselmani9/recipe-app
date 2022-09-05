const express = require('express')
const router = express.Router()
const recipeController = require('../controllers/recipe.controller')
const { jsonRes } = require('../library/helper')


router.get('/',async(req,res) => {
    try {
        const result = await recipeController.getRecipes()
        res.json(jsonRes(result))
    } catch (err) {
        res.status(400).json(jsonRes(err.message,false))
    }
})

router.post('/',async(req,res) => {
    try {
        const result = await recipeController.add(req.body)
        res.json(jsonRes(result))
    } catch (err) {
        res.status(400).json(jsonRes(err.message,false))
    }
})
router.get('/:id',async(req,res)=> {
    try {
        const result = await recipeController.getUserRecipes(req.params.id)
        res.json(jsonRes(result))
    } catch (err) {
        res.status(400).json(jsonRes(err.message,false))
    }
})

router.get('/single/:id',async(req,res) => {
    try {
        const result = await recipeController.getSingleRecipe(req.params.id)
        res.json(jsonRes(result))
        console.log(result);
    } catch (err) {
        res.status(400).json(jsonRes(err.message,false))
    }
})

router.post('/:id',async(req,res) => {
    try {
        const result = await recipeController.editRecipe(req.params.id, req.body)
        res.json(jsonRes(result))
    } catch (err) {
        res.status(400).json(jsonRes(err.message,false))
    }
})

router.post('/delete/:id',async(req,res) => {
    try {
        const result = await recipeController.deleteRecipe(req.params.id)
        res.json(jsonRes(result))
    } catch (err) {
        res.status(400).json(jsonRes(err.message,false))
    }
})

module.exports = router