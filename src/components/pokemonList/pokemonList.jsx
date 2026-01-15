import {
  Card,
  Box,
  CardActions,
  CardMedia,
  Typography,
  Avatar
} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import { typeColorScheme } from '../../utils/colorScheme.js';
import PokemonCard from '../PokemonCard/PokemonCard.jsx';

export default function PokemonList({ pokemons }) {

  return (
    <Box id={"pokemons-container"}>

      {pokemons.length > 0 ? (
        <Box id={"pokemons-list"} sx={{
          paddingY: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}>
          {pokemons.map(pokemon => {
            return (
                <PokemonCard 
                  key={pokemon.id} 
                  pokemon={pokemon} 
                />
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
