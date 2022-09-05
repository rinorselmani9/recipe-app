const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users.controller')
const { verifyAccountToken, verifyChangePasswordToken } = require('../middlewares/auth.middleware')
const inputsMiddleware = require('../middlewares/inputs.middleware')
const { jsonRes } = require('../library/helper')


/* GET users listing. */
router.get('/:id', async(req, res) => {
  try{
    const result = await usersController.getUser(req.params.id)
    res.json(jsonRes(result))
  }catch(err){
    res.status(400).json(jsonRes(err.message,false))
  }
})

router.post('/verify', inputsMiddleware.email, verifyAccountToken, async (req, res) => {
  try {
    const result = await usersController.verifyAccount(req.decoded)
    res.json(jsonRes(result))
  } catch (err) {
    res.status(400).json(jsonRes(err.message, false))
  }
})

router.post('/change-password', verifyChangePasswordToken, inputsMiddleware.password, inputsMiddleware.validate, async(req,res) => {
  try {
    const result = await usersController.changePassword(req.body.password, req.decoded)
    res.json(jsonRes(result))
  } catch (err) {
    res.status(400).json(jsonRes(err.message,false))
  }
})

router.delete('/delete/:id',async(req,res) => {
  try {
    const result = await usersController.deleteAccount(req.params.id)
    res.json(jsonRes(result))
  } catch (err) {
    res.status(400).json(jsonRes(err.message,false))
  }
})


module.exports = router
