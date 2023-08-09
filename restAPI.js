import axios, {isCancel, AxiosError} from 'axios';

import { mostrarPokemon } from "./scripts/mostrarPokemon.js";
import { capturarPokemon } from "./scripts/pokemonCapture.js";
import { enviarDatosPokemon } from "./scripts/jsonServer.js";

const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");
const showMyList = document.querySelector(".buttonPokemon");

console.log(axios.isCancel('something'));


let URL = "https://pokeapi.co/api/v2/pokemon/";

const dbjson = "http://localhost:3000/pokemons/";

for (let i = 1; i <= 151; i++) {
    axios.get(URL + i)
        .then(response=> response.data)
        .then(data => mostrarPokemon(data))
        .catch(error=> console.error(error));
}

//* Se saca los pokemons por clase 

botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;

    listaPokemon.innerHTML = "";
    for (let i = 1; i <= 151; i++) {
        axios.get(URL + i)
            .then((response) => response.data)
            .then(data => {

                if(botonId === "ver-todos") {
                    mostrarPokemon(data);
                } else {
                    const tipos = data.types.map(type => type.type.name);
                    if (tipos.some(tipo => tipo.includes(botonId))) {
                        mostrarPokemon(data);
                    }
                }

            })
            .catch(error => console.error(error));
    }
}))

listaPokemon.addEventListener("click", async (event) => {
    if (event.target.classList.contains("select_Button")) {
        event.preventDefault();
        const pokeId = event.target.id;
        // Lógica para capturar aqui
        const pokemonInfo= await capturarPokemon(URL,pokeId)

        console.log(pokemonInfo)
        if (pokemonInfo){
            console.log("Información enviada");
            enviarDatosPokemon(pokemonInfo,dbjson)
        }else{
            console.log('El pokemon no existe');
        }
        
        console.log("Pokemon capturado:", pokemonInfo.name);
    }
});

showMyList.addEventListener('click', (event)=>{
    console.log("Mostrando mi lista de pokemons")
    //listaPokemon.innerHTML = "";
    //const response = axios.get(dbjson) 
})  

