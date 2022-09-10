const recipeModel = require('../models/recipe.model')
const userModel = require('../models/user.model')

module.exports = {
  insert: async (values) => {
    const { title, category, ingridients, instructions, image, creator } = values
    const newRecipe = new recipeModel({
      title,
      category,
      ingridients,
      instructions,
      image,
      creator,
    })

    let user
    try {
      user = await userModel.findById(creator)
    } catch (err) {
      return err.message
    }
    if (!user) {
      return 'No user found with this id'
    }
    try {
      const result = await newRecipe.save()
      user.recipes.push(newRecipe)
      await user.save()
      return result
    } catch (error) {
      return error.message
    }
  },
  getAllRecipes: async () => {
    const result = await recipeModel.find()
    return result
  },
  getUserRecipesById: async (id) => {
    const result = await recipeModel.find({ creator: id })
    return result
  },
  getRecipeId: async (id) => {
    const result = await recipeModel.findById(id)
    return result
  },
  editRecipeData: async (id, data) => {
    const result = await recipeModel.findByIdAndUpdate(id, data)
    return result
  },
  deleteOneRecipe: async (id) => {
    const recipe = await recipeModel.findById(id).populate('creator')
    try {
      await recipeModel.findByIdAndDelete(id)
      recipe.creator.recipes.pull(recipe)
      await recipe.creator.save()
    } catch (err) {
      return err
    }
  },
  adminDeleteRecipeById: async (id) => {
    const recipe = await recipeModel.findById(id).populate('creator')
    try {
      await recipeModel.findByIdAndDelete(id)
      recipe.creator.recipes.pull(recipe)
      await recipe.creator.save()
    } catch (err) {
      return err
    }
  },
  giveRating:async(id,rate) => {
    const result = await recipeModel.updateOne({_id:id},{$push:{rating:rate}})
  },
  editRecipeImageById: async (id, fileName) => {
    const result = recipeModel.findByIdAndUpdate(id, { image: fileName })
    return result
  },
}
