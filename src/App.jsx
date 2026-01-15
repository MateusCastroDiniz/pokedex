import {Routes, Route} from 'react-router-dom';

import Home from './pages/Home/Home';
import PokemonDetail from './pages/PokemonDetail/PokemonDetail';


function App() {
  return(
    <Routes>
      <Route path="/pokedex" element={<Home />} />
      <Route path="/pokedex/pokemon/:id" element={<PokemonDetail/>}/>
    </Routes>
  );
}

export default App