const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')
const userController = require('../controllers/users.controller')
const inputsMiddleware = require('../middlewares/inputs.middleware')
const { jsonRes } = require('../library/helper')

/* GET home page. */
router.get('/', (req, res) => {})

router.post('/login', inputsMiddleware.login, inputsMiddleware.validate, async (req, res) => {
  try {
    const result = await authController.login(req.body)
    res.json(jsonRes(result))
  } catch (err) {
    res.status(400).json(jsonRes(err.message, false))
  }
})

router.post('/register', inputsMiddleware.register, inputsMiddleware.validate, async (req, res) => {
  try {
    const result = await userController.add(req.body)
    res.json(jsonRes(result))
  } catch (err) {
    res.status(400).json(jsonRes(err.message, false))
  }
})

module.exports = router
