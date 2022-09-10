const userModel = require('../models/user.model')
const constants = require('../library/constants')
const recipeModel = require('../models/recipe.model')

module.exports = {
  insert: async (values) => {
    const result = await userModel.create(values)
    return result
  },

  getProfileUser: async (id) => {
    const result = await userModel.findById(id)
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
    const result = await userModel.findOne({ role: constants.role.ADMIN })
    return result
  },
  deleteUser: async (id) => {
    const recipesToDelete = await recipeModel.deleteMany({ creator: id })
    const result = await userModel.findByIdAndDelete(id)
    return { result, recipesToDelete }
  },
  getUsers: async () => {
    const result = await userModel.find()
    return result
  },
  editUserProfile: async (id, data) => {
    const result = await userModel.findByIdAndUpdate(id, data)
    return result
  },
  updateImage:async(userId, fileName) => {
    const result = await userModel.findByIdAndUpdate(userId, {image:fileName}).exec()
    return result
  }
}
