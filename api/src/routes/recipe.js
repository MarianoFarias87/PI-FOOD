const { Router } = require('express')
const { Recipe, Diets } = require('../db')
const { types } = require('../controllers/diets')

const router = Router();

//------- POST / recipe

router.post('/', async (req, res) => {
    const { name, image, healthScore, summary, steps, diets } = req.body
    try {
        const newRecipe = await Recipe.create({
            name,
            image:
            image || "https://thehalalworld.com/uploads/pages/Garbanzo-Bean-Soup.jpg",
            healthScore:
            healthScore || 50,
            summary,
            steps
        })

        const proms = diets.map(diet => newRecipe.addDiet(diet));
        await Promise.all(proms)
        // const dietDB = await Diets.findAll({
        //     where: {
        //         name: diets
        //     }
        // })
        // newRecipe.addDiet(dietDB);
        // // return res.send(newRecipe);
        res.status(200).send('Recipe created successfully')

    } catch(error) {
        console.log(error)
    }
})

module.exports = router;