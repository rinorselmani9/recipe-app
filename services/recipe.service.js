const recipeModel = require('../models/recipe.model')

module.exports = {
    insert: async(values) => {
        const result = await recipeModel.create(values)
        return result
    }
}