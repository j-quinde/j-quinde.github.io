let offset = 1;
let limit = 12;

const upperFirstLetter = (str) => {
    const upper = str.charAt(0).toUpperCase() + str.slice(1);
    return upper;
}

const lowerWord = (str) => {
    const lower = str.toLowerCase();
    return lower;
}

const upperWord = (str) => {
    const upper = str.toUpperCase();
    return upper;
}

const fillZeros = (number) => {
    const newNumber = number.toString().padStart(4, '0');
    return newNumber;
}

const randomPokemon = () =>{
    const random = getRandomInt(1,151);
    fetchDataRandom(random);
}

document.addEventListener('DOMContentLoaded', () => {
    listRegion();
    fetchPokemonKanto(offset,limit);
    randomPokemon();
});

const spinner = () => {
    let span_spn = document.createElement('span');
    span_spn.className = 'spinner-border';
    span_spn.role = 'status';
    span_spn.ariaHidden = 'true';

    const inCard = document.querySelector('#div_card');
    inCard.appendChild(span_spn);
    inCard.querySelector('#sprite_pkm').style.display = 'none';
    inCard.querySelector('.card-body').style.display = 'none';

    //return span_spn;
}

const removeAllChildNodes = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

const btnPrevious = () => {
    if(offset != 1){
        const div_list = document.querySelector('#div_list_pkm');
        removeAllChildNodes(div_list);
        offset -= 12;
        fetchPokemonKanto(offset,limit);
    }
}

const btnNext = () => {
    const div_list = document.querySelector('#div_list_pkm');
    removeAllChildNodes(div_list);
    offset += 12;
    fetchPokemonKanto(offset,limit);
}

const btnRandomPokemon = () => {
    spinner();
    randomPokemon();
}

const btnSearchPokemon = () => {
    const search = document.querySelector('#txt_search').value;
    if(!search){
        alert("Ingrese un nombre o ID de pokemon para realizar la búsqueda.");
        return false;
    }
    spinner();
    fetchDataRandom(search);
}

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min; 
}

const fetchDataRandom = async(id) =>{
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();
        const pokemon = {
            id: data.id,
            name_pkm: data.name,
            type: data.types,
            img1: data.sprites.other.dream_world.front_default,
            img2: data.sprites.other.home.front_default
        }
        datasPokemon(pokemon);
    } catch (error) {
        //console.log(error);
        alert('Pokémon no encontrado.');
        fetchDataRandom(25);//pikachu
    }    
}

const datasPokemon = (pokemon) => {
    const spinner = document.querySelector(".spinner-border");
    if(spinner){
        spinner.remove();
    }
    const card = document.querySelector('#div_card');
    card.querySelector('#sprite_pkm').style.display = '';
    card.querySelector('.card-body').style.display = '';

    if(pokemon.img1){
        card.querySelector('#sprite_pkm').setAttribute('src',pokemon.img1);
    }else{
        card.querySelector('#sprite_pkm').setAttribute('src',pokemon.img2);
    }

    const card_body = card.querySelector('.card-body');
    card_body.querySelector('.card-title').innerHTML =  `${upperFirstLetter(pokemon.name_pkm)} <span class="number-pkm">N°${fillZeros(pokemon.id)}</span>`;

    const types_pokemon = pokemon.type.map((types) => {
        return  `<span class="type-pokemon ${types.type.name}">${upperWord(types_es[types.type.name])}</span>`;
    }).join(' ');

    card_body.querySelector('#type-pokemon').innerHTML = types_pokemon;
}



const fetchPokemonKanto = async(offset,limit) => {
    for (let i = offset; i < offset + limit; i++) {
        await fetchDataList(i);
    }
}

const div_pkm = document.querySelector('#div_list_pkm');
const datasKanto = (pokemon) =>{
    /*let li = document.createElement('li');
    li.className = 'list-group-item';*/

    let div_content = document.createElement('div');
    div_content.className = 'col-md-3 align-items-center mt-2';

    let div_card = document.createElement('div');
    div_card.className = 'card';

    let img = document.createElement('img');
    img.className = 'card-img-top mt-2';
    if(pokemon.img1){
        img.src = pokemon.img1;
    }else{
        img.src = pokemon.img2;
    }

    let div_card_body = document.createElement('div');
    div_card_body.className = 'card-body';

    let h5 = document.createElement('h5');
    h5.className = 'card-title';
    h5.textContent = upperFirstLetter(pokemon.name_pkm);

    let spanNumber = document.createElement('span');
    spanNumber.className = 'number-pkm';
    spanNumber.textContent = ' N°'+fillZeros(pokemon.id);

    let p = document.createElement('p');

    let span = pokemon.type.map((types) => {
        return  `<span class="type-pokemon ${types.type.name}">${upperWord(types_es[types.type.name])}</span>`;
    }).join(' ');

    p.innerHTML = span;

    h5.appendChild(spanNumber);

    div_card_body.appendChild(h5);
    div_card_body.appendChild(p);

    div_card.appendChild(img);
    div_card.appendChild(div_card_body);

    div_content.appendChild(div_card);

    div_pkm.appendChild(div_content);
}

const fetchDataList = async(id) =>{
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();
        const pokemon = {
            id: data.id,
            name_pkm: data.name,
            type: data.types,
            img1: data.sprites.other.dream_world.front_default,
            img2: data.sprites.other.home.front_default
        }
        datasKanto(pokemon);
    } catch (error) {
        console.log(error);
    }    
}


const listRegion = () => {
    const selectRegion = document.querySelector('#list_region');
    const keysRegions = Object.keys(regions);
    const regionsList = keysRegions.map((nameRegion) => {
        return `<option>${upperFirstLetter(nameRegion)}</option>`;
    }).join(' ');

    selectRegion.innerHTML = regionsList;
}

const changeRegion = () => {
    const nameRegion = document.querySelector('#list_region').value;
    let first = regions[lowerWord(nameRegion)].startId;
    let last = regions[lowerWord(nameRegion)].endId;

    const div_list = document.querySelector('#div_list_pkm');
    removeAllChildNodes(div_list);
    offset = first;
    fetchPokemonKanto(offset,limit);
}