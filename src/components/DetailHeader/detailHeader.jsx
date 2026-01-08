import {
  Box,
  CardActions,
  CardMedia,
  Typography,
  Avatar
} from '@mui/material';
import { typeColorScheme } from '../../domain/colorScheme';

export default function DetailHeader({pokemon}) {

const getLocalTypeIcon = (typeName) =>
  `https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/${typeName}.svg`;


return(
<Box
    sx={{
        display: 'flex',
        width: '100%',
        // backgroundColor: pokemon.colorBase?.primary || 'rgba(200, 200, 200, 0.85)',
        justifyContent: 'space-between',
        color: '#333',
        borderRadius: 4,
        padding: 3,
        cursor: 'pointer', 
        boxSizing: 'border-box',
    }}
    >

    <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        width: '40%',
        }}>

        <Box sx={{
            display: 'flex',
            flexDirection:'column', 
            gap:1, 
            alignItems: 'start'
            }}>
            
            <Typography variant="body1" sx={{fontWeight: 'bold'}}>
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
</Box>
)
};