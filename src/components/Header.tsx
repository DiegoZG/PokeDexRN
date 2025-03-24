import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { AnimatedPikachu } from './AnimatedPikachu';
import { AnimatedEevee } from './AnimatedEevee';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemeToggle } from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  title: string;
  showBack?: boolean;
}

export function Header({ title, showBack = false }: HeaderProps) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { isDark } = useTheme();

  return (
    <LinearGradient
      colors={isDark ? ['#1F2937', '#111827'] : ['#3B82F6', '#2563EB']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="shadow-lg"
    >
      <View style={{ paddingTop: insets.top }} className="flex-row items-center justify-between px-4 py-4">
        <View className="flex-row items-center">
          {showBack && (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="mr-4"
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          )}
          <Text className="text-2xl font-bold text-white tracking-wide">{title}</Text>
        </View>
        
        <View className="flex-row items-center space-x-2">
          <View className="bg-white/10 rounded-full p-1">
            <AnimatedPikachu />
          </View>
          <View className="rounded-full p-1">
            <ThemeToggle />
          </View>
          <View className="bg-white/10 rounded-full p-1">
            <AnimatedEevee />
          </View>
        </View>
      </View>
    </LinearGradient>
  );
} 