const mongoose = require('mongoose')
const userController = require('../controllers/users.controller')

module.exports = {
  connect: () => {
    mongoose.connect(process.env.DB_URL, () => {
      console.log('Succesfully connected to DB')

      userController.checkForAdmin()
    })
  },
}
