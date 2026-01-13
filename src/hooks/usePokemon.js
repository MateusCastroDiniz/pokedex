import { useEffect, useState } from "react";
import {getPokemonByNameOrId, getSpecieDetail, getTypeDetail} from "../services/pokeApi";
import { getColorBySpecieId } from "../utils/speciesColor";

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

                data.colorBase = await getColorBySpecieId(data.id); 
                
                const specieDetail = await getSpecieDetail(data.id);
                
                const statLabelMap = {
                hp: 'HP',
                attack: 'Attack',
                defense: 'Defense',
                'special-attack': 'Special Attack',
                'special-defense': 'Special Defense',
                speed: 'Speed'
                };

                const formatGrowthRate = (rate) =>
                rate.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());

                
                
                data.meta = {
                    baseExp: data.base_experience,
                    evYield: data.stats
                    .filter(s => s.effort > 0)
                    .map(s => ({
                        value: s.effort,
                        key: s.stat.name,
                        label: statLabelMap[s.stat.name] ?? s.stat.name
                    })),
                    catchRate: specieDetail.capture_rate,
                    baseFriendship: specieDetail.base_happiness,
                    growthRate: formatGrowthRate(specieDetail.growth_rate.name)
                };

                
                data.typesDetails = await Promise.all(
                data.types.map(t => getTypeDetail(t.type.name))
                );

                const specieDescription =
                specieDetail.flavor_text_entries.find(
                    entry => entry.language.name == 'pt-br'
                ) ||
                specieDetail.flavor_text_entries.find(
                    entry => entry.language.name == 'en'
                );

                data.description = specieDescription
                ? specieDescription.flavor_text.replace(/\f|\n/g, ' ')
                : 'Descrição não disponível.';



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