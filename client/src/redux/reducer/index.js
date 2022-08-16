import { CLEAN_DETAIL, CREATE_RECIPE, FILTER_BY_TYPE_DIET, GET_DIETS, GET_RECIPES, GET_RECIPE_BY_NAME, GET_RECIPE_DETAILS, ORDER_BY_ALPHABET, ORDER_BY_SCORE } from "../actions/actionTypes";

const initialState = {
    allRecipes: [],
    showedRecipes: [],
    diets: [],
    recipeDetails: [],
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_RECIPES:
            return {
                ...state,
                showedRecipes: action.payload,
                allRecipes: action.payload
            }

        case GET_RECIPE_BY_NAME:
            return {
                ...state,
                showedRecipes: action.payload
            }

        case GET_RECIPE_DETAILS:
            return {
                ...state,
                recipeDetails: action.payload
            }

        case GET_DIETS:
            return {
                ...state,
                diets: action.payload
            }

        case CREATE_RECIPE:
            return {
                ...state
            }

        case FILTER_BY_TYPE_DIET:
            const all = state.allRecipes;
            const filterTypes = action.payload === 'all' ? all : all.filter((d) => d.diets.includes(action.payload))
            return {
                ...state,
                showedRecipes: filterTypes
            }

        case ORDER_BY_ALPHABET:
            let sortByAlphabet = [...state.showedRecipes];
                sortByAlphabet = action.payload === 'asc' ?
                state.showedRecipes.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                    return 0;
                }) :
                state.showedRecipes.sort(function (a, b) {
                    if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
                    if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
                    return 0
                });
            return {
                ...state,
                showedRecipes: sortByAlphabet
            }

        case ORDER_BY_SCORE:
            let sortedByScore = [...state.showedRecipes];
                sortedByScore = action.payload === 'low' ?
                state.showedRecipes.sort(function (a, b) {
                    if (a.healthScore > b.healthScore) return 1;
                    if (a.healthScore < b.healthScore) return -1;
                    return 0;
                }) :
                state.showedRecipes.sort(function (a, b) {
                    if (a.healthScore < b.healthScore) return 1;
                    if (a.healthScore > b.healthScore) return -1;
                    return 0;
                });
            return {
                ...state,
                showedRecipes: sortedByScore
            }

            case CLEAN_DETAIL:
                return {
                    ...state,
                    recipeDetails: []
                }

        default: return { ...state };


    }
}