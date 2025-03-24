import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, TextInput } from 'react-native';
import { Pokemon } from '../types/pokemon';
import { pokemonApi } from '../services/pokemonApi';
import { PokemonCard } from '../components/PokemonCard';
import { useNavigation } from '@react-navigation/native';

export const PokemonListScreen = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  const loadPokemons = async () => {
    try {
      const response = await pokemonApi.getPokemonList();
      setPokemons(response.results);
    } catch (error) {
      console.error('Error loading pokemons:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPokemons();
  }, []);

  const filteredPokemons = pokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePokemonPress = (pokemon: Pokemon) => {
    navigation.navigate('PokemonDetail', { pokemon });
  };

  return (
    <View className="flex-1 bg-gray-100">
      <TextInput
        placeholder="Search Pokémon"
        value={searchQuery}
        onChangeText={setSearchQuery}
        className="border border-gray-300 rounded p-2 m-4"
      />
      {loading ? (
        <ActivityIndicator size="large" color="#3B82F6" />
      ) : (
        <FlatList
          data={filteredPokemons}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <PokemonCard pokemon={item} onPress={() => handlePokemonPress(item)} />
          )}
        />
      )}
    </View>
  );
};