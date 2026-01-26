import {Box, Typography, Avatar} from '@mui/material';

export default function EvolutionNode({ node }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2
      }}
    >
      {/* Pokémon */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: 2,
          borderRadius: 2,
          backgroundColor: '#f5f5f5',
          minWidth: 120,
          textAlign: 'center',
          alignItems: 'center',
        }}
      >
        <Avatar src={node.pokemon_detail.sprites.other.dream_world.front_default || pokemon.sprites.other['official-artwork'].front_default}
        sx={{
          width: 80,
          height: 'auto',
          marginBottom: 1,
          objectFit:'contain'  
        }} 
        />
        
        <Typography fontWeight="bold" sx={{ textTransform: 'capitalize' }}>
          {node.name}
        </Typography>
          

          <Typography variant="caption" color="text.secondary">
            teste {node.min_level ? `Level ${node.min_level}` : ''}
          </Typography>

          {node.trigger && (
            <Typography variant="caption" color="text.secondary">
              Evolves by {node.trigger.replace('-', ' ')}
            </Typography>
          )}


      </Box>

      {/* Filhos */}
      {node.children.length > 0 && (
        <Box
          sx={{
            display: 'flex',
            gap: 3,
            marginTop: 2,
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}
        >
          {node.children.map((child) => (
            <EvolutionNode key={child.name} node={child} />
          ))}
        </Box>
      )}
    </Box>
  );
}
