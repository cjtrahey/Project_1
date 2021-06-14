  
var pokeFormEl = document.querySelector('#poke-form');
var pokeInputEl = document.querySelector('#poke');
var todayBox = document.querySelector('#today-box');
var menuList = document.querySelector('#menu-list');
var abilities
var moves
var stats
var item


var pokeForm = function (event){
    event.preventDefault();

    var pokemon = pokeInputEl.value.trim();
    if(pokemon) {

        generalPokedex(pokemon);
        smogon(pokemon);
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

                var hp = data.stats[0].base_stat;
                var attack = data.stats[1].base_stat;
                var defense = data.stats[2].base_stat;
                var special_att = data.stats[3].base_stat;
                var special_def = data.stats[4].base_stat;
                var speed = data.stats[5].base_stat;
                
                console.log('HP',hp);
                console.log('attack', attack);
                console.log('defense', defense);
                console.log('specialattack', special_att);
                console.log('special_def', special_def);
                console.log('speed', speed);

                for (var i = 0; i < data.types.length; i++) {
                    var type = data.types[i].type;
                    console.log('type',type)
                }

                })
            }
        })
}

// var getAreaMenu = function (zip) {
//     var menuApi = 'https://api.documenu.com/v2/restaurants/zip_code/'+zip+'?key=a066d36aaebc3eeceb6e2edd2c821cbb&fullmenu=true&size=50&page=1';

//     fetch(menuApi)
//         .then(function (response) {
//             if (response.ok) {
//                 console.log(response);
//                 response.json().then(function (data) {
//                     console.log(data);
//                     var cityName = data.data[0].address.city
//                     console.log(cityName);

//                     hotelDisplay(cityName);

//                     for (var i = 0; i < 10; i++) {
//                         var name = data.data[i].restaurant_name;
//                         var address = data.data[i].address.formatted;
//                        var  phone = data.data[i].restaurant_phone;
//                        var website = data.data[i].restaurant_website;
                       

//                        console.log('name',name);
//                        console.log('address',address);
//                        console.log('phone',phone);
//                        console.log('website',website);
//                     }
                    
//                 })
//             }
//         })
// }

functions smogon(pokemon) {
    var requestUrl = 'https://cors-anywhere.herokuapp.com/https://smogon-usage-stats.herokuapp.com/gen8ou/'+pokemon;

    fetch(requestUrl)
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



zipFormEl.addEventListener('submit', zipForm);