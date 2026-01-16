import { useEffect, useState } from "react";
import {getEvolutionChain, getPokemonByNameOrId, getSpecieDetail, getTypeDetail} from "../services/pokeApi";
import { getColorBySpecieId } from "../utils/speciesColor";
import {statRangeCalc} from "../utils/statRangeCalc"
import { calculateTypeEffectiveness } from "../utils/calcTypeEffectiveness";
import {buildEvoTree, flattenEvolution} from '../utils/pokemonEvolution'

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
                speed: 'Speed',
                'special-attack': 'Special Attack',
                'special-defense': 'Special Defense',
                };

                const statKeyMap = {
                'hp': 'HP',
                'attack': 'Attack',
                'defense': 'Defense',
                'speed': 'Speed',
                'special-attack': 'Sp. Atk.',
                'special-defense': 'Sp. Def.',
                };

                const formatGrowthRate = (rate) =>
                rate.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());

                
                data.meta = {
                    baseExp: data.base_experience,
                    evYield: data.stats
                    .filter(s => s.effort > 0)
                    .map(s => ({
                        value: s.effort,
                        key: statKeyMap[s.stat.name] ?? s.stat.name,
                        label: statLabelMap[s.stat.name] ?? s.stat.name
                    })),
                    catchRate: specieDetail.capture_rate,
                    baseFriendship: specieDetail.base_happiness,
                    growthRate: formatGrowthRate(specieDetail.growth_rate.name)
                };
                
                data.stats = data.stats.map(s => {
                    const isHP = s.stat.name === "hp";
                    const statName = s.stat.name

                    s.stat.name = statLabelMap[statName] ?? statName
                    s.stat.nameWrap =  statKeyMap[statName] ?? statName

                    return{
                        ...s,
                        range: statRangeCalc(s.base_stat, isHP)
                    }
                })
                
                data.typesDetails = await Promise.all(
                data.types.map(t => getTypeDetail(t.type.name))
                );

                data.typeEffects = calculateTypeEffectiveness(data.typesDetails)

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

                const evolution = await getEvolutionChain(specieDetail.evolution_chain.url)

                data.evoTree = buildEvoTree(evolution.chain)


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