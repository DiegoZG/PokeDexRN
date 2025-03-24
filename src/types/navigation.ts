import { Pokemon } from './pokemon';

export type RootStackParamList = {
  PokemonList: undefined;
  PokemonDetail: { pokemon: Pokemon };
}; 