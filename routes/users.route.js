const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users.controller')
const { verifyAccountToken, verifyChangePasswordToken, verifyToken } = require('../middlewares/auth.middleware')
const inputsMiddleware = require('../middlewares/inputs.middleware')
const { jsonRes } = require('../library/helper')
const upload = require('../services/upload.service')


/* GET users listing. */

router.post('/verify', verifyAccountToken, async (req, res) => {
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

router.get('/',async(req,res) => {
  try {
      const result = await usersController.getAllUsers()
      res.json(jsonRes(result))
  } catch (err) {
    res.status(400).json(jsonRes(err.message,false))
  }
})

router.get('/:id',verifyToken, async(req, res) => {
  try{
    const result = await usersController.getUser(req.params.id)
    res.status(200).json(jsonRes(result))
    
  }catch(err){
 res.status(400).json(jsonRes(err.message))
  }
})

router.post('/:id',verifyToken, async(req,res) => {
  try {
    const result = await usersController.editUser(req.params.id, req.body)
    res.json(jsonRes(result))
  } catch (err) {
    res.json(jsonRes(err.message))
  }
})

router.post('/update-profile-image/:id', upload.single('profile-image') ,async(req,res) => {
  try {
    console.log(req.file);
    const result = await usersController.updateProfilePicture(req.params.id, req.file)
    res.json(jsonRes(result))
  } catch (err) {
    res.json(jsonRes(err.message,false))
  }
})

router.delete('/delete/:id',verifyToken,async(req,res) => {
  try {
    const result = await usersController.deleteAccount(req.params.id)
    res.json(jsonRes(result))
  } catch (err) {
    res.status(400).json(jsonRes(err.message,false))
  }
})


module.exports = router
