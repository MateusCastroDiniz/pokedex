import {Box, Typography, Button, Stack, Grid, Avatar} from '@mui/material';
import {useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {usePokemon} from "../../hooks/usePokemon";
import DetailHeader from '../../components/DetailHeader/DetailHeader';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getTypeColor } from '../../utils/colorScheme';
import {formatPokemonNames} from '../../utils/formatPokemonNames'


export default function PokemonDetail() {
  const [activeTab, setActiveTab] = useState('about');
  
  const toggleTab = (tab) => setActiveTab(tab);
  const {id} = useParams();
  const navigate = useNavigate();
  const getLocalTypeIcon = (typeName) =>
  `https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/${typeName}.svg`;


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
              width: '100%',
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
                    <ArrowBackIcon color='#fff' />
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
                  <Box 
                  sx={{
                    display:'flex',
                    flexDirection:'column',
                    flexGrow: 1,
                    textAlign: 'start',
                    gap: 1
                  }}>

                    <Typography>
                      {pokemon.description}
                    </Typography>
                    

                    <Box sx={{
                      display:'flex',
                      flexDirection: 'column',
                      gap:1
                    }}>
                      <Typography color={pokemon.colorBase?.primary} variant='h6' fontWeight={'bold'} textAlign={'start'}>
                      Pokedex Data
                      </Typography>

                      <Grid container spacing={1} sx={{paddingY: 1}}>
                        <Grid size={4} sx={{display: 'flex', alignItems: 'start'}}>
                          <Typography fontWeight={'bold'} variant='subtitle2'>
                            Height
                          </Typography>
                        </Grid>
                        
                        <Grid size={8} sx={{display: 'flex', alignItems: 'start'}}>
                          <Typography>
                            {pokemon.height / 10}m
                          </Typography>
                        </Grid>

                        <Grid size={4} sx={{display: 'flex', alignItems: 'start'}}>
                          <Typography fontWeight={'bold'} variant='subtitle2'>
                            Weight
                          </Typography>
                        </Grid>
                        
                        <Grid size={8} sx={{display: 'flex', alignItems: 'start'}}>
                          <Typography>
                            {pokemon.weight / 10}kg
                          </Typography>
                        </Grid>

                        <Grid size={4} sx={{display: 'flex', alignItems: 'start'}}>
                          <Typography fontWeight={'bold'} variant='subtitle2'>
                            Types
                          </Typography>
                        </Grid>
                        
                        <Grid size={8} sx={{display: 'flex', alignItems: 'start'}}>
                          <Typography>
                            {pokemon.types.map(t => t.type.name).join(', ')}
                          </Typography>
                        </Grid>

                        <Grid size={4} sx={{display: 'flex', alignItems: 'start'}}>
                          <Typography fontWeight={'bold'} variant='subtitle2'>
                            Abilities
                          </Typography>
                        </Grid>
                        
                        <Grid size={8} sx={{display: 'flex', alignItems: 'start', flexDirection: 'column'}}>
                            
                            {pokemon.abilities.map((a, idx) => (
                              <Typography variant={a.is_hidden ? "subtitle2" : "body1"}>
                                {idx + 1 + '. '+ a.ability.name}
                                {a.is_hidden && ' (hidden ability)'}
                                {idx < pokemon.abilities.length - 1 && ','}
                              </Typography>
                            ))}

                        </Grid>

                        <Grid size={4} sx={{display: 'flex', alignItems: 'start'}}>
                          <Typography fontWeight={'bold'} variant='subtitle2'>
                            Base color:
                          </Typography>
                        </Grid>
                        
                        <Grid size={8} sx={{display: 'flex', alignItems: 'start'}}>
                          <Typography variant="body2">
                            {pokemon.colorBase?.primary}
                          </Typography>
                        </Grid>

                        <Grid size={4} sx={{display: 'flex', alignItems: 'start'}}>
                          <Typography fontWeight={'bold'} variant='subtitle2'>
                            Weaknesses:
                          </Typography>
                        </Grid>
                        
                        <Grid size={8} sx={{display: 'flex', alignItems: 'start'}}>
                          {pokemon.typesDetails.map(ty => (
                            ty.damage_relations.double_damage_from.map(t => t.name).join(", ")
                          ))}
                        </Grid>
                      </Grid>
                    </Box>

                    <Box 
                      sx={{
                        display:'flex',
                        flexDirection: 'column',
                        gap:1
                      }}>

                      <Typography color={pokemon.colorBase?.primary} variant='h6' fontWeight={'bold'} textAlign={'start'}>
                      Training
                      </Typography>
                      
                      <Grid container spacing={1}>
                      
                        <Grid size={12} sx={{display: 'flex', alignItems: 'start'}}>
                          
                        </Grid>
                      
                        <Grid size={4} sx={{display: 'flex', alignItems: 'start'}}>
                          <Typography fontWeight={'bold'} variant='subtitle2'>
                            Ev Yield
                          </Typography>
                        </Grid>

                        <Grid size={8} sx={{display: 'flex', alignItems: 'start'}}>
                          <Typography>
                            {pokemon.meta.evYield.map((y) => (
                              `${y.value} ${y.label}`
                              )).join(', ')}
                          </Typography>
                        </Grid>

                        <Grid size={4} sx={{display: 'flex', alignItems: 'start'}}>
                          <Typography fontWeight={'bold'} variant='subtitle2'>
                            Catch Rate
                          </Typography>
                        </Grid>
                        
                        <Grid size={8} sx={{display: 'flex', alignItems: 'start'}}>
                          <Typography>
                            {pokemon.meta.catchRate}
                          </Typography>
                        </Grid>

                        <Grid size={4} sx={{display: 'flex', alignItems: 'start'}}>
                          <Typography fontWeight={'bold'} variant='subtitle2'>
                            Base Friendship
                          </Typography>
                        </Grid>
                        
                        <Grid size={8} sx={{display: 'flex', alignItems: 'start'}}>
                          <Typography>
                            {pokemon.meta.baseFriendship}
                          </Typography>
                        </Grid>

                        <Grid size={4} sx={{display: 'flex', alignItems: 'start'}}>
                          <Typography fontWeight={'bold'} variant='subtitle2'>
                            Base EXP
                          </Typography>
                        </Grid>
                        
                        <Grid size={8} sx={{display: 'flex', alignItems: 'start', flexDirection: 'column'}}>  
                          <Typography>
                            {pokemon.meta.baseExp}
                          </Typography>
                        </Grid>

                        <Grid size={4} sx={{display: 'flex', alignItems: 'start'}}>
                          <Typography variant='subtitle2' fontWeight={'bold'}>
                            Base color:
                          </Typography>
                        </Grid>
                        
                        <Grid size={8} sx={{display: 'flex', alignItems: 'start'}}>
                          <Typography variant="body2">
                            {pokemon.meta.growthRate}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
              )}

              {activeTab === 'stats' && (
                <Box 
                sx={{
                  width: '100%',
                  maxWidth: '100%',
                  display: 'flex',
                  flexDirection: 'column'

                }}>

                  <Typography color={pokemon.colorBase?.primary} variant='h6' fontWeight={'bold'} textAlign={'start'}>
                    Base Stats
                  </Typography>

                  <Box sx={{paddingY: '10px'}}>
                  {pokemon.stats.map((stat) => (
                    <Grid container spacing={2} key={stat.stat.name} 
                    sx={{ 
                      paddingY: '7px',
                      margin: 0,
                      display: 'flex',
                      flexDirection: 'row'
                      }}>
                      
                      <Grid size={3} sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Typography variant="body2" fontWeight={'bold'}>
                          {stat.stat.nameWrap}
                        </Typography>

                        <Typography variant="subtitle1">
                          {stat.base_stat}
                        </Typography>
                      </Grid>

                      <Grid size={7} sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                        <Box
                          sx={{
                            width: '100%',
                            height: '5px',
                            borderRadius: '5px',
                          }}
                          >
                          <Box
                            sx={{
                              width: `${(stat.base_stat / stat.range.min) * 100}%`,
                              height: '100%',
                              bgcolor: pokemon.colorBase?.primary,
                              borderRadius: '5px',
                            }}
                            />
                        </Box>
                      </Grid>

                      <Grid size={1} sx={{display: 'flex', justifyContent: 'center'}}>
                        <Typography variant="subtitle1">
                          {stat.range.min}
                        </Typography>
                      </Grid>

                      <Grid size={1} sx={{display: 'flex', justifyContent: 'center'}}>
                        <Typography variant="subtitle1">
                          {stat.range.max}
                        </Typography>
                      </Grid>
                    </Grid>
                  ))}

                  <Grid container spacing={1}
                    sx={{ 
                      marginBottom: '1rem',
                      display: 'flex',
                      flexDirection: 'row',
                      paddingY: 1
                      }}>
                      
                      <Grid size={3} sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Typography variant="body2" fontWeight={'bold'}>
                          Total
                        </Typography>

                        <Typography variant="subtitle1" fontWeight={'bold'}>
                          {pokemon.stats.reduce((total, stat) => {
                            return total + stat.base_stat
                          }, 0
                          )}
                        </Typography>
                      </Grid>

                      <Grid size={7} sx={{display: 'flex', justifyContent: 'center'}}>
                        
                      </Grid>

                      <Grid size={1} sx={{display: 'flex', justifyContent: 'center'}}>
                        <Typography variant="subtitle2" fontWeight={'bold'}>
                          Min
                        </Typography>
                      </Grid>

                      <Grid size={1} sx={{display: 'flex', justifyContent: 'center'}}>
                        <Typography variant="subtitle2" fontWeight={'bold'}>
                          Max
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>

                    
                  <Box 
                  sx={{
                    width: '100%',
                    maxWidth: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <Typography variant='subtitle2' textAlign={'justify'}>
                      The ranges shown on the right are for a level 100 Pokémon. Maximum values are based on a beneficial nature, 252 EVs, 31 IVs; minimum values are based on a hindering nature, O EVs, O IVs.
                    </Typography>
                  </Box>

                  <Box sx={{
                    width: '100%',
                    maxWidth: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    paddingY: 1,
                    gap: 2
                    }}>

                    <Box sx={{
                      display:'flex',
                      flexDirection:'column',
                      gap:1
                    }}>
                      <Typography color={pokemon.colorBase?.primary} variant='h6'   fontWeight={'bold'} textAlign={'start'}>
                      Type Defenses
                      </Typography>

                      <Typography variant='subtitle2' textAlign={'justify'}>
                        The effectiveness of each type on {formatPokemonNames(pokemon.name)}
                      </Typography>
                    </Box>

                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      gap:2
                    }}>

                      {Object.entries(pokemon.typeEffects).map(([type, value]) => (
                        <Box sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems:'center'
                        }}>
                          
                          <Box sx={{
                            padding:'7px',
                            borderRadius:'5px',
                            width:'fit-content',
                            backgroundColor: getTypeColor(type).secondary,
                          }}>
                            <Avatar sx={{width: 15, height: 15}} src={getLocalTypeIcon(type)} />
                          </Box>

                          {value != 1 ? (                            
                            <Typography key={type} variant='subtitle2'>
                              {value}×
                            </Typography>
                          ) : false}

                        </Box>
                      ))}
                    </Box>
                  </Box>
                    

                </Box>
              )}

              {activeTab === 'evolution' && (
                <Box 
                sx={{
                  display:'flex',
                  flexDirection: 'column',
                  flexGrow: 1,
                }}>
                  <Typography>
                    Evolution chain will be implemented here.
                  </Typography>
                </Box>
              )}

            </Box> 

          </Box> 
      </Stack>
    </Stack>
  );
}
