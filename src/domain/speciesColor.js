import { speciesColorScheme } from './colorScheme.js';
import { getSpecieDetail } from '../services/pokeApi.js';

export async function getColorBySpecieId(pokemonId){
    try{
        const specieDetail = await getSpecieDetail(pokemonId);
        
        return speciesColorScheme[specieDetail.color.name];
    }catch(err){
        return {
            primary: 'rgba(200, 200, 200, 0.85)',
            soft: 'rgba(200, 200, 200, 0.25)'
        };
    }
}