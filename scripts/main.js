const listPokemon = document.getElementById("pokemonList");
const btn = document.getElementById("btn");

let offset = 0;
const limit = 10;

function convertPokemonToLi(pokemon) {
  return `<li class="pokemon ${pokemon.type}">
  <div class="detail">
    <img
      class="imagem-pokemon"
      src="${pokemon.image}"
      alt="Pokemon ${pokemon.name}" 
    />

    <h2 class="pokemon-name">${pokemon.name}</h2>
    <ol class="types ">
      ${pokemon.types
        .map((type) => `<li class="type ${type}">${type}</li>`)
        .join("")}
    </ol>
  </div>
  <h3 class="pokemon-number">#${pokemon.number}</h3>
</li>`;
}

function loadPage(offset, limit) {
  var addPokeObj;
  pokeApi.getPokemonList(offset, limit).then((pokemons = []) => {
    //Adicionar no HTML
    const addHtml = pokemons
      .map((pokemon) => convertPokemonToLi(pokemon))
      .join("");
    listPokemon.innerHTML += addHtml;
  });
}

loadPage(offset, limit);

btn.addEventListener("click", () => {
  offset += limit;
  loadPage(offset, limit);
});
