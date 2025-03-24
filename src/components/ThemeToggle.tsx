import React from 'react';
import { TouchableOpacity, Animated, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      className="p-2 rounded-full bg-white/10"
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <Ionicons
        name={isDark ? 'moon' : 'sunny'}
        size={20}
        color="#FFFFFF"
      />
    </TouchableOpacity>
  );
} 