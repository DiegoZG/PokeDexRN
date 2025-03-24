import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList, ActivityIndicator, Animated } from 'react-native';
import { PokemonCard } from '../components/PokemonCard';
import { Pokemon } from '../types/pokemon';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { RegionDropdown, Region } from '../components/RegionDropdown';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';

type PokemonListScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'PokemonList'>;

export function PokemonList() {
  const navigation = useNavigation<PokemonListScreenNavigationProp>();
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const { isDark } = useTheme();
  const [selectedRegion, setSelectedRegion] = useState<Region>({
    id: 1,
    name: 'Kanto',
    startId: 1,
    endId: 151
  });

  useEffect(() => {
    fetchPokemon();
  }, [selectedRegion]);

  const handlePokemonPress = useCallback((pokemon: Pokemon) => {
    navigation.navigate('PokemonDetail', { pokemon });
  }, [navigation]);

  const handleRegionSelect = useCallback((region: Region) => {
    setSelectedRegion(region);
    setLoading(true);
  }, []);

  const fetchPokemon = async () => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${selectedRegion.endId - selectedRegion.startId + 1}&offset=${selectedRegion.startId - 1}`);
      const data = await response.json();
      
      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon: any) => {
          try {
            const detailsResponse = await fetch(pokemon.url);
            const details = await detailsResponse.json();
            
            // Get the image URL with fallbacks
            const imageUrl = details.sprites?.other?.['official-artwork']?.front_default || 
                           details.sprites?.front_default ||
                           'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png';

            const transformedPokemon: Pokemon = {
              id: details.id,
              name: details.name,
              base_experience: details.base_experience,
              height: details.height,
              weight: details.weight,
              types: details.types.map((type: any) => ({
                type: {
                  name: type.type.name
                }
              })),
              stats: details.stats.map((stat: any) => ({
                name: stat.stat.name,
                value: stat.base_stat
              })),
              abilities: details.abilities.map((ability: any) => ({
                ability: {
                  name: ability.ability.name
                }
              })),
              image: imageUrl,
              animatedSprite: details.sprites?.versions?.['generation-v']?.['black-white']?.animated?.front_default,
            };

            return transformedPokemon;
          } catch (error) {
            console.error(`Error fetching details for Pokemon ${pokemon.name}:`, error);
            return null;
          }
        })
      );
      
      // Filter out any failed fetches
      const validPokemon = pokemonDetails.filter((p): p is Pokemon => p !== null);
      setPokemon(validPokemon);
    } catch (error) {
      console.error('Error fetching Pokemon:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = useCallback(({ item }: { item: Pokemon }) => (
    <PokemonCard
      pokemon={item}
      onPress={() => handlePokemonPress(item)}
    />
  ), [handlePokemonPress]);

  if (loading) {
    return (
      <SafeAreaView className={`flex-1 justify-center items-center ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <ActivityIndicator size="large" color={isDark ? '#60A5FA' : '#3B82F6'} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`} edges={['left', 'right', 'bottom']}>
      <View className="px-4 py-2">
        <RegionDropdown
          selectedRegion={selectedRegion}
          onRegionSelect={handleRegionSelect}
        />
      </View>
      <FlatList
        data={pokemon}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 8 }}
        numColumns={3}
        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 8 }}
      />
    </SafeAreaView>
  );
} 