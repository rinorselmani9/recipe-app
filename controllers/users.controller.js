const userService = require('../services/users.service')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const emailService = require('../services/email.service')
const constants = require('../library/constants')
const { jsonRes } = require('../library/helper')

module.exports = {
  add: async (params,file) => {
    const { firstName, lastName, email, password, age } = params

    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.GEN_SALT))

    if(file){
      fileName = `/images/${file.filename}`
    }
    
    const result = await userService.insert({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      age,
      image:fileName
    })

    const token = jwt.sign({ _id: result._id, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 },process.env.JWT_VERIFY_ACCOUNT)
    emailService.sendVerificationEmail(email, token)
    return result._id
  },
  getUser:async(params) => {
    const result = await userService.getProfileUser(params)
    return result
  },

  verifyAccount: async (id) => {
    console.log(id);
    const result = await userService.verifyAccount(id)
    return result._id
  },

  changePassword: async (password, id) => {
    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.GEN_SALT))
    const result = await userService.changePassword(id, hashedPassword)
    return result._id
  },
  checkForAdmin: async () => {
    const admins = await userService.getAdmins()
    if (!admins) {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASS,parseInt(process.env.GEN_SALT))

      const admin = {
        firstName: 'ADMIN',
        lastName: 'ADMIN',
        email: process.env.ADMIN_EMAIL,
        password: hashedPassword,
        verified: true,
        role: constants.role.ADMIN,
      }
      userService.insert(admin)
    }
  },
  deleteAccount: async(id) => {
    const result = await userService.deleteUser(id)
    return result
  },
  getAllUsers: async() => {
    const result = await userService.getUsers()
    return result
  },
  editUser:async(id,data) => {
    const result = await userService.editUserProfile(id, data)
    return result
  },
  updateProfilePicture:async(userId, file) => {
    let fileName = null
    if(file){
      fileName = `/images/${file.filename}`
    }
    const result = await userService.updateImage(userId,fileName)
    return result
  }
}
