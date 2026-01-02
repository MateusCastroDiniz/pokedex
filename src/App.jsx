import {Routes, Route} from 'react-router-dom';

import Home from './pages/Home/Home';
import Pokedex from './pages/Pokedex/Pokedex';
import PokemonDetail from './pages/PokemonDetail/PokemonDetail';


function App() {
  return(
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pokedex" element={<Pokedex/>}/>
      <Route path="/pokemon/:id" element={<PokemonDetail/>}/>
    </Routes>
  );
}

export default App