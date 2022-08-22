const userModel = require('../models/user.model')

module.exports = {
    insert: async(values) => {
        const result = await userModel.create(values)
        return result
    }
}