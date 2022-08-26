const userService = require('../services/users.service')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
  login: async (params) => {
    const { email, password } = params

    if (!email) {
      throw Error('Please enter an email!')
    }
    if (!password) {
      throw Error('Please enter a password!')
    }

    const user = await userService.findByEmail(email)

    if (!user) {
      throw Error('This email does not exist!')
    }

    const matchPassword = await bcrypt.compare(password, user.password)

    if (!matchPassword) {
      throw Error('Wrong Password!')
    }

    const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET)
    return token
  },
}
