import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography} from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import axios from 'axios';


export default function PokemonModal({ open, handleClose, pokemon, baseColor }) {
    const [description, setDescription] = useState('') 

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
        overflowX: 'hidden'
      }}>
        <Box sx={{display: 'flex',flexDirection: 'column', width: '100%', height: '100%'}}>
            <Box sx={{marginBottom: '1rem'}}>
            <Typography variant="h2">
            {pokemon.name.toUpperCase()} #{pokemon.id}
            </Typography>
            </Box>
            <Box sx={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom:'1rem'}}>
                <ButtonGroup variant="text" aria-label="Basic button group" sx={{display: 'flex', justifyContent: 'space-between',}}>
                    <Button>About</Button>
                    <Button>Stats</Button>
                    <Button>Evolution</Button>
                </ButtonGroup>
            </Box>
            <Box sx={{ marginBottom: '1rem' }}>
                <Typography variant="body1">
                    <strong>Description:</strong> {description}
                </Typography>
            </Box>
            <Box>
                <Typography variant='body1'>
                <strong>Altura:</strong> {pokemon.height / 10} m<br />
                <strong>Peso:</strong> {pokemon.weight / 10} kg<br />
                <strong>Tipos:</strong> {pokemon.types.map(t => t.type.name).join(', ')}<br />
                <strong>Habilidades:</strong> {pokemon.abilities.map(a => a.ability.name).join(', ')}
                </Typography>
            </Box>
        </Box>
        <Box sx={{height: '65%', width: '65%',display: 'flex', justifyContent: 'end', alignItems: 'center'}}>
            <img
            src={pokemon.sprites.other['official-artwork'].front_default}
            alt={pokemon.name}
            style={{ width: 'auto', height: '100%', objectFit: 'contain' }}
            />
        </Box>
      </Box>
    </Modal>
  );
}
