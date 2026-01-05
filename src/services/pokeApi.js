import axios from 'axios';

const api = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/',
})

export async function getPokemons(limit = 51){
    const response = await api.get(`/pokemon?limit=${limit}`)
    return response.data.results;
}

export async function getPokemonDetails(url){
    const response = await axios.get(url);
    return response.data;
}

export async function getPokemonByNameOrId(term){
    const response = await api.get(`/pokemon/${term}`);
    return response.data;
}

export async function getPokemonEspecieById(term){
    const response = await api.get(`/pokemon-species/${term}`);
    return response.data;
}