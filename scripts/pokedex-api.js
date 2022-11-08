const pokeApi = {};

function convertPokemonDetailstoPokemon(detailsPokemon) {
  const pokemon = new Pokemon();

  pokemon.name = detailsPokemon.name;

  const types = detailsPokemon.types.map(
    (typePokemon) => typePokemon.type.name
  );
  const [type] = types;
  pokemon.type = type;
  pokemon.types = types;

  pokemon.number = detailsPokemon.id;
  pokemon.image = detailsPokemon.sprites.other.dream_world.front_default;

  return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokemonDetailstoPokemon);
};

pokeApi.getPokemonList = (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;

  return fetch(url)
    .then((response) => response.json())
    .then((result) => result.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailsRequest) => Promise.all(detailsRequest))
    .then((detail) => detail);
};
