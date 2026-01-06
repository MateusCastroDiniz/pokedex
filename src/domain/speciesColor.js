import { speciesColorScheme } from './colorScheme.js';
import { getColorFromSpeciesById } from '../services/pokeApi.js';

export async function getColorBySpecieId(pokemonId){
    try{
        const colorName = await getColorFromSpeciesById(pokemonId);
        
        return speciesColorScheme[colorName];
    }catch(err){
        return {
            primary: 'rgba(200, 200, 200, 0.85)',
            soft: 'rgba(200, 200, 200, 0.25)'
        };
    }
}