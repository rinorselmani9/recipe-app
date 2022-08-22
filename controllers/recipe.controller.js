const recipeService = require('../services/recipe.service')

module.exports = {
    add: async(params) => {
        const result = await recipeService.insert(params)
        return result
    }
}