import { useEffect, useState } from "react";
import {getPokemonByNameOrId, getColorFromSpeciesById} from "../services/pokeApi";

export function usePokemon(nameOrId){
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        if(!nameOrId) return;
        async function fetchPokemon(){
            
            try{
                setLoading(true);
                setError(null);

                let data = await getPokemonByNameOrId(nameOrId);

                data["colorBase"] = await getColorFromSpeciesById(data.id); 

                setPokemon(data);

            } catch(err) {
                setError("Pokemon não encontrado.");
            } finally {
                setLoading(false);
            }
        }
        fetchPokemon();
    }, [])
    
    return {pokemon, loading, error};
}