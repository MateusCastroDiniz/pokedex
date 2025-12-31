import React, { useState } from 'react';
import {
  Card,
  Box,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  CardHeader,
  TextField,
  Avatar
} from '@mui/material';
import Badge from '@mui/material/Badge';
import PokemonModal from './modal.jsx';

export default function PokemonVisualizer({ pokemons }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [baseColor, setBaseColor] = useState(null)

  const typeColorScheme = {
    normal: {
      primary: 'rgba(214, 214, 194, 1.0)',
      secondary: 'rgba(170, 170, 145, 1.0)'
    },
    fire: {
      primary: 'rgba(245, 172, 120, 1.0)',
      secondary: 'rgba(255, 100, 50, 1.0)'
    },
    water: {
      primary: 'rgba(157, 183, 245, 1.0)',
      secondary: 'rgba(70, 130, 255, 1.0)'
    },
    electric: {
      primary: 'rgba(250, 224, 120, 1.0)',
      secondary: 'rgba(255, 195, 0, 1.0)'
    },
    grass: {
      primary: 'rgba(167, 219, 141, 1.0)',
      secondary: 'rgba(110, 190, 75, 1.0)'
    },
    ice: {
      primary: 'rgba(188, 230, 230, 1.0)',
      secondary: 'rgba(100, 200, 255, 1.0)'
    },
    fighting: {
      primary: 'rgba(214, 120, 115, 1.0)',
      secondary: 'rgba(160, 45, 50, 1.0)'
    },
    poison: {
      primary: 'rgba(193, 131, 193, 1.0)',
      secondary: 'rgba(130, 60, 170, 1.0)'
    },
    ground: {
      primary: 'rgba(235, 214, 157, 1.0)',
      secondary: 'rgba(190, 145, 80, 1.0)'
    },
    flying: {
      primary: 'rgba(198, 183, 245, 1.0)',
      secondary: 'rgba(120, 100, 220, 1.0)'
    },
    psychic: {
      primary: 'rgba(250, 146, 178, 1.0)',
      secondary: 'rgba(255, 60, 110, 1.0)'
    },
    bug: {
      primary: 'rgba(198, 209, 110, 1.0)',
      secondary: 'rgba(150, 180, 20, 1.0)'
    },
    rock: {
      primary: 'rgba(209, 193, 125, 1.0)',
      secondary: 'rgba(160, 130, 70, 1.0)'
    },
    ghost: {
      primary: 'rgba(162, 146, 188, 1.0)',
      secondary: 'rgba(100, 80, 160, 1.0)'
    },
    dragon: {
      primary: 'rgba(162, 125, 250, 1.0)',
      secondary: 'rgba(95, 50, 200, 1.0)'
    },
    dark: {
      primary: 'rgba(162, 146, 136, 1.0)',
      secondary: 'rgba(90, 80, 70, 1.0)'
    },
    steel: {
      primary: 'rgba(209, 209, 224, 1.0)',
      secondary: 'rgba(140, 140, 160, 1.0)'
    },
    fairy: {
      primary: 'rgba(244, 189, 201, 1.0)',
      secondary: 'rgba(255, 120, 160, 1.0)'
    }
  };

  const getLocalTypeIcon = (typeName) => 
    `assets/types/gen8/${typeName.toLowerCase()}.png`;

  const handleOpenModal = (pokemon, baseColor) => {
    setSelectedPokemon(pokemon);
    setBaseColor(baseColor);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setBaseColor('#eee')
    setSelectedPokemon(null);
  };

  return (
    <Box id={"pokemons-container"} sx={{
      width: '100%'
    }}>

      {pokemons.length > 0 ? (
        <Box id={"pokemons-list"} sx={{
          paddingY: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}>
          {pokemons.map(pokemon => {

            const bgColor = pokemon.types?.[0]
              ? typeColorScheme[pokemon.types[0].type.name].primary || '#eee'
              : '#eee';

            return (
                <Card
                key={pokemon.id}
                onClick={() => handleOpenModal(pokemon, bgColor)} 
                sx={{
                    display: 'flex',
                    height: '120px',
                    backgroundColor: bgColor,
                    justifyContent: 'space-between',
                    color: '#333',
                    borderRadius: 4,
                    padding: 1,
                    cursor: 'pointer', 
                    boxShadow: '0px 0px 20px ' + bgColor.replace('1.0', '0.2'),
                    '&:hover': {
                    boxShadow: '0px 0px 20px ' + bgColor.replace('1.0', '0.9'), 
                    }
                }}
                >

                    <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%',
                    width: '40%'
                    }}>
                        <Box sx={{display: 'flex',flexDirection:'column', gap:1, paddingX: 2, alignItems: 'start'}}>
                            <Typography variant="body1" sx={{fontWeight: 'bold'}}>
                                {`#${pokemon.id}`}
                            </Typography>

                            <Typography variant="h5" sx={{fontWeight: 'bolder', color: '#ffff'}}>
                                {pokemon.name.toUpperCase()}
                            </Typography>
                        </Box>
                        <CardActions sx={{width: 'fit-content'}}>
                            {pokemon.types.map(t => {
                                const secondaryBgColor = typeColorScheme[t.type.name]?.secondary;
                                return(
                                  <Box
                                    key={t.type.name}
                                    sx={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap:1,
                                      height: '30px',
                                      paddingX:'5px',
                                      borderRadius: '6px',
                                      backgroundColor: secondaryBgColor,
                                    }}
                                  >
                                    <Avatar sx={{width: 20, height: 20}} src={getLocalTypeIcon(t.type.name)} />

                                    <Typography
                                      variant='body2'
                                      sx={{
                                        color: '#fff',
                                        textTransform: 'capitalize',
                                        fontWeight: 500,
                                      }}
                                    >
                                      {t.type.name}
                                    </Typography>
                                  </Box>
                                    // <Badge 
                                    // badgeContent={t.type.name} 
                                    // color='primary'
                                    // sx={{
                                    //     '& .MuiBadge-badge': {
                                    //     backgroundColor: secondaryBgColor,
                                    //     color: '#fff', 
                                    //     borderRadius: '8px', 
                                    //     padding: '0.5em', 
                                    //     },
                                    //     }}
                                    //     >
                                    //     <Avatar src={getLocalTypeIcon(t.type.name)}/>
                                    // </Badge>
                                )
                        
                    })}
                        </CardActions>
                    </Box>

                    <Box sx={{
                    height: '100%',
                    width: 'auto'
                    }}>
                        <CardMedia
                            component="img"
                            image={pokemon.sprites.front_default}
                            title={pokemon.name.toUpperCase()}
                            sx={{
                            objectFit: 'contain',
                            height: '130px',
                            width: 'auto',
                            alignSelf: 'center',
                            }}
                        />
                    </Box>
                </Card>
            );
          })}
        </Box>
      ) : (
        <Typography>Carregando...</Typography>
      )}

      {/* Modal de Detalhes */}
      <PokemonModal
        open={modalOpen}
        handleClose={handleCloseModal}
        pokemon={selectedPokemon}
        baseColor={baseColor}
      />
    </Box>
  );
}
