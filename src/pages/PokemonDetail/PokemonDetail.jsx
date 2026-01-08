import {Box, Typography, Button, ButtonGroup, Stack} from '@mui/material';
import {useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {usePokemon} from "../../hooks/usePokemon";
import DetailHeader from '../../components/DetailHeader/DetailHeader';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
                <Box fullWidth sx={{display: 'flex', flexDirection: 'row', justifyContent:'start'}}>
                  <IconButton aria-label="fingerprint" onClick={() => navigate(-1)} color="white">
                    <ArrowBackIcon />
                  </IconButton>
                </Box>

              <DetailHeader
                pokemon={pokemon} 
              />

            </Box>
          
            <Box 
              sx={{
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
                  }}>
                    Stats
                  </Button>
                  
                  <Button 
                  onClick={() => toggleTab('evolution')}
                  sx={{ 
                    borderBottom: activeTab === 'evolution' ? 2 : 0,
                    borderColor: pokemon.colorBase?.primary
                  }}>
                    Evolution
                  </Button>

                </ButtonGroup>
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
