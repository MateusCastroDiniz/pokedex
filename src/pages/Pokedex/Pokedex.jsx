import {
  Card,
  Box,
  CardActions,
  CardMedia,
  Typography,
  Avatar
} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import { typeColorScheme } from '../../domain/colorScheme.js';

export default function PokemonVisualizer({ pokemons }) {
  const navigate = useNavigate();
  const getLocalTypeIcon = (typeName) => 
    `assets/types/gen8/${typeName.toLowerCase()}.png`;

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
            return (
                <Card
                key={pokemon.id}
                onClick={() => navigate(`/pokemon/${pokemon.id}`)} 
                sx={{
                    display: 'flex',
                    height: '120px',
                    backgroundColor: pokemon.colorBase?.primary || 'rgba(200, 200, 200, 0.85)',
                    justifyContent: 'space-between',
                    color: '#333',
                    borderRadius: 4,
                    padding: 1,
                    cursor: 'pointer', 
                    
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

                            <Typography variant="h5" sx={{fontWeight: 'bolder', color: pokemon.colorBase?.font_color}}>
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
                            image={pokemon.sprites.other.dream_world.front_default || pokemon.sprites.other['official-artwork'].front_default}
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
      {/* <PokemonModal
        open={modalOpen}
        handleClose={handleCloseModal}
        pokemon={selectedPokemon}
        baseColor={baseColor}
      /> */}
    </Box>
  );
}
