import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function CustomAppBar({setSearchTerm }) {

  return (
    <Box 
    sx={{ 
      flexGrow: 1, 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      mb:2 }}>
      
      <Box
      >
        <IconButton aria-label="Example" sx={{width:'30px', height:'30px'}}>
          <FontAwesomeIcon icon={faEllipsisV} />
        </IconButton>
      </Box>
          
      <Box sx={{
        display:'flex',
        flexDirection:'column',
        textAlign:'start',
        paddingY:'1rem'
      }}>
        <Typography
          variant="h3"
          noWrap
          component="div"
          sx={{ 
            flexGrow: 1, 
            fontWeight: 'bold'}}
        >
          Pokédex
        </Typography>
        <Typography
          variant="body1"
          component="div"
          sx={{
            color:'#747476'
          }}
        >
          Procure por um Pokemon pelo nome ou usando o número Nacional Pokédex.
        </Typography>
      </Box>

      <Search 
        sx={{
        backgroundColor:"#f2f2f2",
        paddingY: '5px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        borderRadius: '8px',
        }}>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Buscar..."
          inputProps={{ 'aria-label': 'search' }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Search>
    </Box>
  );
}
