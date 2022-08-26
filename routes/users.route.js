const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users.controller')
const { verifyAccountToken } = require('../middlewares/auth.middleware')
const inputsMiddleware = require('../middlewares/inputs.middleware')
const { jsonRes } = require('../library/helper')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource')
})

router.post('/verify', inputsMiddleware.email, verifyAccountToken, async (req, res) => {
  try {
    const result = await usersController.verifyAccount(req.decoded)
    res.json(jsonRes(result))
  } catch (err) {
    res.status(500).json(jsonRes(err.message, false))
  }
})

module.exports = router
