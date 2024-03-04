//provided to fill the leading zero.
function pad(num, size) {
 num = num.toString();
 while (num.length < size) num = "0" + num;
 return num;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

async function fetchPokemon(url) {
//TODO 4: Fetch the data according to the URL parameter.
const response = await fetch(url);
const pokemon_json = await response.json();
//TODO 5: Obtain the div that created in TODO 2 
let divElement = document.getElementById(pokemon_json.name);

//TODO 6: Create the element p, set the class to pid and put the pokemon’s id 
// inside the element and append to the div obtained in TODO 5. 
// HINTS: you can use document.createTextNode(‘text’) to create a text node, and 
// append to the element. <p>test</p> is equivalent to:
// var p = document.createElement(‘p’);
// var textNode = document.createTextNode(‘test’);
// p.appendChild(textNode)
var p = document.createElement("p");
var leadingZero = pad(pokemon_json.id, 3)
var textNode = document.createTextNode(leadingZero);
p.appendChild(textNode);
p.classList.add("pid");
divElement.appendChild(p);
 
//TODO 7: Create the img element, set the src to the image link obtained from the 
// API, and append to the div obtained in TODO 5.
var img = document.createElement("img");
img.src = pokemon_json.sprites.front_default;
divElement.appendChild(img);

//TODO 8: Create the element p, set the class to “name” and 
// put the pokemon’s name inside the element and
// append to the div obtained in TODO 5. 
var p = document.createElement("p");
var textNode = document.createTextNode(pokemon_json.name.toUpperCase());
p.appendChild(textNode); 
p.classList.add("name");
divElement.appendChild(p);

//TODO 9: Create the element p, set the class to “type” and 
// put the pokemon’s type inside the element and
// append to the div obtained in TODO 5. 
// Note that you need to join multiple types into single string.
var p = document.createElement("p");
let name = ""
let temp = ""

for (i = 0; i < pokemon_json.types.length ; i++){
    if (pokemon_json.types.length == 1){
        temp = capitalizeFirstLetter(pokemon_json.types[0].type.name);
        name = temp
    }else if (i == 0){
        temp = capitalizeFirstLetter(pokemon_json.types[i].type.name)
        name += temp + ","
    } else{
        temp = capitalizeFirstLetter(pokemon_json.types[i].type.name)
        name += temp
    }
}
var textNode = document.createTextNode(name)
p.appendChild(textNode); 
p.classList.add("type");
divElement.appendChild(p);

}
async function fetchPokemons() {
//TODO 1: Call API https://pokeapi.co/api/v2/pokemon?offset=20&limit=20 to fetch 
// the pokemons and store the returned JSON in a variable. 
const response = await fetch('https://pokeapi.co/api/v2/pokemon?offset=20&limit=20') 
 // ;
let response_json = await response.json();

//TODO 2: For each pokemon, use “document.createElement” to create a div, set the 
// pokemon’s name as the div’s id, and set the class to ‘pokemon’. Append 
// the new created div to the given pokemons div
// You may use setAttribute and appendChild function accordingly. 
let results = response_json.results
let name = ""

for (i = 0; i < results.length; i++){
    name = results[i].name;
    newDiv = document.createElement("div");
    newDiv.id = name;
    newDiv.classList.add("pokemons");
    document.getElementById("pokemons").appendChild(newDiv);
    pokemon = results[i].url;
    //TODO 3: After that inside the same loop, 
    // call second API to fetch individual Pokémon. 
    fetchPokemon(pokemon);
}
}
fetchPokemons()

/** dd
 * ddd
 */