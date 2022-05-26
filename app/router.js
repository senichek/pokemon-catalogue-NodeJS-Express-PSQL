const express = require("express");
const router = express.Router();
const mainController = require("./controllers/mainController")

router.get("/", mainController.renderGreeting);
router.get("/index", mainController.renderIndex);
router.get("/pokemon/search/types", mainController.renderTypes);
router.get("/pokemon/type/:type", mainController.renderByType);
router.get("/pokemon/details/:number", mainController.renderDetails);

router.use((req, res) => {
    res.locals.title = "Pokémon 404 page";
    res.status(404).render("404", { url: req.url });
})

module.exports = router;