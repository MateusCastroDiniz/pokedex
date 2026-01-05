import { useEffect, useState } from "react";
import getPokemonByNameOrId from "../services/pokeApi";

export function usePokemon(nameOrId){
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [typeColors, setTypeColor] = useState(null);



    useEffect(() => {
        if(!nameOrId) return;
        async function fetchPokemon(){
            
            try{
                setLoading(true);
                setError(null);

                const data = await getPokemonByNameOrId(nameOrId);
                setPokemon(data);

            } catch(err) {
                setError("Pokemon não encontrado.");
            } finally {
                setLoading(false);
            }
        }
        fetchPokemon();
    }, [nameOrId])
    
    return {pokemon, loading, error};
}