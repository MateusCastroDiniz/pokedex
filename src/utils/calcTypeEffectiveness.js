import {ALL_TYPES} from './types';

export function calculateTypeEffectiveness(typesDetails) {
    const effectiveness = {};

    ALL_TYPES.forEach(t => {
        effectiveness[t] = 1;
    })
    typesDetails.forEach(type => {
        type.damage_relations.double_damage_from.forEach(t => {
            effectiveness[t.name] *=  2;
        });

        type.damage_relations.half_damage_from.forEach(t => {
            effectiveness[t.name] *=  0.5;
        });

        type.damage_relations.no_damage_from.forEach(t => {
            effectiveness[t.name] *= 0;
        });
    });

return effectiveness;
}
