const recipeService = require('../services/recipe.service')
const {jsonRes} = require('../library/helper')

module.exports = {
  add: async (params,file) => {

  const { title, category, ingridients, instructions,creator} = params
 let fileName = null
    if(file){
      fileName = `/images/${file.filename}`
    }


    const recipe = {
      title,
      category,
      ingridients,
      instructions,
      image:fileName,
      creator
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
  editRecipe: async(id,data,file) => {
    const { title, category, ingridients, instructions} = data

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
    let fileName = null
    if(file){
      fileName = `/images/${file.filename}`
    }

    const recipe = {
      title,
      category,
      ingridients,
      instructions,
      image:fileName
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
