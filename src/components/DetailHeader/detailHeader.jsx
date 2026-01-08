import {
  Box,
  CardActions,
  CardMedia,
  Typography,
  Avatar,
  Stack
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { typeColorScheme } from '../../domain/colorScheme';
import { useNavigate } from 'react-router-dom';

export default function DetailHeader({pokemon}) {

const getLocalTypeIcon = (typeName) =>
  `https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/${typeName}.svg`;
  
const navigate = useNavigate();


return(
<Stack 
    direction={'column'}
    sx={{
        width: '100%',
        backgroundColor: pokemon.colorBase?.primary || 'rgba(200, 200, 200, 0.85)',
        justifyContent: 'space-between',
        color: '#333',
        borderRadius: 4,
        padding: 3,
        paddingX: 4,
        cursor: 'pointer',  
        boxSizing: 'border-box',
    }}>

    <Box fullWidth sx={{display: 'flex', flexDirection: 'row', justifyContent:'start'}}>
        <IconButton aria-label="fingerprint" onClick={() => navigate('/')} color="white">
            <ArrowBackIcon />
        </IconButton>
    </Box>


    <Box
    sx={{
        display:'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 4
    }}>

        <Box sx={{
        height: '100%',
        width: 'auto'
        }}>
            <CardMedia
                component="img"
                image={pokemon.sprites.other.dream_world.front_default || pokemon.sprites.other['official-artwork'].front_default}
                title={pokemon.name.toUpperCase()}
                sx={{
                objectFit: 'contain',
                height: '130px',
                width: 'auto',
                alignSelf: 'center',
                }}
            />
        </Box>

        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            }}>

            <Box sx={{
                display: 'flex',
                flexDirection:'column', 
                gap:1, 
                alignItems: 'start'
                }}>
                
                <Typography variant="body1" sx={{fontWeight: 'bold', color: pokemon.baseColor?.font_color }}>
                    {`#${pokemon.id}`}
                </Typography>

                <Typography variant="h5" sx={{fontWeight: 'bolder', color: pokemon.colorBase?.font_color}}>
                    {pokemon.name.toUpperCase()}
                </Typography>

                <CardActions sx={{width: 'fit-content', padding:0}}>
                    {pokemon.types.map(t => {

                        const secondaryBgColor = typeColorScheme[t.type.name]?.secondary;
                    
                        return(
                        <Box
                            key={t.type.name}
                            sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap:1,
                            height: '30px',
                            paddingX:'5px',
                            borderRadius: '6px',
                            backgroundColor: secondaryBgColor,
                            }}>

                            <Avatar sx={{width: 20, height: 20}} src={getLocalTypeIcon(t.type.name)} />

                            <Typography
                            variant='body2'
                            sx={{
                                color: '#fff',
                                textTransform: 'capitalize',
                                fontWeight: 500,
                            }}
                            >
                            {t.type.name}
                            </Typography>
                        </Box>
                        )
                
                        })}
                </CardActions>
            </Box>

        </Box>
    </Box>

    
</Stack>
)
};