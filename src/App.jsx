import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import PokemonVisualizer from './components/pokedex.jsx';
import CustomAppBar from './components/customAppBar.jsx';

function App() {
  const [pokemons, setPokemons] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [totalPages, setTotalPages] = useState(0)
  const pokemonsPerPage = 5


  useEffect(() => {
    // Primeiro busca a lista de todos os pokémons (nome e url apenas)
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=50')
      .then(resp => {
        const allResults = resp.data.results;
  
        // Agora busca os detalhes de todos os pokémons
        const fetchDetails = allResults.map(pokemon =>
          axios.get(pokemon.url).then(res => res.data)
        );
  
        Promise.all(fetchDetails).then(pokemonDetails => {
          setPokemons(pokemonDetails);
          setFilteredPokemons(pokemonDetails);
          setTotalPages(Math.ceil(pokemonDetails.length / pokemonsPerPage));
        });
      })
      .catch(err => {
        console.error('Erro ao buscar todos os pokémons:', err);
      });
  }, []);

    useEffect(() => {
      // Filtrar os Pokémon com base no termo de busca
      const filtered = pokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pokemon.id.toString() === searchTerm
      );

        if (searchTerm && filtered.length === 0) {
    // Busca direta na API se não encontrou localmente
    axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`)
      .then(res => {
        setFilteredPokemons([res.data]);
        setTotalPages(1);
        setCurrentPage(1);
      })
      .catch(() => {
        setFilteredPokemons([]); // Nenhum resultado encontrado
        setTotalPages(1);
        setCurrentPage(1);
      });
  } else {
    setFilteredPokemons(filtered);
    setTotalPages(Math.ceil(filtered.length / pokemonsPerPage));
    setCurrentPage(1);
  }
}, [searchTerm, pokemons]);

    // Paginação aplicada aos resultados filtrados
    const paginatedPokemons = filteredPokemons.slice(
      (currentPage - 1) * pokemonsPerPage,
      currentPage * pokemonsPerPage
    );
  

  return (
    <>
      <CustomAppBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      <Stack>
        <PokemonVisualizer pokemons={paginatedPokemons} />
      </Stack>
      <Stack sx={{display:'flex', flexDirection:'column', alignItems:'center'}}>
      <Pagination
      count={Math.ceil(filteredPokemons.length / pokemonsPerPage)}
      page={currentPage}
      onChange={(e, page) => setCurrentPage(page)}
      sx={{ justifyContent: 'center', margin: '40px' }}
      />
      </Stack>
    </>
  )
}

export default App