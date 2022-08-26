const userService = require('../services/users.service')
const bcrypt = require('bcrypt')

module.exports = {
  add: async (params) => {
    const { firstName, lastName, email, password, age, profilePic, favorites } = params

    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.GEN_SALT))

    const result = await userService.insert({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      age,
      profilePic,
      favorites,
    })
    return result.id
  },

  verifyAccount: async(id) => {
    const result = await userService.verifyAccount(id)
    return result
  }
}
