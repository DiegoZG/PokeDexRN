export interface PokemonType {
  type: {
    name: string;
  };
}

export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  types: PokemonType[];
  stats: {
    name: string;
    value: number;
  }[];
  abilities: {
    ability: {
      name: string;
    };
  }[];
  image: string;
  animatedSprite?: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
} 