const { Router } = require("express")
const { Diets } = require("../db")
const { types } = require("../controllers/diets")
const router = Router();

// GET /diets

router.get('/', async(req, res) => {
    try {
        types.forEach(async n => {
            await Diets.findOrCreate({
                where: {
                    name: n
                }
            })
        });
        const diets = await Diets.findAll();
        res.send(diets)
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;