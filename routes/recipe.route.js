const express = require('express')
const router = express.Router()
const recipeController = require('../controllers/recipe.controller')
const { jsonRes } = require('../library/helper')
const upload = require('../services/upload.service')
const { verifyToken } = require('../middlewares/auth.middleware')

router.get('/', async (req, res) => {
  try {
    const result = await recipeController.getRecipes()
    res.json(jsonRes(result))
  } catch (err) {
    res.status(400).json(jsonRes(err.message, false))
  }
})

router.post('/', verifyToken, upload.single('recipe-image'), async (req, res) => {
  try {
    const result = await recipeController.add(req.body, req.file)
    res.json(jsonRes(result))
  } catch (err) {
    res.status(400).json(jsonRes(err.message, false))
  }
})
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const result = await recipeController.getUserRecipes(req.params.id)
    res.json(jsonRes(result))
  } catch (err) {
    res.status(400).json(jsonRes(err.message, false))
  }
})

router.get('/single/:id', async (req, res) => {
  try {
    const result = await recipeController.getSingleRecipe(req.params.id)
    res.json(jsonRes(result))
  } catch (err) {
    res.status(400).json(jsonRes(err.message, false))
  }
})

router.post('/:id', verifyToken, upload.single('recipe-image'), async (req, res) => {
  try {
    const result = await recipeController.editRecipe(req.params.id, req.body, req.file)
    res.json(jsonRes(result))
  } catch (err) {
    res.status(400).json(jsonRes(err.message, false))
  }
})

router.post('/rate/:id', verifyToken, async (req, res) => {
  console.log(req.body.rating)
  try {
    const result = await recipeController.setRating(req.params.id, req.body.rating)
    res.json(jsonRes(result))
  } catch (err) {
    res.status(400).json(jsonRes(err.message, false))
  }
})

router.post('/delete/:id', verifyToken, async (req, res) => {
  try {
    const result = await recipeController.deleteRecipe(req.params.id)
    res.json(jsonRes(result))
  } catch (err) {
    res.status(400).json(jsonRes(err.message, false))
  }
})

router.post('/admin-delete/:id', verifyToken, async (req, res) => {
  try {
    const result = await recipeController.adminDeleteRecipe(req.params.id)
    res.json(jsonRes(result))
  } catch (err) {
    res.status(400).json(jsonRes(err.message, false))
  }
})

module.exports = router
