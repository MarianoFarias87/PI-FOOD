require("dotenv").config();
const axios = require('axios')
const { API_KEY } = process.env
const { Diets, Recipe } = require('../db')

//------- GET/:id

const getApiID = async (id) => {
    try {
        const apiID = await axios(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
        const recipe = apiID.data

        const recipeDetail = {
            id,
            name: recipe.title,
            image: recipe.image,
            dish: recipe.dishTypes,
            healthScore: recipe.healthScore,
            summary: recipe.summary,
            steps: recipe.analyzedInstructions[0]?.steps.map(s => {
                return {
                    number: s.number,
                    step: s.step
                }
            }),
            diets: recipe.diets
        }
        return recipeDetail;

    } catch (error) {
        console.log(error)
    }
}

const getDataBaseID = async (id) => {
    try {
        return await Recipe.findByPk(id, {
            include: {
                model: Diets,
                attributes: ['name'],
                through: {
                    attributes: [],
                }
            }
        })
    } catch (error) {
        console.log(error)
    }
}

//------- GET/

const getApiRecipes = async () => {
    try {
        const json = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
        const recipe = json.data.results?.map((r) => {
            return {
                id: r.id,
                name: r.title,
                image: r.image,
                diets: r.diets?.map((d) => d),
                healthScore: r.healthScore,
                dish: r.dishTypes?.map((d) => d),
                steps: r.analyzedInstructions[0]?.steps.map((s) => {
                    return {
                        number: s.number,
                        step: s.step
                    }
                }),
                summary: r.summary
            }
        })
        return recipe;
    } catch (error) {
        console.log(error);
    }

}

const getDataBaseRecipes = async () => {
    try {
        return await Recipe.findAll({
            include: {
                model: Diets,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        })

    } catch (error) {
        console.log(error)
    }
}

const getAllRecipes = async () => {
    try {
        const getApi = await getApiRecipes()
        const getDB = await getDataBaseRecipes()
        const all = getDB.concat(getApi);
        return all;

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getApiID,
    getDataBaseID,
    getApiRecipes,
    getDataBaseRecipes,
    getAllRecipes
}