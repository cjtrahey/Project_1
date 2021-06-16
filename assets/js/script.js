// initial variable declaration
var pokeFormEl = document.querySelector('#poke-form');
var pokeInputEl = document.querySelector('#poke');
var todayBox = document.querySelector('#today-box');
var menuList = document.querySelector('#menu-list');

var hitPoints = document.getElementById('hp');
var atk = document.getElementById('attack');
var def = document.getElementById('defense');
var specAtk = document.getElementById('special_att');
var specDef = document.getElementById('special_def');
var spd = document.getElementById('speed');
var baseTotal = document.getElementById('bst');
var hgt = document.getElementById('height');
var wgt = document.getElementById('weight');

var abilities = document.getElementById('ability');
var pokeMoves = document.getElementById('moves');
var stats = document.getElementById('spreads');
var item = document.getElementById('items');
var typeShow = document.getElementById('type');

var pokeSprite = document.getElementById('sprite');
var pokeName = document.getElementById('pokemon-name');
var history = document.querySelector('#history');
var description = document.getElementById('description');

var pastPokemon = [];
console.log('pastpokemon', pastPokemon);

var typeList



// function pokestorage () {
//     var form = document.createElement('form');
//     form.className = 'previousFrom';

//     var select = document.createElement('select')
//     select.setAttribute =('id', 'myPokemon');

//     for (var i = 0; i < pastPokemon.length; i++) {
//         var option = document.createElement('option')
//         option.innerText = pastPokemon[i];
//         // select.appendChild(pastPokemon[i])
//     }
// }

// stores the pokemon data in an array in local starage
var storedPokemon = JSON.parse(localStorage.getItem('Pokemon'));
console.log('storedPokemon',storedPokemon);

if (storedPokemon != null){
    pastPokemon = storedPokemon;
}

function renderPokemon() {
    for (var i = 0; i < pastPokemon; i++) {
        history.innerHTML = "";
        var poke = pastPokemon[i];

        var li = document.createElement('li');
        li.textContent = poke;
        li.setAttribute('data-index', i);

        history.appendChild(li);
    }
}


// function of the search button
var pokeForm = function (event){
    event.preventDefault();

    var pokemon = pokeInputEl.value.trim();
    pokeName.innerText = pokemon;
    if(pokemon) {

        generalPokedex(pokemon);
        smogon(pokemon);
        pastPokemon.push(pokemon);

        localStorage.setItem('Pokemon', JSON.stringify(pastPokemon));
        Stats(pokemon);
        console.log(pokemon);

        var parent;

        for(typeList in pokeName) {
            parent = typeList.parentNode;
            parent.removeChild(typeList);
        }

        if(image){
            removeChild(image);
        }
       

    } else {
        alert('Please enter a generation 8 Overused pokemon and check spelling')
    }
};


// first api call for pokeapi primarily obtains flavor text
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
                    var flavor = entry.flavor_text;
                    description.innerText = flavor;
                    
                })
            }
        })
}

// second call of pokeapi obtains base stats
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
                // creates base stat total from stat values obtained from api
                var bst = hp + attack + defense + special_att + special_def + speed;

                var height = data.height;
                var weight = data.weight;

                var sprite = data.sprites.front_default;
                // pokeSprite.appendChild(sprite);


                
                console.log('HP',hp);
                hitPoints.innerText = "Hit points: " + hp;

                console.log('attack', attack);
                atk.innerText = "Attack: " + attack;

                console.log('defense', defense);
                def.innerText = "Defense: " + defense;

                console.log('specialattack', special_att);
                specAtk.innerText = "Special Attack: " + special_att;

                console.log('special_def', special_def);
                specDef.innerText = "Special Defense: " + special_def;

                console.log('speed', speed);
                spd.innerText = "Speed: " + speed;

                console.log('bst',bst);
                baseTotal.innerText = "Base Stat Total: " + bst;


                console.log('height',height);
                hgt.innerText = "Height: " + height;

                console.log('weight',weight);
                wgt.innerText = "Weight: " + weight;



// locates sprite image in api object and creates element to display
                
                var image = document.createElement('img')
                    image.src = sprite
                    document.getElementById("sprite").appendChild(image)
                    

                for (var i = 0; i < data.types.length; i++) {
                    
                    var type = data.types[i].type.name;
                    console.log('type',type);
                    
                    var typeList = document.createElement('p')
                    typeList.innerText = "Type: " + type;
                    pokeName.appendChild(typeList);
                }

                })
            }
        })
}
// smogon api call to locate competative data
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
            abilityArray = JSON.stringify(ability)
            console.log(abilityArray);
            abilities.innerText = abilityArray;

            console.log('items',items);
            itemArray= JSON.stringify(items)
            item.innerText = itemArray;

            console.log('moves',moves);
            var moveList = Object.keys(moves); 
            movesArray = JSON.stringify(moveList);
            pokeMoves.innerText = movesArray;

            console.log('spreads',spreads)
            statsArray = JSON.stringify(spreads)
            
           var nature = Object.keys(spreads);
            var statSpread = Object.values(spreads);
            var superSpread = Object.values(statSpread);
            var actualSpread = (Object.values(superSpread));
            var spreadSpread = (Object.values(actualSpread))
            console.log(spreadSpread);

            stats.innerText = nature[0] + Object.values(statSpread)[Object.keys(0)];
            
        })

        

}

// for (var i=0; i < storedPokemon.length; i++) {
//     var pokemonButton = document.createElement('input');

//     pokemonButton.setAttribute("type","text");
//     pokemonButton.setAttribute('readonly',"true");
//     pokemonButton.getAttribute('value', storedPokemon[i]);
//     pokemonButton.addEventListener('click',function() {
//         generalPokedex(pokemonButton.value);
//         Stats(pokemonButton.value);
//         smogon(pokemonButton.value);
//     })
//     document.body.append(pokemonButton);
// }

renderPokemon();

// eventlistener for searchbutton
pokeFormEl.addEventListener('submit', pokeForm);

