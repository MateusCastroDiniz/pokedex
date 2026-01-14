export function calculateTypeEffectiveness(typesDetails) {
  const effectiveness = {};

  typesDetails.forEach(type => {
    type.damage_relations.double_damage_from.forEach(t => {
      effectiveness[t.name] = (effectiveness[t.name] || 1) * 2;
    });

    type.damage_relations.half_damage_from.forEach(t => {
      effectiveness[t.name] = (effectiveness[t.name] || 1) * 0.5;
    });

    type.damage_relations.no_damage_from.forEach(t => {
      effectiveness[t.name] = 0;
    });
  });

  return effectiveness;
}
