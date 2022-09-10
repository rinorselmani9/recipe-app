const recipeService = require('../services/recipe.service')
const {jsonRes} = require('../library/helper')

module.exports = {
  add: async (params) => {

  const { title, category, ingridients, instructions, image} = params

    if(!title){
      throw Error('Title is required!')
    }
    if(!category){
      throw Error('Category is required!')
    }
    if(!ingridients){
      throw Error('At least one ingridient is required!')
    }
    if(!instructions){
      throw Error('Instructions is required!')
    }
    if(!image){
      throw Error('Image is required!')
    }
    const recipe = {
      title,
      category,
      ingridients,
      instructions,
      image
    }

    const result = await recipeService.insert(recipe)
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
    const { title, category, ingridients, instructions, image} = data

    if(!title){
      throw Error('Title is required!')
    }
    if(!category){
      throw Error('Category is required!')
    }
    if(!ingridients){
      throw Error('At least one ingridient is required!')
    }
    if(!instructions){
      throw Error('Instructions is required!')
    }
    if(!image){
      throw Error('Image is required!')
    }

    const recipe = {
      title,
      category,
      ingridients,
      instructions,
      image
    }
    const result = await recipeService.editRecipeData(id,recipe)
    return result
  },
  deleteRecipe: async(id) => {
    const result = await recipeService.deleteOneRecipe(id)
    return result
  },
  adminDeleteRecipe:async(params) => {
    const result = await recipeService.adminDeleteRecipeById(params)
    return result
  },
  setRating:async(id, rate) => {
    const result = await recipeService.giveRating(id,rate)
    return result
  },
  editRecipeImage:async(id,file) => {
    let fileName = null
    if(file){
      fileName = `/images/${file.filename}`
    }
    const result = await recipeService.editRecipeImageById(id,fileName)
    return result
  }
}
