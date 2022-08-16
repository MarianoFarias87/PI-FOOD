const { Router } = require('express')
const {
    getAllRecipes,
    getApiID,
    getDataBaseID
} = require('../controllers/recipes')

const router = Router();

//------- GET/recipes?name="..."

router.get('/', async (req, res) => {
    const { name } = req.query
    try {
        const allRecipes = await getAllRecipes()

        if(name) {
            const recipeByName = await allRecipes.filter(n => n.name.toLowerCase().includes(name.toString().toLowerCase()));
            if(recipeByName.length) {
                const recipes = recipeByName.map(e => {
                    return {
                        id: e.id,
                        name: e.name,
                        summary: e.summary,
                        healthScore: e.healthScore,
                        image: e.image,
                        steps: e.steps,
                        diets: e.diets ? e.diets : e.diets.map(e => e.name) // revisar
                    }
                })
                return res.status(200).send(recipes);
            } 
            return res.status(400).send('Recipe not found');
        } else {
            const recipes = allRecipes.map(e => {
                return {
                    id: e.id,
                    name: e.name,
                    summary: e.summary,
                    healthScore: e.healthScore,
                    image: e.image,
                    steps: e.steps,
                    diets: e.diets ? e.diets : e.diets.map(e => e.name)
                }
            })
            return res.status(200).send(recipes);
        }           

    } catch (error) {
        console.log(error)
    }
});

//------- GET/recipes/:id

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const validate = id.includes("-");
    try {
        if (validate) {
            const recipeBD = await getDataBaseID(id);
            return res.status(200).send(recipeBD)
        } else {
            const recipeAPI = await getApiID(id);
            return res.status(200).send(recipeAPI)
        }
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;