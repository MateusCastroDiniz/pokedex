import {getPokemonByNameOrId} from '../services/pokeApi.js';

export function flattenEvolution(node, parent = null, result = []) {
  if (parent) {
    result.push({
      from: parent.species.name,
      to: node.species.name,
      details: node.evolution_details,
      pokemon: getSpeciesbyNameOrId(node.species.name)
    });
  }

  node.evolves_to.forEach(child =>
    flattenEvolution(child, node, result)
  );

  return result;
}

export function buildEvoTree(chainNode){

  const evoDetails = chainNode.evolution_details?.[0];

  return{
    name:chainNode.species.name,
    trigger: evoDetails?.trigger.name ?? null,
    min_level: evoDetails?.min_level ?? null,
    children: chainNode.evolves_to.map(buildEvoTree)
  }
}


export async function enrichEvoTree(node) {
  const pokemonDetail = await getPokemonByNameOrId(node.name)

  return{
    ...node,
    pokemon_detail: pokemonDetail,
    children: await Promise.all(
      node.children.map(enrichEvoTree)
    )
  }
}