const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')
const userController = require('../controllers/users.controller')
const inputsMiddleware = require('../middlewares/inputs.middleware')
const { jsonRes } = require('../library/helper')
const upload = require('../services/upload.service')
const { register, validate } = require('../middlewares/inputs.middleware')

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

router.post('/register', register, upload.single('profile-image'), async (req, res) => {
  try {
    const result = await userController.add(req.body, req.file)
    res.json(jsonRes(result))
  } catch (err) {
    res.status(400).json(jsonRes(err.message, false))
  }
}) 

router.post('/forgot-password-request',inputsMiddleware.email, inputsMiddleware.validate , async(req,res) => {
  try {
    const result = await authController.forgotPassword(req.body)
    res.json(jsonRes(result))
  } catch (err) {
    res.status(400).json(jsonRes(err.message,false))
  }
})

module.exports = router
