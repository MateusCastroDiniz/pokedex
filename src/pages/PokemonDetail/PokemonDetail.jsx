import {Box, Typography, Button, ButtonGroup} from '@mui/material';
import {useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {usePokemon} from "../../hooks/usePokemon";
import PokemonCard from '../../components/PokemonCard/PokemonCard';


export default function PokemonDetail() {
  const [description, setDescription] = useState('');
  const [activeTab, setActiveTab] = useState('about');
  
  const toggleTab = (tab) => setActiveTab(tab);
  const navigate = useNavigate();
  const {id} = useParams();

  const {pokemon, loading, error} = usePokemon(id)

  if (loading){
    return <Typography>Loading...</Typography>;
  }

  if (error){
    return <Typography>{error}...</Typography>;
  }

  if (!pokemon){
    return null;
  }



  return (
        <Box 
          sx={{
            display: 'flex', 
            flexDirection: 'column', 
            padding: '2rem', 
            height: '100%'
          }}>
        
          <Typography variant="body2" onClick={() => navigate(-1)}>Voltar</Typography>

        <Box 
          sx={{
            display: 'flex', 
            flexDirection: 'column', 
            width: '100%', 
            height: '100%'
          }}>

          <Box 
            sx={{
              marginBottom: '1rem'
            }}>

            <PokemonCard
              key={pokemon.id} 
              pokemon={pokemon} 
            />

          </Box>
        
          <Box sx={{
                  width: '100%', 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  marginBottom:'1rem'
                }}>

              <ButtonGroup 
              variant="text" 
              aria-label="Basic button group" 
              sx={{
                display: 'flex', 
                justifyContent: 'space-between'
                }}>
                  
                  <Button 
                    onClick={() => toggleTab('about')}
                    sx={{ 
                      borderBottom: activeTab === 'about' ? 2 : 0,
                      borderColor: pokemon.colorBase?.primary
                    }}>
                    About
                  </Button>

                  <Button 
                    onClick={() => toggleTab('stats')}
                    sx={{ 
                      borderBottom: activeTab === 'stats' ? 2 : 0,
                      borderColor: pokemon.colorBase?.primary
                    }}
                  >
                    Stats
                  </Button>
                  <Button 
                    onClick={() => toggleTab('evolution')}
                    sx={{ 
                      borderBottom: activeTab === 'evolution' ? 2 : 0,
                      borderColor: pokemon.colorBase?.primary
                    }}
                  >
                    Evolution
                  </Button>
              </ButtonGroup>
          </Box>

          {activeTab === 'about' && (
            <Box>
              <Box sx={{ marginBottom: '1rem' }}>
                <Typography variant="body1">
                    <strong>Description:</strong> {description}
                </Typography>
              </Box>
              <Box>
                <Typography variant='body1'>
                <strong>Height:</strong> {pokemon.height / 10} m<br />
                <strong>Weight:</strong> {pokemon.weight / 10} kg<br />
                <strong>Types:</strong> {pokemon.types.map(t => t.type.name).join(', ')}<br />
                <strong>Abilities:</strong> {pokemon.abilities.map(a => a.ability.name).join(', ')}
                <strong>Base color: {pokemon.colorBase?.primary}</strong>
                </Typography>
              </Box>
            </Box>
          )}

          {activeTab === 'stats' && (
            <Box>
              {pokemon.stats.map((stat) => (
                <Box key={stat.stat.name} sx={{ marginBottom: '1rem' }}>
                  <Typography variant="body1">
                    <strong>{stat.stat.name.toUpperCase()}:</strong> {stat.base_stat}
                  </Typography>
                  <Box
                    sx={{
                      width: '100%',
                      height: '10px',
                      bgcolor: '#e0e0e0',
                      borderRadius: '5px',
                    }}
                  >
                    <Box
                      sx={{
                        width: `${(stat.base_stat / 255) * 100}%`,
                        height: '100%',
                        bgcolor: pokemon.colorBase?.primary,
                        borderRadius: '5px',
                      }}
                    />
                  </Box>
                </Box>
              ))}
            </Box>
          )}

          {activeTab === 'evolution' && (
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body1">
                Evolution chain will be implemented here.
                {pokemon.sprites.other['official-artwork'].front_default}
              </Typography>
            </Box>
          )}
        </Box> 

        
        </Box>
  );
}
