import {Box, Typography} from '@mui/material';

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
          padding: 2,
          borderRadius: 2,
          backgroundColor: '#f5f5f5',
          minWidth: 120,
          textAlign: 'center'
        }}
      >
        <Typography fontWeight="bold" sx={{ textTransform: 'capitalize' }}>
          {node.name}
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
