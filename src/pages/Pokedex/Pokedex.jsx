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
import PokemonCard from '../../components/PokemonCard/PokemonCard.jsx';

export default function PokemonVisualizer({ pokemons }) {
  const navigate = useNavigate();

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
