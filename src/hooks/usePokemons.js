import { useEffect, useState } from "react";
import {
  getPokemons,
  getPokemonDetails,
  getPokemonByNameOrId
} from "../services/pokeApi";
import { getColorBySpecieId } from "../utils/speciesColor";

export function usePokemons(pokemonsPerPage = 5) {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // 🔹 Busca inicial
  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      try {
        const list = await getPokemons(50);

        let details = await Promise.all(
          list.map((pokemon) => getPokemonDetails(pokemon.url))
        );
        
        
        details = await Promise.all(
          details.map(async (pokemon) => {
            pokemon["colorBase"] = await getColorBySpecieId(pokemon.id);
            return pokemon;
          })
        );

        setPokemons(details);
        setFilteredPokemons(details);
      } catch (err) {
        console.error("Erro ao buscar pokémons", err);
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
  }, []);

  // 🔹 Filtro / busca
  useEffect(() => {
    async function filter() {
      if (!searchTerm) {
        setFilteredPokemons(pokemons);
        setCurrentPage(1);
        return;
      }

      const local = pokemons.filter(
        (pokemon) =>
          pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pokemon.id.toString() === searchTerm
      );

      if (local.length > 0) {
        setFilteredPokemons(local);
      } else {
        try {
          const result = await getPokemonByNameOrId(
            searchTerm.toLowerCase()
          );
          setFilteredPokemons([result]);
        } catch {
          setFilteredPokemons([]);
        }
      }

      setCurrentPage(1);
    }

    filter();
  }, [searchTerm, pokemons]);

  // 🔹 Paginação
  const paginatedPokemons = filteredPokemons.slice(
    (currentPage - 1) * pokemonsPerPage,
    currentPage * pokemonsPerPage
  );

  return {
    loading,
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    totalPages: Math.ceil(filteredPokemons.length / pokemonsPerPage),
    pokemons: paginatedPokemons
  };
}
