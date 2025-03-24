import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';

export interface Region {
  id: number;
  name: string;
  startId: number;
  endId: number;
}

const REGIONS: Region[] = [
  { id: 1, name: 'Kanto', startId: 1, endId: 151 },
  { id: 2, name: 'Johto', startId: 152, endId: 251 },
  { id: 3, name: 'Hoenn', startId: 252, endId: 386 },
  { id: 4, name: 'Sinnoh', startId: 387, endId: 493 },
  { id: 5, name: 'Unova', startId: 494, endId: 649 },
  { id: 6, name: 'Kalos', startId: 650, endId: 721 },
  { id: 7, name: 'Alola', startId: 722, endId: 809 },
  { id: 8, name: 'Galar', startId: 810, endId: 898 },
];

interface RegionDropdownProps {
  selectedRegion: Region;
  onRegionSelect: (region: Region) => void;
}

export function RegionDropdown({ selectedRegion, onRegionSelect }: RegionDropdownProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const { isDark } = useTheme();

  return (
    <>
      <View className="px-4 py-1">
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className="bg-white rounded-full p-2 shadow-sm border border-gray-200 w-10 h-10 items-center justify-center"
        >
          <MaterialIcons name="filter-list" size={20} color="#4B5563" />
        </TouchableOpacity>
      </View>

      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
        transparent={true}
      >
        <SafeAreaView className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-white'}`} edges={['top']}>
          <View className={`flex-row justify-between items-center px-4 py-3 border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
            <Text className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Select Region</Text>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              className="p-2"
            >
              <MaterialIcons name="close" size={24} color={isDark ? '#9CA3AF' : '#4B5563'} />
            </TouchableOpacity>
          </View>

          <View className="p-4">
            {REGIONS.map((region) => (
              <TouchableOpacity
                key={region.id}
                className={`flex-row justify-between items-center px-4 py-3 mb-2 rounded-xl ${
                  isDark ? 'bg-gray-800' : 'bg-gray-50'
                } ${selectedRegion.id === region.id ? (isDark ? 'border border-blue-500' : 'border border-blue-500') : ''}`}
                onPress={() => {
                  onRegionSelect(region);
                  setModalVisible(false);
                }}
              >
                <View>
                  <Text className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {region.name}
                  </Text>
                  <Text className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    #{region.startId} - #{region.endId}
                  </Text>
                </View>
                {selectedRegion.id === region.id && (
                  <MaterialIcons name="check" size={24} color="#3B82F6" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
} 