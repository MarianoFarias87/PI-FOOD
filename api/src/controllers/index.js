const axios = require('axios')
const { Diets, Recipe } = require('../db')
const { API_KEY } = process.env;


// const getDefaultDiets = async (req, res) => {
//     try {
//         const allDiets = (await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)).data.results.diets
//         const defaultDiets = allDiets.filter( d => d)
//     } catch (error) {
//         console.log(error)
//     }
// }

// const getApiRecipes = async (req, res) => {
//     try {
//         const apiRecipes = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
//         const 
//     } catch (error) {
//         console.log(error)
//     }
// }




// https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100