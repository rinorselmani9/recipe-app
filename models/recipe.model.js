const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema(
    {
        title:{ type:String, required:true }, 
        category:{ type:String, required:true },
        ingridients:[{ type:String, required:true }],
        instructions:{ type:String, required:true },
        rating:[{ type:Number, required:true }]
    },
    {
        timestamps:true
    }
)

const recipe =  mongoose.model('Recipes',recipeSchema)

module.exports = recipe