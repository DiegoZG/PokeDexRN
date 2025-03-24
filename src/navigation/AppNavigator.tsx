import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PokemonList } from '../screens/PokemonList';
import { PokemonDetailScreen } from '../screens/PokemonDetailScreen';
import { RootStackParamList } from '../types/navigation';
import { Header } from '../components/Header';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="PokemonList"
          screenOptions={{
            header: ({ route, options }) => (
              <Header
                title={options.title || route.name}
                showBack={route.name !== 'PokemonList'}
              />
            ),
          }}
        >
          <Stack.Screen
            name="PokemonList"
            component={PokemonList}
            options={{ title: 'Pokédex' }}
          />
          <Stack.Screen
            name="PokemonDetail"
            component={PokemonDetailScreen}
            options={({ route }) => ({
              title: route.params?.pokemon?.name 
                ? route.params.pokemon.name.charAt(0).toUpperCase() + route.params.pokemon.name.slice(1)
                : 'Pokemon Details',
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}; 