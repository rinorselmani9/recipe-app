const express = require('express');
const userController = require('../controllers/users.controller')
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register',async(req,res) => {
  try {
    const result = await userController.add(req.body)
    res.json(result)
  } catch (err) { 
    res.status(400).json(err.message)
  }
})

module.exports = router;
