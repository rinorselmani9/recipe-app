const userModel = require('../models/user.model')
const constants = require('../library/constants')

module.exports = {
  insert: async (values) => {
    const result = await userModel.create(values)
    return result
  },

  findByEmail: async (email) => {
    const result = await userModel.findOne({ email }).exec()
    return result
  },

  verifyAccount: async (_id) => {
    const result = await userModel.findByIdAndUpdate(_id, { verified: true }).exec()
    return result
  },

  changePassword: async (_id, password) => {
    const result = await userModel.findByIdAndUpdate(_id, { password }).exec()
    return result
  },
  getAdmins: async () => {
    const result = await userModel.findOne({ 'role': constants.role.ADMIN })
    return result
  },
}
