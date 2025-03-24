import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, Animated } from 'react-native';
import { Pokemon } from '../types/pokemon';
import { getTypeColor } from '../utils/typeColors';
import { useTheme } from '../context/ThemeContext';

interface PokemonCardProps {
  pokemon: Pokemon;
  onPress: () => void;
}

export function PokemonCard({ pokemon, onPress }: PokemonCardProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const translateYAnim = useRef(new Animated.Value(0)).current;
  const { isDark } = useTheme();

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 0.95,
        useNativeDriver: true,
      }),
      Animated.spring(translateYAnim, {
        toValue: -5,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.spring(translateYAnim, {
        toValue: 0,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePress = () => {
    onPress();
  };

  const primaryType = pokemon.types[0]?.type.name || 'normal';

  return (
    <TouchableOpacity
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.9}
      className="w-[31%] mb-2"
    >
      <Animated.View
        style={{
          transform: [
            { scale: scaleAnim },
            { translateY: translateYAnim },
          ],
        }}
        className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm overflow-hidden`}
      >
        <View
          className="p-2"
          style={{
            backgroundColor: getTypeColor(primaryType) + (isDark ? '30' : '20'),
          }}
        >
          <View className="items-center">
            <Image
              source={{ uri: pokemon.image }}
              className="w-20 h-20"
              resizeMode="contain"
            />
            <Text className={`text-sm font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'} capitalize mt-1`}>
              {pokemon.name}
            </Text>
            <View className="flex-row mt-1">
              {pokemon.types.map((typeObj) => (
                <View
                  key={typeObj.type.name}
                  className="px-1.5 py-0.5 rounded-full mx-0.5"
                  style={{ backgroundColor: getTypeColor(typeObj.type.name) + (isDark ? '30' : '40') }}
                >
                  <Text
                    className="text-[10px] font-semibold capitalize"
                    style={{ color: isDark ? '#fff' : getTypeColor(typeObj.type.name) }}
                  >
                    {typeObj.type.name}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
} 