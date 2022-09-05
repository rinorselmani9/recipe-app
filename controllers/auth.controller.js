const userService = require('../services/users.service')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const emailService = require('../services/email.service')

module.exports = {
  login: async (params) => {
    const { email, password } = params

    const user = await userService.findByEmail(email)
    console.log(user);

    if (!user) {
      throw Error('This email does not exist!')
    }

    if(!user.verified){
      throw Error('Please verify your account!')
    }

    const matchPassword = await bcrypt.compare(password, user.password)

    if (!matchPassword) {
      throw Error('Wrong Password!')
    }

    const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET)
    return {
      token,
      id:user.id,
      role:user.role,
      firstName:user.firstName
    }
  },
  
  forgotPassword: async(params) => {
    const {email} = params
    const user = await userService.findByEmail(email)

    if(!user){
      throw Error('This email does not exist!')
    }
    
    const token = jwt.sign({_id:user._id, exp:Math.floor(Date.now() / 1000) + 60 * 60 * 24},process.env.JWT_FORGOT_PASSWORD)
    return await emailService.sendForgotPasswordEmail(email,token)
  }
}
