import React from 'react';
import { Image } from 'react-native';

export function AnimatedEevee() {
  return (
    <Image
      source={{ uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/133.gif' }}
      className="w-6 h-6"
      resizeMode="contain"
    />
  );
} 