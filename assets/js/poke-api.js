const pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    
    pokemon.types = types
    pokemon.type = type

    const stats = pokeDetail.stats.map((pokeStats) => ({
        name: pokeStats.stat.name,
        value: pokeStats.base_stat
    }));

    pokemon.stats = stats;

    const options = {
        series: [{
            name: 'Pokémon Stats',
            data: stats.map(stat => stat.value)
        }],
        chart: {
            height: 350,
            type: 'radar'
        },
        title: {
            text: 'Pokémon Stats',
        },
        xaxis: {
            categories: stats.map(stat => {
                return stat.name.charAt(0).toUpperCase() + stat.name.slice(1);
            }),
            labels: {
                style: {
                    fontSize: '16px',
                },
                offsetY: 4
            }
        },
        yaxis: {
            min: 0,
            max: 250,
            tickAmount: 4,
            show: false
        },
        fill: {
            opacity: .5
        },
        stroke: {
            show: true,
            width: 1,
            colors: ['#36A2EB']
        },
        markers: {
            size: 0
        }
    };

    const chart = new ApexCharts(document.querySelector("#pokemonStatsChart"), options);
    chart.render();

    console.log(stats);

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonDetails) => (pokemonDetails))
};