import {Box, Typography, Button, Stack, Grid} from '@mui/material';
import {useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {usePokemon} from "../../hooks/usePokemon";
import DetailHeader from '../../components/DetailHeader/DetailHeader';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function PokemonDetail() {
  const [activeTab, setActiveTab] = useState('about');
  
  const toggleTab = (tab) => setActiveTab(tab);
  const {id} = useParams();
  const navigate = useNavigate();

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
    <Stack id={'container'} 
      sx={{
        width: '100%',
        minHeight: '100vh',
        boxSizing: 'border-box',
        backgroundColor: pokemon.colorBase?.primary || 'rgba(200, 200, 200, 0.85)'
        }}>

      <Stack 
        sx={{
          display:'flex', 
          flexDirection:'column', 
          alignItems:'center', 
          width: '100%', 
          justifyContent: 'space-between',
          boxSizing: 'border-box',
        }}>
          
          <Box 
            sx={{
              display: 'flex', 
              flexDirection: 'column',
               
              width: '100vw',
              height: '100vh',
            }}>

            <Box id={'header'}
              sx={{
                padding: '2rem',
                paddingBottom: 2,
                backgroundColor: pokemon.colorBase?.primary || 'rgba(200, 200, 200, 0.85)'

              }}>

              <Box fullWidth sx={{display: 'flex', flexDirection: 'row', justifyContent:'start'}}>
                <IconButton aria-label="fingerprint" onClick={() => navigate('/')} color="white">
                    <ArrowBackIcon />
                </IconButton>
              </Box>

              <DetailHeader
                pokemon={pokemon} 
              />

              <Box 
                id={'menu-tabs'}
                sx={{
                  width: '100%', 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                }}>

                  <Box 
                  variant="text" 
                  sx={{
                    width:'100%',
                    display: 'flex', 
                    justifyContent: 'space-between',
                    
                    }}>
                      
                    <Button 
                    onClick={() => toggleTab('about')}
                    sx={{ 
                      border: 'none',
                      color: activeTab === 'about' ? '#fff': '#ffffff85',
                      fontWeight: activeTab === 'about' ? 'bold': 'regular'
                    }}>
                      About
                    </Button>

                    <Button 
                    onClick={() => toggleTab('stats')}
                    sx={{ 
                      color: activeTab === 'stats' ? '#fff': '#ffffff85',
                      fontWeight: activeTab === 'stats' ? 'bold': 'regular'
                    }}>
                      Stats
                    </Button>
                    
                    <Button 
                    onClick={() => toggleTab('evolution')}
                    sx={{ 
                      color: activeTab === 'evolution' ? '#fff': '#ffffff85',
                      fontWeight: activeTab === 'evolution' ? 'bold': 'regular'
                    }}>
                      Evolution
                    </Button>

                  </Box>
              </Box>

            </Box>
          

            <Box id={'content'}
            sx={{
              display: 'flex',
              flexGrow: 1, 
              borderTopRightRadius: '2rem',
              borderTopLeftRadius: '2rem',
              justifyContent: 'center', 
              alignItems: 'top', 
              padding:'2rem',
              boxSizing: 'border-box',              
              backgroundColor: '#fff',
            }}>
                  
              {activeTab === 'about' && (
                <>
                  <Box 
                  sx={{
                    display:'flex',
                    flexDirection:'column',
                    flexGrow: 1,
                  }}>
                    <Typography variant='body2'>
                      {pokemon.description}
                    </Typography>

                    <Grid container spacing={2}>
                      
                      <Grid size={3} sx={{display: 'flex', alignItems: 'start'}}>
                        <Typography variant="body2" fontWeight={'bold'}>
                          Height
                        </Typography>
                      </Grid>
                      
                      <Grid size={9} sx={{display: 'flex', alignItems: 'start'}}>
                        <Typography variant="body2">
                          {pokemon.height / 10}m
                        </Typography>
                      </Grid>

                      <Grid size={3} sx={{display: 'flex', alignItems: 'start'}}>
                        <Typography variant="body2" fontWeight={'bold'}>
                          Weight
                        </Typography>
                      </Grid>
                      
                      <Grid size={9} sx={{display: 'flex', alignItems: 'start'}}>
                        <Typography variant="body2">
                          {pokemon.weight / 10}m
                        </Typography>
                      </Grid>

                      <Grid size={3} sx={{display: 'flex', alignItems: 'start'}}>
                        <Typography variant="body2" fontWeight={'bold'}>
                          Types
                        </Typography>
                      </Grid>
                      
                      <Grid size={9} sx={{display: 'flex', alignItems: 'start'}}>
                        <Typography variant="body2">
                          {pokemon.types.map(t => t.type.name).join(', ')}
                        </Typography>
                      </Grid>

                      <Grid size={3} sx={{display: 'flex', alignItems: 'start'}}>
                        <Typography variant="body2" fontWeight={'bold'}>
                          Abilities
                        </Typography>
                      </Grid>
                      
                      <Grid size={9} sx={{display: 'flex', alignItems: 'start'}}>
                        <Typography variant="body2">
                          {pokemon.abilities.map(a => a.ability.name).join(', ')}
                        </Typography>
                      </Grid>

                      <Grid size={3} sx={{display: 'flex', alignItems: 'start'}}>
                        <Typography variant="body2" fontWeight={'bold'}>
                          Base color:
                        </Typography>
                      </Grid>
                      
                      <Grid size={9} sx={{display: 'flex', alignItems: 'start'}}>
                        <Typography variant="body2">
                          {pokemon.colorBase?.primary}
                        </Typography>
                      </Grid>

                      <Grid size={3} sx={{display: 'flex', alignItems: 'start'}}>
                        <Typography variant="body2" fontWeight={'bold'}>
                          Weaknesses:
                        </Typography>
                      </Grid>
                      
                      <Grid size={9} sx={{display: 'flex', alignItems: 'start'}}>
                        {pokemon.typesDetails.map(ty => (
                          ty.damage_relations.double_damage_from.map(t => t.name).join(", ")
                        ))}
                      </Grid>
                    </Grid>

                    {pokemon.name}

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
