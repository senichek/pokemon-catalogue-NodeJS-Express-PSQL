const pokemonDataMapper = require("../dataMappers/pokemonDataMapper");

const mainController = {
  renderGreeting: (req, res) => {
    res.render("greet");
  },

  renderIndex: async (req, res, next) => {
    try {
      const pokemons = await pokemonDataMapper.getAll();
      if (!pokemons) {
        return next();
      }
      console.log("Fetched all pokemons from DB;");
      res.locals.title = "Pokémon main page";
      res.render("index", { pokemons });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  renderDetails: async (req, res, next) => {
    try {
      const pokemonNumber = req.params.number;
      const pokemon = await pokemonDataMapper.getByNumber(pokemonNumber);
      if (!pokemon) {
        return next();
      }
      console.log(`Fetched pokemon with number ${pokemonNumber};`);
      res.locals.title = "Pokémon details page";
      res.render("details", { pokemon });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  renderByType: async (req, res, next) => {
      try {
        const pokemonType = req.params.type;
        const pokemons = await pokemonDataMapper.getAllByType(pokemonType);
        if (!pokemons) {
          return next();
        }
        console.log(`Fetched pokemons by type ${pokemonType};`);
        res.locals.title = "Pokémons by type";
        res.render("index", { pokemons });
      } catch (error) {
        res.status(500).send(error.message);
      }
  },

  renderTypes: async (_, res, next) => {
    try {
        const types = await pokemonDataMapper.getTypes();
        if (!types) {
          return next();
        }
        console.log(`Fetched types;`);
        res.locals.title = "Pokémon types page";
        res.render("types", { types });
      } catch (error) {
        res.status(500).send(error.message);
      }
  }
};

module.exports = mainController;
