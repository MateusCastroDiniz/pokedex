import {Box, Typography} from '@mui/material';
import {useNavigate, useParams} from 'react-router-dom';
import {usePokemon} from "../../hooks/usePokemon";


export default function PokemonDetail() {
    // const [description, setDescription] = useState('');
    // const [activeTab, setActiveTab] = useState('about');
    // const navigate = useNavigate();
    const {id} = useParams();

    const {pokemon, loading, error} = usePokemon(id)

    if (loading){
      return <Typography>Loading...</Typography>;
    }

    if (error){
      return <Typography>(error)...</Typography>;
    }

    if (!pokemon){
      return null;
    }



  return (

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
        
          {/* <Box sx={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom:'1rem'}}>
              <ButtonGroup variant="text" aria-label="Basic button group" sx={{display: 'flex', justifyContent: 'space-between'}}>
                  <Button 
                    onClick={() => setActiveTab('about')}
                    sx={{ 
                      borderBottom: activeTab === 'about' ? 2 : 0,
                      borderColor: pokemon.colorBase?.primary
                    }}
                  >
                    About
                  </Button>
                  <Button 
                    onClick={() => setActiveTab('stats')}
                    sx={{ 
                      borderBottom: activeTab === 'stats' ? 2 : 0,
                      borderColor: pokemon.colorBase?.primary
                    }}
                  >
                    Stats
                  </Button>
                  <Button 
                    onClick={() => setActiveTab('evolution')}
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
          )}*/}
        </Box> 

        {/* <Box sx={{width: '50%', height:'100%', display: 'flex', alignItems: 'center'}}>
          <Box sx={{height: '35%', width: '35%', display: 'flex', justifyContent: 'end', alignItems: 'center'}}>
              <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
              />
          </Box>
        </Box> */}
      </Box>
  );
}
