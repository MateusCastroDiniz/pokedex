import '../../styles/App.css'
import '../../styles/style.css'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import PokemonVisualizer from '../Pokedex/Pokedex.jsx';
import CustomAppBar from '../../components/AppBar/AppBar.jsx';
import { usePokemons } from '../../hooks/usePokemons.js';

function Home() {
    const {
      pokemons,
      loading,
      searchTerm,
      setSearchTerm,
      currentPage,
      setCurrentPage,
      totalPages
    } = usePokemons(5);
  

  return (
    <Stack sx={{width: '100%', minHeight: '100vh', paddingX: 4, paddingY: 2, boxSizing: 'border-box'}}>
      <CustomAppBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      
      <Stack >
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <PokemonVisualizer pokemons={pokemons} />
        )}
      </Stack>

      <Stack sx={{display:'flex', flexDirection:'column', alignItems:'center', marginY:2, paddingBottom:3}}>
      <Pagination fullWidth 
      count={totalPages}
      page={currentPage}
      onChange={(e, page) => setCurrentPage(page)}
      sx={{ justifyContent: 'center'}}
      />
      </Stack>
    </Stack>
  )
}

export default Home;