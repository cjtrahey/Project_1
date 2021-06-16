# <center><img src="https://cdn2.bulbagarden.net/upload/4/4b/Pok%C3%A9dex_logo.png" alt="PokeDex Logo" title="PokeDex">

# Welcome to Project One - "The PokeDex"


<center>

## Introduction

</center>

* The [Pokedex](https://pokeapi.com/) is any Pokemon Trainer's best friend when it comes to finding information about the monsters they encounter on their journey to becoming Champion.

<center>

## Team Members

</center>
<center>

> [Allen Ladd](https://github.com/Aladd616)

> [Alyson Orta](https://github.com/alysonorta)

> [Carla Kinley-Davis](https://github.com/ckinleydavis)

> [CJ Trahey](https://github.com/cjtrahey)

</center>
<center>

## Product

</center>

* words

<center>

## Solution

</center>

*  words

<center>

## Concept

</center>

* words

<center>

## User Story

</center>

* AS a..
* I want to..
* SO THAT I can..

<center>

## Simplified Mechanics

</center>

* The PokeDex we created, in a vaccum, is very backend-heavy. The design of the website itself was not particularly world-changing, but the JS and the connections from there are what makes this product truly function. The way that this product works is that once a correctly-spelled entry ("Pokemon") is applied, data is pulled from both APIs used in this project in order to display both entities in a list for the user to read.

<center>

## Technologies Used

</center>

* HTML
* CSS
* JavaScript
* >[PokeAPI](https://pokeapi.co/)
* >[Smogon Usage API](https://smogon-usage-stats.herokuapp.com/)

<center>

## Example

</center>

```
//This Function calls for the basic entry for the Pokemon

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

```

```

// This function pulls the base stats for the selected Pokemon

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

```

<center>

## Future Technologies
<br></center>
In the future, we plan on adding the following ideas to the project: 
<p>

* Adding dynamic backgrounds to the entry screen based on the Pokemon's typing
* Adding a dropdown list for search history and Competitive tiers
* If possible, adding in-game music to the background of the website to further drive the "research" theme that the PokeDex represents




