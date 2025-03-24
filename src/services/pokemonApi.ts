import axios from 'axios';
import { Pokemon, PokemonListResponse } from '../types/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const pokemonApi = {
  getPokemonList: async (offset = 0, limit = 20): Promise<PokemonListResponse> => {
    const response = await axios.get(`${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`);
    return response.data;
  },

  getPokemonById: async (id: number): Promise<Pokemon> => {
    const response = await axios.get(`${BASE_URL}/pokemon/${id}`);
    return response.data;
  },

  getPokemonByName: async (name: string): Promise<Pokemon> => {
    const response = await axios.get(`${BASE_URL}/pokemon/${name}`);
    return response.data;
  },
}; 