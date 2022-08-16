import axios from 'axios'
import { GET_RECIPES, GET_RECIPE_BY_NAME, GET_RECIPE_DETAILS, GET_DIETS, CREATE_RECIPE, FILTER_BY_TYPE_DIET, ORDER_BY_ALPHABET, ORDER_BY_SCORE, CLEAN_DETAIL } from './actionTypes'

export function getRecipes() {
    return async function(dispatch) {
        try {
            const response = await axios('http://localhost:3001/recipes')
            return dispatch({
                type: GET_RECIPES,
                payload: response.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function getRecipeByName(name) {
    return async function(dispatch) {
        try {
            const response = await axios(`http://localhost:3001/recipes?name=${name}`)
            return dispatch({
                type: GET_RECIPE_BY_NAME,
                payload: response.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function getRecipeDetails(id) {
    return async function(dispatch) {
        try {
            const response = await axios(`http://localhost:3001/recipes/${id}`)
            return dispatch({
                type: GET_RECIPE_DETAILS,
                payload: response.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function getDiets() {
    return async function(dispatch) {
        try {
            const response = await axios('http://localhost:3001/diets')
            return dispatch({
                type: GET_DIETS,
                payload: response.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function createRecipe(payload) {
    return async function(dispatch) {
        try {
            const response = await axios.post('http://localhost:3001/recipe', payload)
            return dispatch({
                type: CREATE_RECIPE,
                payload: response
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function filterByType(payload) {
    return {
        type: FILTER_BY_TYPE_DIET,
        payload
    }
}

export function orderByAlphabet(payload) {
    return {
        type: ORDER_BY_ALPHABET,
        payload
    }
}

export function orderByScore(payload) {
    return {
        type: ORDER_BY_SCORE,
        payload
    }
}

export function cleanDetail(){
    return{
      type: CLEAN_DETAIL,
    }
  }