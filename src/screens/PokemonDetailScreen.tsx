import React, { useEffect, useRef } from 'react';
import { View, Text, Image, ScrollView, Animated, Dimensions } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Pokemon } from '../types/pokemon';
import { getTypeColor } from '../utils/typeColors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext';

type PokemonDetailRouteProp = RouteProp<{
  PokemonDetail: { pokemon: Pokemon };
}, 'PokemonDetail'>;

const { width } = Dimensions.get('window');

export const PokemonDetailScreen = () => {
  const route = useRoute<PokemonDetailRouteProp>();
  const { pokemon } = route.params;
  const scrollY = useRef(new Animated.Value(0)).current;
  const imageScale = useRef(new Animated.Value(1)).current;
  const { isDark } = useTheme();

  useEffect(() => {
    Animated.spring(imageScale, {
      toValue: 1,
      tension: 10,
      friction: 2,
      useNativeDriver: true,
    }).start();
  }, []);

  if (!pokemon) {
    return (
      <View className={`flex-1 justify-center items-center ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <Text className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Pokemon not found</Text>
      </View>
    );
  }

  const primaryType = pokemon.types[0]?.type.name || 'normal';
  const primaryColor = getTypeColor(primaryType);
  const secondaryColor = getTypeColor(pokemon.types[1]?.type.name || primaryType);

  const imageTranslateY = scrollY.interpolate({
    inputRange: [-100, 0, 100],
    outputRange: [25, 0, -25],
    extrapolate: 'clamp',
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <View className="flex-1">
      <LinearGradient
        colors={[primaryColor, secondaryColor]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="absolute w-full h-96"
      />
      
      <SafeAreaView className="flex-1" edges={['top']}>
        <Animated.ScrollView
          className="flex-1"
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
        >
          <View className="items-center mt-4">
            <Animated.View
              style={{
                transform: [
                  { scale: imageScale },
                  { translateY: imageTranslateY },
                ],
              }}
              className="mb-4"
            >
              <Image
                source={{ uri: pokemon.image }}
                className="w-72 h-72"
                resizeMode="contain"
              />
            </Animated.View>

            <Animated.View
              style={{ opacity: headerOpacity }}
              className="items-center mb-6"
            >
              <Text className="text-4xl font-bold text-white capitalize mb-2 tracking-wide">
                {pokemon.name}
              </Text>
              <Text className="text-2xl text-white/80">
                #{String(pokemon.id).padStart(3, '0')}
              </Text>
            </Animated.View>

            <View className="flex-row justify-center mb-6">
              {pokemon.types?.map((typeObj) => (
                <View
                  key={typeObj.type.name}
                  className="px-6 py-2 mx-2 rounded-full border border-white/30"
                >
                  <Text className="text-lg font-medium text-white capitalize">
                    {typeObj.type.name}
                  </Text>
                </View>
              ))}
            </View>

            <View className={`${isDark ? 'bg-gray-800' : 'bg-white'} w-full rounded-t-3xl p-6`}>
              <View className="mb-8">
                <Text className={`text-2xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'} mb-4`}>Base Stats</Text>
                {pokemon.stats?.map((stat, index) => (
                  <View key={index} className="mb-4">
                    <View className="flex-row justify-between mb-2">
                      <Text className={`capitalize ${isDark ? 'text-gray-300' : 'text-gray-600'} font-medium`}>
                        {stat.name.replace('-', ' ')}
                      </Text>
                      <Text className={`font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>{stat.value}</Text>
                    </View>
                    <View className={`${isDark ? 'bg-gray-700' : 'bg-gray-100'} rounded-full h-3`}>
                      <Animated.View
                        className="h-3 rounded-full"
                        style={{
                          width: `${(stat.value / 255) * 100}%`,
                          backgroundColor: primaryColor,
                        }}
                      />
                    </View>
                  </View>
                ))}
              </View>

              <View className="mb-8">
                <Text className={`text-2xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'} mb-4`}>Details</Text>
                <View className="flex-row flex-wrap justify-between">
                  <View className={`${isDark ? 'bg-gray-700' : 'bg-gray-50'} rounded-2xl p-4 mb-4 w-[48%]`}>
                    <Text className={`${isDark ? 'text-gray-400' : 'text-gray-500'} mb-1`}>Height</Text>
                    <Text className={`text-xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>{(pokemon.height / 10).toFixed(1)}m</Text>
                  </View>
                  <View className={`${isDark ? 'bg-gray-700' : 'bg-gray-50'} rounded-2xl p-4 mb-4 w-[48%]`}>
                    <Text className={`${isDark ? 'text-gray-400' : 'text-gray-500'} mb-1`}>Weight</Text>
                    <Text className={`text-xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>{(pokemon.weight / 10).toFixed(1)}kg</Text>
                  </View>
                  <View className={`${isDark ? 'bg-gray-700' : 'bg-gray-50'} rounded-2xl p-4 w-full`}>
                    <Text className={`${isDark ? 'text-gray-400' : 'text-gray-500'} mb-1`}>Base Experience</Text>
                    <Text className={`text-xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>{pokemon.base_experience}</Text>
                  </View>
                </View>
              </View>

              <View>
                <Text className={`text-2xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'} mb-4`}>Abilities</Text>
                <View className="flex-row flex-wrap">
                  {pokemon.abilities?.map((ability, index) => (
                    <View
                      key={index}
                      className={`${isDark ? 'bg-gray-700' : 'bg-gray-50'} rounded-full px-4 py-2 mr-2 mb-2`}
                    >
                      <Text className={`capitalize ${isDark ? 'text-gray-300' : 'text-gray-700'} font-medium`}>
                        {ability.ability.name.replace('-', ' ')}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </Animated.ScrollView>
      </SafeAreaView>
    </View>
  );
}; 