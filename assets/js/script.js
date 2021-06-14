
var pokeFormEl = document.querySelector('#poke-form');
var pokeInputEl = document.querySelector('#poke');
var todayBox = document.querySelector('#today-box');
var menuList = document.querySelector('#menu-list');
var abilities
var moves
var stats
var item

var pastPokemon = [];
console.log('pastpokemon', pastPokemon);

var storedPokemon = JSON.parse(localStorage.getItem('Pokemon'));
console.log('storedPokemon',storedPokemon);


var pokeForm = function (event){
    event.preventDefault();

    var pokemon = pokeInputEl.value.trim();
    if(pokemon) {

        generalPokedex(pokemon);
        smogon(pokemon);
        pastPokemon.push(pokemon);
        localStorage.setItem('Pokemon', JSON.stringify(pastPokemon));
        Stats(pokemon);
        console.log(pokemon);

    } else {
        alert('Please enter a generation 8 Overused pokemon and check spelling')
    }
};



var generalPokedex = function (pokemon) {
    var pokeApi = 'https://pokeapi.co/api/v2/pokemon-species/'+pokemon+'/';

    fetch(pokeApi)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);
                    
                    const entry = data.flavor_text_entries.find(fte=>fte.language.name ==='en')
                    console.log(entry)

                    
                })
            }
        })
}

var Stats = function (pokemon) {
    var baseStats = 'https://pokeapi.co/api/v2/pokemon/'+pokemon+'/';

    fetch(baseStats)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);

                var hp = Number(data.stats[0].base_stat);
                var attack = Number(data.stats[1].base_stat);
                var defense = Number(data.stats[2].base_stat);
                var special_att = Number(data.stats[3].base_stat);
                var special_def = Number(data.stats[4].base_stat);
                var speed = Number(data.stats[5].base_stat);
                var bst = hp + attack + defense + special_att + special_def + speed;

                var height = data.height;
                var weight = data.weight;

                var sprite = data.sprites.front_default;
                
                console.log('HP',hp);
                console.log('attack', attack);
                console.log('defense', defense);
                console.log('specialattack', special_att);
                console.log('special_def', special_def);
                console.log('speed', speed);
                console.log('bst',bst);

                console.log('height',height);
                console.log('weight',weight);

                var image = document.createElement('img')
                    image.src = sprite
                    document.body.appendChild(image)

                for (var i = 0; i < data.types.length; i++) {
                    var type = data.types[i].type;
                    console.log('type',type)
                }

                })
            }
        })
}

function smogon(pokemon) {
    var smogonData = 'https://cors-anywhere.herokuapp.com/https://smogon-usage-stats.herokuapp.com/gen8ou/'+pokemon;

    fetch(smogonData)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)

            var ability = data.abilities;
            var items = data.items;
            var moves = data.moves;
            var spreads = data.spreads;

            console.log("ability", ability);
            console.log('items',items);
            console.log('moves',moves);
            console.log('spreads',spreads)
        })

        

}



pokeFormEl.addEventListener('submit', pokeForm);