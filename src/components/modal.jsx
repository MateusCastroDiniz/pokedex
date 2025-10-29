import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography} from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import axios from 'axios';


export default function PokemonModal({ open, handleClose, pokemon, baseColor }) {
    const [description, setDescription] = useState('');
    const [activeTab, setActiveTab] = useState('about');

    useEffect(() => {
        if(pokemon){
            axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}/`)
        .then(resp => {
          const flavorTextEntries = resp.data.flavor_text_entries;
          const flavorText = flavorTextEntries.find(entry => entry.language.name === 'en');
          setDescription(flavorText ? flavorText.flavor_text : 'Descrição não disponível.');
        })
        .catch(err => {
          console.error('Erro ao buscar descrição do Pokémon:', err);
          setDescription('Erro ao carregar descrição.');
        });
        }
    }, [pokemon])

    if (!pokemon) return null;

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        zIndex: '2',
        transform: 'translate(-50%, -50%)',
        width: '50vw',
        height:'70vh',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
        display:'flex',
        alignItems: 'center',
        overflowY: 'auto',
        overflowX: 'hidden',
        justifyContent: 'space-between',
      }}>
        <Box sx={{display: 'flex', flexDirection: 'column', width: '50%', height: '100%'}}>
          <Box sx={{marginBottom: '1rem'}}>
          
            <Typography variant="h3">
            {pokemon.name.toUpperCase()} #{pokemon.id}
            </Typography>

          </Box>
        
          <Box sx={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom:'1rem'}}>
              <ButtonGroup variant="text" aria-label="Basic button group" sx={{display: 'flex', justifyContent: 'space-between'}}>
                  <Button 
                    onClick={() => setActiveTab('about')}
                    sx={{ 
                      borderBottom: activeTab === 'about' ? 2 : 0,
                      borderColor: baseColor
                    }}
                  >
                    About
                  </Button>
                  <Button 
                    onClick={() => setActiveTab('stats')}
                    sx={{ 
                      borderBottom: activeTab === 'stats' ? 2 : 0,
                      borderColor: baseColor
                    }}
                  >
                    Stats
                  </Button>
                  <Button 
                    onClick={() => setActiveTab('evolution')}
                    sx={{ 
                      borderBottom: activeTab === 'evolution' ? 2 : 0,
                      borderColor: baseColor
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
                <strong>Base color: {baseColor}</strong>
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
                        bgcolor: baseColor,
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
        <Box sx={{width: '50%', height:'100%', display: 'flex', alignItems: 'center'}}>
          <Box sx={{height: '35%', width: '35%', display: 'flex', justifyContent: 'end', alignItems: 'center'}}>
              <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
              />
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
