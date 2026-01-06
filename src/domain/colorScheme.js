  export const typeColorScheme = {
  normal: {
    primary: 'rgba(214, 214, 194, 1.0)', secondary: 'rgba(170, 170, 145, 1.0)'
  },
  fire: {
    primary: 'rgba(245, 172, 120, 1.0)', secondary: 'rgba(255, 100, 50, 1.0)'
  },
  water: {
    primary: 'rgba(157, 183, 245, 1.0)', secondary: 'rgba(70, 130, 255, 1.0)'
  },
  electric: {
    primary: 'rgba(250, 224, 120, 1.0)', secondary: 'rgba(255, 195, 0, 1.0)'
  },
  grass: {
    primary: 'rgba(167, 219, 141, 1.0)', secondary: 'rgba(110, 190, 75, 1.0)'
  },
  ice: {
    primary: 'rgba(188, 230, 230, 1.0)', secondary: 'rgba(100, 200, 255, 1.0)'
  },
  fighting: {
    primary: 'rgba(214, 120, 115, 1.0)', secondary: 'rgba(160, 45, 50, 1.0)'
  },
  poison: {
    primary: 'rgba(193, 131, 193, 1.0)', secondary: 'rgba(130, 60, 170, 1.0)'
  },
  ground: {
    primary: 'rgba(235, 214, 157, 1.0)', secondary: 'rgba(190, 145, 80, 1.0)'
  },
  flying: {
    primary: 'rgba(198, 183, 245, 1.0)', secondary: 'rgba(120, 100, 220, 1.0)'
  },
  psychic: {
    primary: 'rgba(250, 146, 178, 1.0)', secondary: 'rgba(255, 60, 110, 1.0)'
  },
  bug: {
    primary: 'rgba(198, 209, 110, 1.0)', secondary: 'rgba(150, 180, 20, 1.0)'
  },
  rock: {
    primary: 'rgba(209, 193, 125, 1.0)', secondary: 'rgba(160, 130, 70, 1.0)'
  },
  ghost: {
    primary: 'rgba(162, 146, 188, 1.0)', secondary: 'rgba(100, 80, 160, 1.0)'
  },
  dragon: {
    primary: 'rgba(162, 125, 250, 1.0)', secondary: 'rgba(95, 50, 200, 1.0)'
  },
  dark: {
    primary: 'rgba(162, 146, 136, 1.0)', secondary: 'rgba(90, 80, 70, 1.0)'
  },
  steel: {
    primary: 'rgba(209, 209, 224, 1.0)', secondary: 'rgba(140, 140, 160, 1.0)'
  },
  fairy: {
    primary: 'rgba(244, 189, 201, 1.0)', secondary: 'rgba(255, 120, 160, 1.0)'
  }
};

export const speciesColorScheme = {
  blue: {
    primary: 'rgba(104, 144, 240, 0.85)',   
    soft: 'rgba(104, 144, 240, 0.25)',
    font_color: '#fff'
  },

  brown: {
    primary: 'rgba(184, 144, 96, 0.85)',
    soft: 'rgba(184, 144, 96, 0.25)',
    font_color: '#fff'
  },

  gray: {
    primary: 'rgba(168, 168, 168, 0.85)',
    soft: 'rgba(168, 168, 168, 0.25)',
    font_color: '#fff'
  },

  green: {
    primary: 'rgba(120, 200, 80, 0.85)',
    soft: 'rgba(120, 200, 80, 0.25)',
    font_color: '#fff'
  },

  pink: {
    primary: 'rgba(240, 160, 200, 0.85)',
    soft: 'rgba(240, 160, 200, 0.25)',
    font_color: '#fff'
  },

  purple: {
    primary: 'rgba(160, 120, 200, 0.85)',
    soft: 'rgba(160, 120, 200, 0.25)',
    font_color: '#fff'
  },

  red: {
    primary: 'rgba(240, 80, 80, 0.85)',
    soft: 'rgba(240, 80, 80, 0.25)',
    font_color: '#fff'
  },

  white: {
    primary: 'rgba(245, 245, 245, 0.9)',
    soft: 'rgba(245, 245, 245, 0.4)',
    font_color: '#2b2b2bff'
  },

  yellow: {
    primary: 'rgba(248, 208, 48, 0.85)',
    soft: 'rgba(248, 208, 48, 0.25)',
    font_color: '#fff'
  }
}


export function getSpecieColor(colorSpecie){
  return speciesColorScheme[colorSpecie] || {
    primary: 'rgba(200, 200, 200, 0.85)',
    soft: 'rgba(200, 200, 200, 0.25)',
  };
}

export function getTypeColor(typeName){
  return typeColorScheme[typeName] || {
    primary: 'rgba(200, 200, 200, 1.0)',
    secondary: 'rgba(150, 150, 150, 1.0)'
  };
}