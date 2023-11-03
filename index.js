const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const MONGODB_URI = require("./variable.js");
const recipesJson = require("./data.json")

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    const recipe = {
      title: "Tortilla de patata",
      level: "Easy Peasy",
      ingredients: ["potatoes", "onion", "eggs"],
      cuisine: "Spanish",
      dishType: "main_course",
      duration: 10,
      creator: "grandma",
    }
    Recipe.create(recipe)
      .then((recipe)=> console.log("Recipe has been created", recipe.title))
      
    Recipe.insertMany(recipesJson)
      .then((recipedata)=>{
        recipedata.forEach((e)=>{
          console.log(e.title)
        })
        Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"}, { duration : 100}, { new: true})
        .then((recipe)=>{
          console.log("You updated the duration to ", recipe.duration)
        })
        Recipe.deleteOne({title: "Carrot Cake"})
        .then((deletedRecipe)=>{
          console.log("The recipe was deleted!")
        })
      })
      .catch((error)=> console.log(error))
      
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
