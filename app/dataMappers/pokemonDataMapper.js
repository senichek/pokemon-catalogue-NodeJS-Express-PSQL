const client = require("../dbClient");

const pokemonDataMapper = {
  getAll: async () => {
    const result = await client.query("SELECT * FROM pokemon");
    return result.rows;
  },

  getByNumber: async (pokemonNumber) => {
    const query = {
        text: `SELECT
        pokemon.numero,
        pokemon.nom,
        pokemon.pv,
        pokemon.attaque,
        pokemon.defense,
        pokemon.attaque_spe,
        pokemon.defense_spe,
        pokemon.vitesse,
        json_agg(type) as types
        FROM pokemon
        INNER JOIN pokemon_type ON pokemon.numero = pokemon_type.pokemon_numero
        INNER JOIN "type" ON type.id = pokemon_type.type_id WHERE pokemon.numero = $1 group by
        pokemon.numero,
        pokemon.nom,
        pokemon.pv,
        pokemon.attaque,
        pokemon.defense,
        pokemon.attaque_spe,
        pokemon.defense_spe,
        pokemon.vitesse;`,
        values: [pokemonNumber]
      };
      const result = await client.query(query);
      return result.rows[0];
  },

  getAllByType: async (pokemonType) => {
    const query = {
        text: `SELECT
        pokemon.nom,
        pokemon.numero
        FROM pokemon
        INNER JOIN pokemon_type ON pokemon.numero = pokemon_type.pokemon_numero
        INNER JOIN "type" ON type.id = pokemon_type.type_id WHERE type.name = $1;`,
        values: [pokemonType]
      };
      const result = await client.query(query);
      return result.rows;
  },

  getTypes: async () => {
    const query = {
        text: `Select * from type;`,
        values: null
      };
      const result = await client.query(query);
      return result.rows;
  }
};

module.exports = pokemonDataMapper;