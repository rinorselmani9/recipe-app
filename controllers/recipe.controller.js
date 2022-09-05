const recipeService = require('../services/recipe.service')

module.exports = {
  add: async (params) => {
    const result = await recipeService.insert(params)
    return result
  },
  getRecipes: async() => {
    const result = await recipeService.getAllRecipes()
    return result
  },
  getUserRecipes:async(params) => {
    const result = await recipeService.getUserRecipesById(params)
    return result
  },
  getSingleRecipe:async(id) => {
    const result = await recipeService.getRecipeId(id)
    return result
  },
  editRecipe: async(id,data) => {
    const result = await recipeService.editRecipeData(id,data)
    return result
  },
  deleteRecipe: async(id) => {
    const result = await recipeService.deleteOneRecipe(id)
    return result
  }
}
