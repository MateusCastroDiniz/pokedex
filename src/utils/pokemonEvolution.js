export function flattenEvolution(node, parent = null, result = []) {
  if (parent) {
    result.push({
      from: parent.species.name,
      to: node.species.name,
      details: node.evolution_details
    });
  }

  node.evolves_to.forEach(child =>
    flattenEvolution(child, node, result)
  );

  return result;
}

export function buildEvoTree(chainNode){
  return{
    name: chainNode.species.name,
    trigger: chainNode.evolution_details?.[0]?.trigger.name ?? null,
    children: chainNode.evolves_to.map(buildEvoTree)
  };
}