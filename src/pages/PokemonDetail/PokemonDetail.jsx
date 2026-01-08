import {Box, Typography, Button, ButtonGroup, Stack} from '@mui/material';
import {useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {usePokemon} from "../../hooks/usePokemon";
import DetailHeader from '../../components/DetailHeader/DetailHeader';

export default function PokemonDetail() {
  const [description, setDescription] = useState('');
  const [activeTab, setActiveTab] = useState('about');
  
  const toggleTab = (tab) => setActiveTab(tab);
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
    <Stack sx={{width: '100%', minHeight: '100vh', boxSizing: 'border-box'}}>

      <Stack sx={{display:'flex', flexDirection:'column', alignItems:'center', paddingBottom:3, width: '100%'}}>
          
          <Box 
            sx={{
              display: 'flex', 
              flexDirection: 'column', 
              width: '100vw',
              boxSizing: 'border-box',
            }}>

            <Box 
              sx={{
                marginBottom: '1rem',
                backgroundColor: pokemon.colorBase?.primary || 'rgba(200, 200, 200, 0.85)',
              }}>

              <DetailHeader
                pokemon={pokemon} 
              />

              <Box 
                sx={{
                  width: '100%', 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  marginBottom:'1rem',
                }}>

                  <Box 
                  variant="text" 
                  sx={{
                    width:'80%',
                    display: 'flex', 
                    justifyContent: 'space-between',
                    
                    }}>
                      
                    <Button 
                    onClick={() => toggleTab('about')}
                    sx={{ 
                      border: 'none',
                      color: activeTab === 'about' ? '#fff': '#ffffff85'
                    }}>
                      About
                    </Button>

                    <Button 
                    onClick={() => toggleTab('stats')}
                    sx={{ 
                      color: activeTab === 'stats' ? '#fff': '#ffffff85'
                    }}>
                      Stats
                    </Button>
                    
                    <Button 
                    onClick={() => toggleTab('evolution')}
                    sx={{ 
                      color: activeTab === 'evolution' ? '#fff': '#ffffff85'
                    }}>
                      Evolution
                    </Button>

                  </Box>
              </Box>

            </Box>
          

            <Box 
            sx={{
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              marginBottom:'1rem',
              boxSizing: 'border-box',
            }}>
                  
              {activeTab === 'about' && (
                <>
                  <Box 
                  sx={{
                    display:'flex',
                    flexDirection:'column'
                  }}>
                    <Typography variant='body1'>
                    <strong>Height:</strong> {pokemon.height / 10} m<br />
                    <strong>Weight:</strong> {pokemon.weight / 10} kg<br />
                    <strong>Types:</strong> {pokemon.types.map(t => t.type.name).join(', ')}<br />
                    <strong>Abilities:</strong> {pokemon.abilities.map(a => a.ability.name).join(', ')}<br />
                    <strong>Base color: {pokemon.colorBase?.primary}</strong><br />
                    </Typography>
                    <Typography variant="body1">
                    <strong>Description:</strong> {description}
                    </Typography>
                  </Box>
                </>
              )}

              {activeTab === 'stats' && (
                <Box 
                sx={{
                  display: 'flex',
                  flexDirection:'column'
                }}>
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
                <Box 
                sx={{
                  width:'100%'
                }}>
                  <Typography>
                    Evolution chain will be implemented here.
                  </Typography>
                    {pokemon.sprites.other['official-artwork'].front_default}
                </Box>
              )}

            </Box> 
          </Box> 
      </Stack>
    </Stack>
  );
}
